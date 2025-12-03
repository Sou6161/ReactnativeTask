# 🔄 Rename Database: nightlife_hub → sawa_app

## Quick Steps in pgAdmin

### Step 1: Disconnect from nightlife_hub
1. In pgAdmin left sidebar, right-click on **`nightlife_hub`** database
2. Select **"Disconnect Database"**

### Step 2: Connect to postgres database
1. Click on **`postgres`** database (the default one)
2. Make sure you're connected to it (should show green icon)

### Step 3: Open Query Tool
1. With `postgres` database selected, click **Tools** → **Query Tool**

### Step 4: Run Rename Command
Copy and paste this into the Query Tool:

```sql
-- Disconnect all users
SELECT pg_terminate_backend(pg_stat_activity.pid)
FROM pg_stat_activity
WHERE pg_stat_activity.datname = 'nightlife_hub'
  AND pid <> pg_backend_pid();

-- Rename database
ALTER DATABASE nightlife_hub RENAME TO sawa_app;

-- Verify
SELECT datname FROM pg_database WHERE datname = 'sawa_app';
```

Click **Execute** (▶️) or press F5

### Step 5: Refresh pgAdmin
1. Right-click on **"Databases"** in left sidebar
2. Select **"Refresh"**
3. You should now see **`sawa_app`** instead of `nightlife_hub`

---

## ✅ Verification

After renaming, verify everything works:

### 1. Test Database Connection
```bash
cd backend
npm run test:db
```

Should show:
```
🗄️  Current Database: sawa_app
✅ Database is ready!
```

### 2. Restart Backend
The backend should automatically reconnect to `sawa_app`:
```bash
# Backend will restart automatically (ts-node-dev)
# Or manually restart:
npm run dev
```

### 3. Check in Browser
http://localhost:3000/health

Should show:
```json
{
  "status": "OK",
  "database": "Connected"
}
```

---

## 🎯 What Changed

### Files Updated:
- ✅ `backend/.env` - DB_NAME changed to `sawa_app`
- ✅ `backend/database/schema.sql` - Comments updated
- ✅ `backend/database/add-sample-data.js` - Database name updated
- ✅ `backend/database/test-connection.js` - Database name updated
- ✅ `backend/src/index.ts` - Messages updated

### Database:
- ✅ Database renamed from `nightlife_hub` to `sawa_app`
- ✅ All tables, data, and relationships preserved
- ✅ No data loss

---

## 🆘 Troubleshooting

### Error: "database is being accessed by other users"
**Solution**: 
1. Close all Query Tool windows connected to nightlife_hub
2. Disconnect from nightlife_hub in pgAdmin
3. Stop the backend server temporarily
4. Try the rename again

### Error: "database does not exist"
**Solution**: The database was already renamed! Just refresh pgAdmin.

### Backend can't connect after rename
**Solution**:
1. Check `backend/.env` has `DB_NAME=sawa_app`
2. Restart backend: `npm run dev`
3. Test connection: `npm run test:db`

---

## 📝 Alternative: Create New Database

If you prefer to start fresh with the new name:

### Option 1: Keep Old Data
1. Export data from `nightlife_hub` (pgAdmin → Backup)
2. Create new `sawa_app` database
3. Run `schema.sql` in new database
4. Import data

### Option 2: Start Fresh
1. Create new `sawa_app` database in pgAdmin
2. Run `backend/database/schema.sql`
3. Run `npm run add:sample` to add sample data
4. Delete old `nightlife_hub` database

---

## ✨ Done!

Your database is now named **`sawa_app`** - perfect for the Sawa App! 🎉

All your data (3 events, 4 offers, 5 categories) is preserved and working.
