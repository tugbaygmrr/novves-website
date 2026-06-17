"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html, Line, OrbitControls, useTexture } from "@react-three/drei";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { PartnerHeroMap } from "./partner-hero-map";

export type PartnerPin = {
  /** Partner listesindeki satıra scroll için */
  partnerId?: string;
  name: string;
  location: string;
  /** Enlem (-90..+90, kuzey +) */
  lat: number;
  /** Boylam (-180..+180, doğu +) */
  lon: number;
  /** Hub-spoke arc'larının çıkış noktası (genellikle İstanbul) */
  isHub?: boolean;
  /** Sayfa açıldığında varsayılan olarak seçili gelsin mi */
  defaultSelected?: boolean;
};

export type PartnerWorldMapLabels = {
  hint: string;
  zoomIn: string;
  zoomOut: string;
  reset: string;
};

const DEFAULT_LABELS: PartnerWorldMapLabels = {
  hint: "drag • scroll to zoom",
  zoomIn: "Zoom in",
  zoomOut: "Zoom out",
  reset: "Reset view",
};

const GLOBE_RADIUS = 1.5;
const PIN_LIFT = 1.015;
const CAM_INITIAL = new THREE.Vector3(2.4, 1.1, 3.4);
const CAM_MIN_DIST = 1.7; // GLOBE_RADIUS + biraz boşluk → çok yakına gidebilsin
const CAM_MAX_DIST = 9;
const ARC_STEPS = 64;

function scrollToPartnerRow(partnerId: string) {
  const el = document.getElementById(`partner-${partnerId}`);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "center" });
  el.classList.add("partner-globe-highlight");
  window.setTimeout(() => el.classList.remove("partner-globe-highlight"), 2400);
}

// three-globe.gl / earth-blue-marble texture convention:
//   - Greenwich (lon=0) +X yönüne bakar
//   - doğu (lon>0)      -Z yönüne
//   - kuzey (lat>0)     +Y yönüne
// (https://github.com/vasturiano/three-globe — coord2Vec3)
const GLOBE_Y_OFFSET = 0;

function latLonToVec3(lat: number, lon: number, radius: number) {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lon + 180) * Math.PI) / 180;
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

function greatCircleArc(a: THREE.Vector3, b: THREE.Vector3, steps: number, baseRadius: number) {
  const aN = a.clone().normalize();
  const bN = b.clone().normalize();
  const dot = Math.max(-1, Math.min(1, aN.dot(bN)));
  const omega = Math.acos(dot);
  const sinO = Math.sin(omega) || 1;
  const lift = Math.min(0.55, omega * 0.32) * baseRadius;
  const points: THREE.Vector3[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const ca = Math.sin((1 - t) * omega) / sinO;
    const cb = Math.sin(t * omega) / sinO;
    const v = new THREE.Vector3()
      .addScaledVector(aN, ca)
      .addScaledVector(bN, cb)
      .normalize()
      .multiplyScalar(baseRadius + Math.sin(Math.PI * t) * lift);
    points.push(v);
  }
  return points;
}

function GlobeModel({ groupRef }: { groupRef: React.RefObject<THREE.Group | null> }) {
  // react-globe.gl clouds örneğinin texture'ları: blue-marble + topology bump
  const [dayMap, bumpMap] = useTexture([
    "/textures/earth-blue-marble.jpg",
    "/textures/earth-topology.png",
  ]);
  useMemo(() => {
    dayMap.colorSpace = THREE.SRGBColorSpace;
    dayMap.anisotropy = 4;
    bumpMap.anisotropy = 4;
  }, [dayMap, bumpMap]);

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[GLOBE_RADIUS, 96, 64]} />
        {/* emissiveMap = texture → gece tarafı da texture rengini "yayar", karanlık olmaz */}
        <meshPhongMaterial
          map={dayMap}
          bumpMap={bumpMap}
          bumpScale={0.04}
          shininess={6}
          emissive={new THREE.Color("#ffffff")}
          emissiveMap={dayMap}
          emissiveIntensity={0.75}
        />
      </mesh>
    </group>
  );
}

