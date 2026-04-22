import { Pool } from "pg";
import bcrypt from "bcryptjs";

const databaseUrl = process.env.DATABASE_URL;
const username = process.env.ADMIN_USERNAME;
const password = process.env.ADMIN_PASSWORD;

if (!databaseUrl) {
  console.error("Missing DATABASE_URL environment variable.");
  process.exit(1);
}

if (!username || !password) {
  console.error(
    "Missing credentials. Set ADMIN_USERNAME and ADMIN_PASSWORD environment variables."
  );
  process.exit(1);
}

if (password.length < 8) {
  console.error("ADMIN_PASSWORD must be at least 8 characters.");
  process.exit(1);
}

const pool = new Pool({
  connectionString: databaseUrl,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
});

try {
  const passwordHash = await bcrypt.hash(password, 12);

  const existing = await pool.query(
    "SELECT id FROM admin_users WHERE username = $1 LIMIT 1",
    [username]
  );

  if (existing.rowCount && existing.rowCount > 0) {
    await pool.query(
      `UPDATE admin_users
       SET password_hash = $1,
           role = 'admin',
           is_active = true,
           failed_attempts = 0,
           locked_until = NULL,
           updated_at = NOW()
       WHERE username = $2`,
      [passwordHash, username]
    );
    console.log(`Updated admin user: ${username}`);
  } else {
    await pool.query(
      `INSERT INTO admin_users (username, password_hash, role, is_active, failed_attempts)
       VALUES ($1, $2, 'admin', true, 0)`,
      [username, passwordHash]
    );
    console.log(`Created admin user: ${username}`);
  }
} catch (error) {
  console.error("Failed to create/update admin user.");
  console.error(error);
  process.exitCode = 1;
} finally {
  await pool.end();
}
