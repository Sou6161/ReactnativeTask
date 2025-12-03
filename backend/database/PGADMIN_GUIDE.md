# pgAdmin Visual Setup Guide

## 📋 Quick Steps Checklist

- [ ] Step 1: Create Database
- [ ] Step 2: Run Schema SQL
- [ ] Step 3: Set Password in .env
- [ ] Step 4: Test Connection
- [ ] Step 5: Start Backend

---

## Step 1: Create Database in pgAdmin

### 1.1 Open pgAdmin and Connect to Server
- Open pgAdmin 4
- You should see "PostgreSQL 18" in the left sidebar
- If not connected, double-click it and enter your password

### 1.2 Create New Database
1. In the left sidebar, expand **"PostgreSQL 18"**
2. Right-click on **"Databases"**
3. Select **"Create" → "Database..."**

### 1.3 Fill in Database Details
In the "Create - Database" dialog:

**General Tab:**
- **Database**: `nightlife_hub`
- **Owner**: `postgres`
- **Comment**: (optional) "Nightlife Hub Application Database"

**Definition Tab:**
- **Encoding**: `UTF8`
- **Template**: `template0`
- **Tablespace**: `pg_default`
- **Collation**: `C`
- **Character Type**: `C`
- **Connection Limit**: `-1`

Click **"Save"** button at the bottom right

---

## Step 2: Run Schema SQL

### 2.1 Open Query Tool
1. In the left sidebar, click on **"nightlife_hub"** database (the one you just created)
2. Click **"Tools"** in the top menu bar
3. Select **"Query Tool"** (or press F5)

### 2.2 Load Schema File
1. In the Query Tool window, click the **"Open File"** icon (📁 folder icon)
2. Navigate to your project folder
3. Go to: `backend/database/schema.sql`
4. Click **"Select"** or **"Open"**

### 2.3 Execute the SQL
1. You should see the SQL code in the editor
2. Click the **"Execute/Run"** button (▶️ play icon) or press **F5**
3. Wait for execution to complete (should take 1-2 seconds)

### 2.4 Verify Success
In the **"Data Output"** panel at the bottom, you should see:
- Multiple "CREATE TABLE" success messages
- "CREATE INDEX" success messages
- "CREATE TRIGGER" success messages
- Final message: "Database schema created successfully! ✅"

---

## Step 3: Verify Tables Were Created

### 3.1 Refresh Database
1. In the left sidebar, right-click on **"nightlife_hub"**
2. Select **"Refresh"**

### 3.2 Check Tables
1. Expand **"nightlife_hub"**
2. Expand **"Schemas"**
3. Expand **"public"**
4. Expand **"Tables"**

You should see these 6 tables:
- ✓ categories
- ✓ event_attendees
- ✓ events
- ✓ offers
- ✓ users
- ✓ venues

### 3.3 View Sample Data
1. Right-click on **"categories"** table
2. Select **"View/Edit Data" → "All Rows"**
3. You should see 5 sample categories (Cafe, Restaurant, Disco, Bar, Live Music)

---

## Step 4: Set PostgreSQL Password

### Option A: If you already know your password
1. Open `backend/.env` file in your code editor
2. Find the line: `DB_PASSWORD=`
3. Add your password: `DB_PASSWORD=your_password_here`
4. Save the file

### Option B: If you need to set/reset password
1. In pgAdmin left sidebar, expand **"Login/Group Roles"**
2. Right-click on **"postgres"**
3. Select **"Properties"**
4. Go to **"Definition"** tab
5. Enter a new password in **"Password"** field
6. Click **"Save"**
7. Update `backend/.env` with this password

### Option C: No password (not recommended for production)
If postgres user has no password:
1. Leave `DB_PASSWORD=` empty in `.env` file
2. Or remove the line entirely

---

## Step 5: Test Database Connection

### 5.1 Run Test Script
Open terminal and run:
```bash
cd backend
npm run test:db
```

### 5.2 Expected Output
You should see:
```
🔍 Testing PostgreSQL Connection...

Configuration:
  Host: localhost
  Port: 5432
  Database: nightlife_hub
  User: postgres
  Password: ***rd

✅ Connection successful!

📊 PostgreSQL Version:
   PostgreSQL 18.1

🗄️  Current Database:
   nightlife_hub

📋 Tables found:
   ✓ categories
   ✓ event_attendees
   ✓ events
   ✓ offers
   ✓ users
   ✓ venues

📊 Row counts:
   categories: 5 rows
   event_attendees: 0 rows
   events: 0 rows
   offers: 0 rows
   users: 0 rows
   venues: 0 rows

✅ Database is ready!
```

---

## Step 6: Start Backend Server

```bash
cd backend
npm run dev
```

Expected output:
```
🔍 Testing database connection...
✅ Database connection established
📊 Database connected at: [timestamp]
🗄️  PostgreSQL version: PostgreSQL 18.1

🚀 Server is running on:
   - Local:   http://localhost:3000
   - Network: http://192.168.1.10:3000
📊 Environment: development
```

---

## Step 7: Test API Endpoints

Open your browser and test these URLs:

1. **Health Check**: http://localhost:3000/health
   ```json
   {
     "status": "OK",
     "message": "Server is running",
     "database": "Connected",
     "timestamp": "..."
   }
   ```

2. **Categories**: http://localhost:3000/api/categories
   ```json
   {
     "success": true,
     "data": [
       {"id": 1, "name": "Cafe", "slug": "cafe", ...},
       ...
     ]
   }
   ```

3. **Events**: http://localhost:3000/api/events
4. **Offers**: http://localhost:3000/api/offers
5. **Users**: http://localhost:3000/api/users

---

## 🎉 Success!

If all steps completed successfully:
- ✅ Database created
- ✅ Schema loaded
- ✅ Tables created
- ✅ Backend connected
- ✅ API endpoints working

## 🔧 Troubleshooting

### Problem: Can't see "Create Database" option
**Solution**: Make sure you're right-clicking on "Databases" (plural), not a specific database

### Problem: SQL execution fails
**Solution**: 
- Make sure you're connected to the correct database
- Check if you have permission to create tables
- Try running the SQL in smaller chunks

### Problem: "password authentication failed"
**Solution**: 
- Double-check password in `.env` file
- Make sure there are no extra spaces
- Try resetting postgres password in pgAdmin

### Problem: Tables not showing up
**Solution**:
- Right-click on database and select "Refresh"
- Make sure SQL executed without errors
- Check "Messages" tab in Query Tool for errors

---

## 📚 Additional Resources

- [pgAdmin Documentation](https://www.pgadmin.org/docs/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/18/)
- Project README: `backend/database/SETUP_INSTRUCTIONS.md`