function Clouds() {
  const cloudsRef = useRef<THREE.Mesh | null>(null);
  const cloudsMap = useTexture("/textures/clouds.png") as THREE.Texture;
  useMemo(() => {
    cloudsMap.colorSpace = THREE.SRGBColorSpace;
    cloudsMap.anisotropy = 2;
  }, [cloudsMap]);

  useFrame((_, dt) => {
    if (cloudsRef.current) cloudsRef.current.rotation.y -= dt * 0.006;
  });

  return (
    <mesh ref={cloudsRef}>
      <sphereGeometry args={[GLOBE_RADIUS * 1.004, 75, 75]} />
      <meshPhongMaterial map={cloudsMap} transparent opacity={0.55} depthWrite={false} />
    </mesh>
  );
}

useTexture.preload("/textures/earth-blue-marble.jpg");
useTexture.preload("/textures/earth-topology.png");
useTexture.preload("/textures/clouds.png");

function Atmosphere() {
  return (
    <mesh scale={GLOBE_RADIUS * 1.12}>
      <sphereGeometry args={[1, 64, 64]} />
      <shaderMaterial
        transparent
        depthWrite={false}
        side={THREE.BackSide}
        uniforms={{
          glowColor: { value: new THREE.Color("#4ea4ff") },
          glowIntensity: { value: 0.55 },
        }}
        vertexShader={`
          varying vec3 vNormal;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          varying vec3 vNormal;
          uniform vec3 glowColor;
          uniform float glowIntensity;
          void main() {
            float intensity = pow(0.62 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
            gl_FragColor = vec4(glowColor, intensity * glowIntensity);
          }
        `}
      />
    </mesh>
  );
}

function PinHtml({
  position,
  pin,
  isSelected,
  onSelect,
}: {
  position: THREE.Vector3;
  pin: PartnerPin;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const isHub = pin.isHub === true;
  const labelAlwaysOn = isHub || isSelected;
  const wrapRef = useRef<HTMLDivElement | null>(null);

  // Manuel arka-yüz testi: pin'in sphere normali kameraya bakıyorsa görünür.
  // Raycast yok, dot product → her pin için ihmal edilebilir CPU yükü.
  // Hub her zaman görünür kalır.
  useFrame(({ camera }) => {
    const el = wrapRef.current;
    if (!el) return;
    const pinDir = position.clone().normalize();
    const camDir = camera.position.clone().normalize();
    const visible = isHub || pinDir.dot(camDir) > 0.05;
    el.style.opacity = visible ? "1" : "0";
    el.style.pointerEvents = visible ? "auto" : "none";
  });

  return (
    <Html
      position={position}
      zIndexRange={isHub ? [999, 100] : [100, 0]}
      center
      style={{ pointerEvents: "none" }}
    >
      <div
        ref={wrapRef}
        className="group relative flex flex-col items-center transition-opacity duration-150"
        style={{ pointerEvents: "auto" }}
      >
        <button
          type="button"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();
            if (!isHub) {
              onSelect();
              if (pin.partnerId && pin.partnerId !== "novves-hub") {
                scrollToPartnerRow(pin.partnerId);
              }
            }
          }}
          aria-label={`${pin.name} — ${pin.location}`}
          aria-pressed={isSelected}
          className={`relative flex items-center justify-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ef5f17]/60 ${
            isHub ? "h-6 w-6" : "h-4 w-4"
          }`}
        >
          {isHub ? (
            <>
              {/* Pulse halkaları — Türkiye'yi göz çarpıcı yap */}
              <span className="absolute inset-0 animate-ping rounded-full bg-[#ef5f17]/40" />
              <span
                className="absolute -inset-1 animate-ping rounded-full bg-[#ef5f17]/25"
                style={{ animationDelay: "0.7s", animationDuration: "2.2s" }}
              />
              {/* Beyaz halka */}
              <span className="absolute h-3.5 w-3.5 rounded-full bg-white shadow-[0_0_12px_3px_rgba(255,255,255,0.6)]" />
              {/* Turuncu çekirdek */}
              <span className="absolute h-2.5 w-2.5 rounded-full bg-[#ef5f17] shadow-[0_0_14px_4px_rgba(239,95,23,0.95)]" />
              <span className="absolute h-[5px] w-[5px] rounded-full bg-white" />
            </>
          ) : (
            <>
              {/* Diğer ülkeler — turuncu nokta + ince beyaz halka */}
              <span
                className={`absolute rounded-full bg-white/85 ${
                  isSelected ? "h-3 w-3" : "h-2.5 w-2.5"
                }`}
              />
              <span
                className={`absolute rounded-full bg-[#ef5f17] shadow-[0_0_8px_2px_rgba(239,95,23,0.7)] ${
                  isSelected ? "h-2 w-2" : "h-[6px] w-[6px]"
                }`}
              />
            </>
          )}
        </button>

        <div
          className={`pointer-events-none absolute left-1/2 -top-9 -translate-x-1/2 whitespace-nowrap rounded-sm border bg-[#0c1830]/90 px-1.5 py-0.5 text-center leading-tight text-white backdrop-blur-sm shadow-[0_6px_16px_-10px_rgba(0,0,0,0.7)] transition-opacity ${
            labelAlwaysOn
              ? "border-[#ef5f17]/60 opacity-100"
              : "border-white/15 opacity-0 group-hover:opacity-100"
          }`}
        >
          <p className="text-[10px] font-semibold">{pin.name}</p>
          <p className="text-[9px] opacity-70">{pin.location}</p>
        </div>
      </div>
    </Html>
  );
}

