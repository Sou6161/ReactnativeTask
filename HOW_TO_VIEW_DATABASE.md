# 📊 How to View and Add Data to Database

## 🎯 3 Easy Ways to View Your Database

### Method 1: Using the Test Page (Easiest!)

1. **Open the test page in your browser:**
   ```
   file:///path/to/your/project/backend/test-api.html
   ```
   Or just double-click `backend/test-api.html` file

2. **You can:**
   - ✅ Add events, offers, and categories using forms
   - ✅ View all data with one click
   - ✅ See results immediately

### Method 2: Using pgAdmin (Visual Database View)

1. **Open pgAdmin 4**
2. **Navigate to your data:**
   - Expand: `PostgreSQL 18` → `Databases` → `nightlife_hub`
   - Expand: `Schemas` → `public` → `Tables`
3. **View any table:**
   - Right-click on table (e.g., `events`)
   - Select: **"View/Edit Data"** → **"All Rows"**
   - You'll see all data in a spreadsheet view

4. **Run custom queries:**
   - Click on `nightlife_hub` database
   - Click: **Tools** → **Query Tool**
   - Run queries like:
   ```sql
   SELECT * FROM events;
   SELECT * FROM offers;
   SELECT * FROM categories;
   ```

### Method 3: Using Browser/API

1. **View Categories:**
   ```
   http://localhost:3000/api/categories
   ```

2. **View Events:**
   ```
   http://localhost:3000/api/events
   ```

3. **View Offers:**
   ```
   http://localhost:3000/api/offers
   ```

---

## ➕ How to Add Data

### Option 1: Use the Test Page (Recommended)

1. Open `backend/test-api.html` in your browser
2. Fill in the forms
3. Click "Add Event" or "Add Offer"
4. See the result immediately
5. Click "View Events" or "View Offers" to verify

### Option 2: Use cURL (Terminal)

**Add an Event:**
```bash
curl -X POST http://localhost:3000/api/events \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Jazz Night",
    "description": "Live jazz music",
    "event_date": "2025-02-01",
    "start_time": "20:00",
    "price_min": 150,
    "category_id": 5
  }'
```

**Add an Offer:**
```bash
curl -X POST http://localhost:3000/api/offers \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Happy Hour",
    "description": "50% off drinks",
    "discount_percentage": 50,
    "original_price": 200,
    "category_id": 4
  }'
```

### Option 3: Manually in pgAdmin

1. Open pgAdmin
2. Right-click on table → **"View/Edit Data"** → **"All Rows"**
3. Click the **"+"** button at the top
4. Fill in the fields
5. Click **"Save"** (💾 icon)

---

## ✅ How to Verify Data Was Added

### Quick Check:
1. **In Browser:** Go to http://localhost:3000/api/events
2. **In pgAdmin:** Right-click `events` table → View/Edit Data → All Rows
3. **In Test Page:** Click "View Events" button

### SQL Query in pgAdmin:
```sql
-- Count total records
SELECT 
  (SELECT COUNT(*) FROM events) as total_events,
  (SELECT COUNT(*) FROM offers) as total_offers,
  (SELECT COUNT(*) FROM categories) as total_categories;

-- View latest entries
SELECT * FROM events ORDER BY created_at DESC LIMIT 5;
SELECT * FROM offers ORDER BY created_at DESC LIMIT 5;
```

---

## 🎨 Sample Data to Test

### Event Example:
```json
{
  "title": "Amr Diab Concert",
  "description": "Live performance by the legendary singer",
  "short_description": "Concert with Amr Diab",
  "image_url": "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=400&h=300&fit=crop",
  "event_date": "2025-02-14",
  "start_time": "21:00",
  "price_min": 500,
  "category_id": 5
}
```

### Offer Example:
```json
{
  "title": "Weekend Brunch Deal",
  "description": "All-you-can-eat brunch buffet",
  "discount_percentage": 30,
  "original_price": 300,
  "image_url": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300&h=400&fit=crop",
  "category_id": 2
}
```

---

## 🔍 Troubleshooting

### "Cannot POST /api/events"
- Make sure backend is running: `npm run dev`
- Check URL is correct: `http://localhost:3000/api/events`

### Data not showing in pgAdmin
- Right-click on table and select "Refresh"
- Or press F5 in the data view

### "Failed to fetch"
- Make sure backend is running on port 3000
- Check browser console for errors
- Try opening http://localhost:3000/health first

---

## 📝 Quick Reference

| Action | Method | URL |
|--------|--------|-----|
| View all events | GET | http://localhost:3000/api/events |
| Add event | POST | http://localhost:3000/api/events |
| View all offers | GET | http://localhost:3000/api/offers |
| Add offer | POST | http://localhost:3000/api/offers |
| View categories | GET | http://localhost:3000/api/categories |
| Add category | POST | http://localhost:3000/api/categories |

---

## 🎉 You're All Set!

Now you can:
- ✅ Add data using the test page or API
- ✅ View data in pgAdmin or browser
- ✅ Verify everything is saved in the database
- ✅ Test your backend is working correctly

**Next:** Update your frontend to use real data from the API instead of mock data!
