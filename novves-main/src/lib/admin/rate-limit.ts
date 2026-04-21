interface LoginAttempt {
  count: number;
  firstAttempt: number;
}

interface AccountLockout {
  failedCount: number;
  lockedUntil: number | null;
}

const LOGIN_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_ATTEMPTS_PER_WINDOW = 5;
const LOCKOUT_THRESHOLD = 10;
const LOCKOUT_DURATION_MS = 30 * 60 * 1000; // 30 minutes
const CLEANUP_INTERVAL_MS = 10 * 60 * 1000; // cleanup every 10 minutes

const ipAttempts = new Map<string, LoginAttempt>();
const accountLockouts = new Map<string, AccountLockout>();

// Periodic cleanup of stale entries
let lastCleanup = Date.now();

function cleanup(): void {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL_MS) return;
  lastCleanup = now;

  for (const [ip, entry] of ipAttempts) {
    if (now - entry.firstAttempt > LOGIN_WINDOW_MS) {
      ipAttempts.delete(ip);
    }
  }

  for (const [ip, entry] of accountLockouts) {
    if (entry.lockedUntil && now > entry.lockedUntil) {
      accountLockouts.delete(ip);
    }
  }
}

export interface RateLimitResult {
  allowed: boolean;
  retryAfterSeconds?: number;
  reason?: string;
}

export function checkLoginRateLimit(ip: string): RateLimitResult {
  cleanup();
  const now = Date.now();

  // Check account lockout first
  const lockout = accountLockouts.get(ip);
  if (lockout?.lockedUntil && now < lockout.lockedUntil) {
    const retryAfter = Math.ceil((lockout.lockedUntil - now) / 1000);
    return {
      allowed: false,
      retryAfterSeconds: retryAfter,
      reason: "Account temporarily locked due to too many failed attempts",
    };
  }

  // Check IP rate limit
  const entry = ipAttempts.get(ip);
  if (!entry || now - entry.firstAttempt > LOGIN_WINDOW_MS) {
    // Window expired or first attempt — allow
    return { allowed: true };
  }

  if (entry.count >= MAX_ATTEMPTS_PER_WINDOW) {
    const retryAfter = Math.ceil(
      (entry.firstAttempt + LOGIN_WINDOW_MS - now) / 1000
    );
    return {
      allowed: false,
      retryAfterSeconds: retryAfter,
      reason: "Too many login attempts. Please try again later.",
    };
  }

  return { allowed: true };
}

export function recordLoginAttempt(ip: string, success: boolean): void {
  const now = Date.now();

  if (success) {
    // Clear on successful login
    ipAttempts.delete(ip);
    accountLockouts.delete(ip);
    return;
  }

  // Track IP attempts within window
  const entry = ipAttempts.get(ip);
  if (!entry || now - entry.firstAttempt > LOGIN_WINDOW_MS) {
    ipAttempts.set(ip, { count: 1, firstAttempt: now });
  } else {
    entry.count++;
  }

  // Track cumulative failures for lockout
  const lockout = accountLockouts.get(ip) ?? { failedCount: 0, lockedUntil: null };
  lockout.failedCount++;

  if (lockout.failedCount >= LOCKOUT_THRESHOLD) {
    lockout.lockedUntil = now + LOCKOUT_DURATION_MS;
    lockout.failedCount = 0; // reset counter after lockout
  }

  accountLockouts.set(ip, lockout);
}
