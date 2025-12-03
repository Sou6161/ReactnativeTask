-- ============================================
-- Rename Database from nightlife_hub to sawa_app
-- ============================================

-- IMPORTANT: Run this in pgAdmin Query Tool while connected to 'postgres' database
-- NOT connected to nightlife_hub database!

-- Step 1: Disconnect all users from nightlife_hub
SELECT pg_terminate_backend(pg_stat_activity.pid)
FROM pg_stat_activity
WHERE pg_stat_activity.datname = 'nightlife_hub'
  AND pid <> pg_backend_pid();

-- Step 2: Rename the database
ALTER DATABASE nightlife_hub RENAME TO sawa_app;

-- Step 3: Verify
SELECT datname FROM pg_database WHERE datname = 'sawa_app';

-- Success message
SELECT 'Database renamed successfully to sawa_app! ✅' as status;
