import type { SolutionLibraryUi } from "@/lib/solution-library-ui";

export type SolutionSectorBuildingType = {
  buildingType: string;
  description: string;
  products: string;
  productFamilies: string;
};

type Props = {
  items: SolutionSectorBuildingType[];
  ui: SolutionLibraryUi;
};

export function SolutionLibrarySectorSection({ items, ui }: Props) {
  if (items.length === 0) return null;

  return (
    <section
      id="bolum-sektor-yapi-tipi"
      aria-labelledby="solution-sector-building-types-heading"
      className="scroll-mt-28"
    >
      <div className="overflow-hidden rounded-xl border border-sand-300/80 bg-white shadow-[0_8px_32px_-12px_rgba(25,28,30,0.06)] sm:rounded-2xl">
        <div className="border-b border-sand-200 px-4 py-4 sm:px-6 sm:py-5">
          <h2
            id="solution-sector-building-types-heading"
            className="text-lg font-black uppercase tracking-tight text-ink sm:text-xl"
          >
            {ui.sectorBuildingTypesTitle}
          </h2>
          {ui.sectorBuildingTypesDesc ? (
            <p className="mt-1.5 max-w-3xl text-sm leading-relaxed text-secondary/75">
              {ui.sectorBuildingTypesDesc}
            </p>
          ) : null}
        </div>

        <div className="hidden md:block">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[48rem] border-collapse text-left">
              <thead className="bg-sand-100">
                <tr>
                  <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-secondary sm:px-5">
                    {ui.sectorColBuildingType}
                  </th>
                  <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-secondary sm:px-5">
                    {ui.sectorColDescription}
                  </th>
                  <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-secondary sm:px-5">
                    {ui.sectorColProducts}
                  </th>
                  <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-secondary sm:px-5">
                    {ui.sectorColFamilies}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sand-200">
                {items.map((item) => (
                  <tr key={item.buildingType} className="align-top">
                    <td className="min-w-[10rem] px-4 py-3.5 text-sm font-bold text-ink sm:px-5">
                      {item.buildingType}
                    </td>
                    <td className="min-w-[12rem] px-4 py-3.5 text-sm leading-relaxed text-secondary/80 sm:px-5">
                      {item.description}
                    </td>
                    <td className="min-w-[11rem] px-4 py-3.5 text-sm leading-relaxed text-secondary/80 sm:px-5">
                      {item.products}
                    </td>
                    <td className="min-w-[8rem] px-4 py-3.5 text-sm italic leading-relaxed text-ink sm:px-5">
                      {item.productFamilies}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <ul className="divide-y divide-sand-200 md:hidden">
          {items.map((item) => (
            <li key={item.buildingType} className="px-4 py-4 sm:px-5">
              <p className="text-sm font-bold text-ink">{item.buildingType}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-secondary/80">{item.description}</p>
              {item.products ? (
                <p className="mt-2 text-xs text-secondary/75">
                  <span className="font-semibold text-ink">{ui.sectorColProducts}: </span>
                  {item.products}
                </p>
              ) : null}
              {item.productFamilies ? (
                <p className="mt-1 text-xs italic text-ink">{item.productFamilies}</p>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