function GlobeScene({
  pins,
  controlsRef,
  earthRef,
  selectedIndex,
  setSelectedIndex,
}: {
  pins: PartnerPin[];
  controlsRef: React.RefObject<OrbitControlsImpl | null>;
  earthRef: React.RefObject<THREE.Group | null>;
  selectedIndex: number;
  setSelectedIndex: (i: number) => void;
}) {
  const pinVecs = useMemo(
    () => pins.map((p) => latLonToVec3(p.lat, p.lon, GLOBE_RADIUS * PIN_LIFT)),
    [pins],
  );

  const arcs = useMemo(() => {
    const hubIndex = pins.findIndex((p) => p.isHub === true);
    if (hubIndex < 0) return [] as THREE.Vector3[][];
    const hubVec = pinVecs[hubIndex];
    const result: THREE.Vector3[][] = [];
    pinVecs.forEach((v, i) => {
      if (i === hubIndex) return;
      result.push(greatCircleArc(hubVec, v, ARC_STEPS, GLOBE_RADIUS * PIN_LIFT));
    });
    return result;
  }, [pinVecs, pins]);

  // AutoRotate kamerada — etkileşim sırasında dur, bittiğinde devam et.
  useEffect(() => {
    const controls = controlsRef.current;
    if (!controls) return;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.35;
    const onStart = () => {
      controls.autoRotate = false;
    };
    const onEnd = () => {
      controls.autoRotate = true;
    };
    controls.addEventListener("start", onStart);
    controls.addEventListener("end", onEnd);
    return () => {
      controls.removeEventListener("start", onStart);
      controls.removeEventListener("end", onEnd);
    };
  }, [controlsRef]);

  return (
    <>
      <ambientLight intensity={1.0} />
      <hemisphereLight color="#ffffff" groundColor="#445577" intensity={0.6} />
      <directionalLight position={[5, 3, 5]} intensity={0.5} />

      {/* Earth + pin'ler + arc'lar aynı dünya çatısının altında — birlikte hizalanır */}
      <group rotation={[0, GLOBE_Y_OFFSET, 0]}>
        <Suspense fallback={null}>
          <GlobeModel groupRef={earthRef} />
          <Clouds />
        </Suspense>

        {/* Arcs */}
        {arcs.map((pts, i) => (
          <group key={`arc-${i}`}>
            <Line points={pts} color="#ffa860" lineWidth={1.4} transparent opacity={0.9} />
            <Line points={pts} color="#ff7a2e" lineWidth={3.4} transparent opacity={0.18} />
          </group>
        ))}

        {/* Pins */}
        {pins.map((pin, i) => {
          const isSelected = !pin.isHub && selectedIndex === i;
          return (
            <PinHtml
              key={pin.partnerId ?? `pin-${i}`}
              position={pinVecs[i]}
              pin={pin}
              isSelected={isSelected}
              onSelect={() => setSelectedIndex(isSelected ? -1 : i)}
            />
          );
        })}
      </group>

      <Atmosphere />

      <OrbitControls
        ref={controlsRef}
        makeDefault
        enablePan={false}
        enableDamping
        dampingFactor={0.08}
        rotateSpeed={0.6}
        zoomSpeed={0.8}
        minDistance={CAM_MIN_DIST}
        maxDistance={CAM_MAX_DIST}
      />
      <CameraInit />
    </>
  );
}

