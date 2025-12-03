# Database Setup Instructions

## Step-by-Step Guide to Setup PostgreSQL Database

### Step 1: Create Database in pgAdmin

1. Open **pgAdmin 4**
2. Connect to your **PostgreSQL 18** server
3. Right-click on **"Databases"** in the left sidebar
4. Select **"Create" → "Database..."**
5. In the dialog:
   - **Database name**: `nightlife_hub`
   - **Owner**: `postgres`
   - **Encoding**: `UTF8`
   - Click **"Save"**

### Step 2: Run the Schema SQL

1. In pgAdmin, click on the **nightlife_hub** database you just created
2. Click on **"Tools"** in the top menu
3. Select **"Query Tool"** (or press F5)
4. Open the file `backend/database/schema.sql`:
   - Click **"Open File"** icon (folder icon) in the Query Tool
   - Navigate to your project folder
   - Select `backend/database/schema.sql`
5. Click **"Execute/Run"** button (▶️ play icon) or press **F5**
6. You should see success messages in the output panel

### Step 3: Verify Tables Were Created

In the Query Tool, run this query:

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;
```

You should see these tables:
- categories
- event_attendees
- events
- offers
- users
- venues

### Step 4: Set Database Password

1. Open `backend/.env` file
2. Set your PostgreSQL password:
   ```
   DB_PASSWORD=your_postgres_password_here
   ```
3. Save the file

**Note**: If you don't have a password set for postgres user, you can leave it empty or set one:

To set a password in pgAdmin:
1. Right-click on **"Login/Group Roles" → "postgres"**
2. Select **"Properties"**
3. Go to **"Definition"** tab
4. Enter a password
5. Click **"Save"**

### Step 5: Restart Backend Server

```bash
cd backend
npm run dev
```

You should see:
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

### Step 6: Test the Connection

Open your browser and go to:
```
http://localhost:3000/health
```

You should see:
```json
{
  "status": "OK",
  "message": "Server is running",
  "database": "Connected",
  "timestamp": "2024-..."
}
```

### Step 7: Verify API Endpoints

Test these endpoints in your browser:

1. **Categories**: http://localhost:3000/api/categories
2. **Events**: http://localhost:3000/api/events
3. **Offers**: http://localhost:3000/api/offers
4. **Users**: http://localhost:3000/api/users

They should return empty arrays initially:
```json
{
  "success": true,
  "data": []
}
```

## Troubleshooting

### Error: "password authentication failed"

**Solution**: Update the password in `backend/.env` file

### Error: "database does not exist"

**Solution**: Make sure you created the database named `nightlife_hub` in pgAdmin

### Error: "relation does not exist"

**Solution**: Run the `schema.sql` file in pgAdmin Query Tool

### Error: "connection refused"

**Solution**: 
1. Make sure PostgreSQL is running
2. Check if port 5432 is correct
3. Verify DB_HOST is set to `localhost` in `.env`

### Can't connect to pgAdmin

**Solution**:
1. Make sure PostgreSQL service is running
2. On macOS: `brew services start postgresql@18`
3. Check pgAdmin connection settings

## Next Steps

Once the database is connected:

1. ✅ Database schema is created
2. ✅ Backend is connected to database
3. ✅ API endpoints are working
4. 📝 Add sample data (optional)
5. 📝 Update frontend to use real data instead of mock data

## Sample Data (Optional)

The schema.sql already includes sample categories. To add more test data, you can run additional INSERT statements in pgAdmin Query Tool.

Example:
```sql
-- Add a sample venue
INSERT INTO venues (name, slug, address, city, country, category_id)
VALUES ('The Jazz Club', 'the-jazz-club', '123 Main St', 'Cairo', 'Egypt', 5);

-- Add a sample event
INSERT INTO events (title, slug, event_date, start_time, price_min, venue_id, category_id)
VALUES ('Live Jazz Night', 'live-jazz-night', '2025-01-15', '20:00', 100.00, 1, 5);
```