function CameraInit() {
  const { camera } = useThree();
  useEffect(() => {
    camera.position.copy(CAM_INITIAL);
    camera.lookAt(0, 0, 0);
  }, [camera]);
  return null;
}

export function PartnerWorldMap({
  pins,
  labels = DEFAULT_LABELS,
}: {
  pins: PartnerPin[];
  labels?: PartnerWorldMapLabels;
}) {
  const controlsRef = useRef<OrbitControlsImpl | null>(null);
  const earthRef = useRef<THREE.Group | null>(null);
  const initialIndex = pins.findIndex((p) => p.defaultSelected === true);
  const [selectedIndex, setSelectedIndex] = useState<number>(initialIndex >= 0 ? initialIndex : -1);
  // WebGL bağlamı kaybolduğunda (mobil GPU bellek baskısı vb.) canvas bozuk
  // bir framebuffer'ı ekranda bırakır. Bu durumda üstüne opak statik harita
  // bindirilir; bağlam geri gelince (webglcontextrestored) küreye dönülür.
  const [glLost, setGlLost] = useState(false);

  const zoomBy = (factor: number) => {
    const controls = controlsRef.current;
    if (!controls) return;
    const cam = controls.object;
    const target = controls.target;
    const offset = cam.position.clone().sub(target);
    const newLen = THREE.MathUtils.clamp(offset.length() / factor, CAM_MIN_DIST, CAM_MAX_DIST);
    offset.setLength(newLen);
    cam.position.copy(target).add(offset);
    controls.update();
  };

  const reset = () => {
    const controls = controlsRef.current;
    if (!controls) return;
    controls.object.position.copy(CAM_INITIAL);
    controls.target.set(0, 0, 0);
    controls.update();
  };

  return (
    <div className="relative isolate w-full overflow-hidden bg-[#050a18] shadow-[0_30px_80px_-40px_rgba(0,0,0,0.8)] h-[clamp(420px,70vh,820px)]">
      <Canvas
        camera={{ position: CAM_INITIAL.toArray(), fov: 42, near: 0.1, far: 100 }}
        dpr={1}
        gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }}
        onCreated={({ gl }) => {
          gl.setClearColor("#050a18", 1);
          gl.toneMapping = THREE.NoToneMapping;
          gl.toneMappingExposure = 1.0;
          const canvas = gl.domElement;
          canvas.addEventListener(
            "webglcontextlost",
            (e) => {
              // preventDefault → tarayıcının bağlamı geri yükleme şansı korunur
              e.preventDefault();
              setGlLost(true);
            },
            false,
          );
          canvas.addEventListener("webglcontextrestored", () => setGlLost(false), false);
        }}
      >
        <GlobeScene
          pins={pins}
          controlsRef={controlsRef}
          earthRef={earthRef}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        />
      </Canvas>

      {/* WebGL bağlamı kaybolduğunda bozuk canvas'ı örten opak statik harita */}
      {glLost && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-[#050a18]">
          <PartnerHeroMap className="h-auto w-[88%] max-w-3xl opacity-90" />
        </div>
      )}

      {/* Controls */}
      <div
        className={`absolute bottom-4 right-4 z-20 flex flex-col gap-1.5 ${glLost ? "hidden" : ""}`}
      >
        <button
          type="button"
          onClick={() => zoomBy(1.3)}
          aria-label={labels.zoomIn}
          className="flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-white/[0.06] text-white/80 backdrop-blur-sm transition hover:bg-white/[0.12] hover:text-white"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => zoomBy(1 / 1.3)}
          aria-label={labels.zoomOut}
          className="flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-white/[0.06] text-white/80 backdrop-blur-sm transition hover:bg-white/[0.12] hover:text-white"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
          </svg>
        </button>
        <button
          type="button"
          onClick={reset}
          aria-label={labels.reset}
          className="flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-white/[0.06] text-white/80 backdrop-blur-sm transition hover:bg-white/[0.12] hover:text-white"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 4v6h6M20 20v-6h-6M5.5 9a7 7 0 0111.9-2.6L20 9M18.5 15a7 7 0 01-11.9 2.6L4 15"
            />
          </svg>
        </button>
      </div>

      {/* Hint */}
      <div className="pointer-events-none absolute bottom-4 left-4 z-20 select-none text-[10px] uppercase tracking-[0.18em] text-white/35">
        {labels.hint}
      </div>
    </div>
  );
}
