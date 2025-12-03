# 🧪 API Testing Guide

## How to Add Data and Verify in Database

### Method 1: Using Browser/Postman/Thunder Client

#### 1. Add a New Event

**POST** `http://localhost:3000/api/events`

**Body (JSON):**
```json
{
  "title": "Jazz Night at The Blue Note",
  "description": "An evening of smooth jazz with live performances",
  "short_description": "Live jazz music and cocktails",
  "image_url": "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=400&h=300&fit=crop",
  "event_date": "2025-01-15",
  "start_time": "20:00",
  "price_min": 150,
  "category_id": 5
}
```

**Response:**
```json
{
  "success": true,
  "message": "Event created successfully",
  "data": {
    "id": 1,
    "title": "Jazz Night at The Blue Note",
    ...
  }
}
```

#### 2. Add a New Offer

**POST** `http://localhost:3000/api/offers`

**Body (JSON):**
```json
{
  "title": "Happy Hour Special",
  "description": "50% off all drinks from 5-7 PM",
  "discount_percentage": 50,
  "original_price": 200,
  "image_url": "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=300&h=400&fit=crop",
  "category_id": 4
}
```

**Response:**
```json
{
  "success": true,
  "message": "Offer created successfully",
  "data": {
    "id": 1,
    "title": "Happy Hour Special",
    "final_price": 100,
    ...
  }
}
```

#### 3. Add a New Category

**POST** `http://localhost:3000/api/categories`

**Body (JSON):**
```json
{
  "name": "Rooftop",
  "description": "Rooftop bars and lounges with city views",
  "icon": "building"
}
```

---

### Method 2: Using cURL (Terminal)

#### Add an Event:
```bash
curl -X POST http://localhost:3000/api/events \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Sunset Rooftop Party",
    "description": "Dance under the stars with amazing city views",
    "short_description": "Rooftop party with DJ",
    "image_url": "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=300&fit=crop",
    "event_date": "2025-01-20",
    "start_time": "18:00",
    "price_min": 200,
    "category_id": 3
  }'
```

#### Add an Offer:
```bash
curl -X POST http://localhost:3000/api/offers \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Weekend Brunch Deal",
    "description": "All-you-can-eat brunch buffet",
    "discount_percentage": 30,
    "original_price": 300,
    "image_url": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300&h=400&fit=crop",
    "category_id": 2
  }'
```

---

### Method 3: Verify in pgAdmin

After adding data via API:

1. **Open pgAdmin**
2. Navigate to: `nightlife_hub` → `Schemas` → `public` → `Tables`
3. Right-click on `events` table
4. Select **"View/Edit Data"** → **"All Rows"**
5. You should see your newly added event!

Or run this query in Query Tool:
```sql
-- View all events
SELECT * FROM events ORDER BY created_at DESC;

-- View all offers
SELECT * FROM offers ORDER BY created_at DESC;

-- Count total records
SELECT 
  (SELECT COUNT(*) FROM events) as total_events,
  (SELECT COUNT(*) FROM offers) as total_offers,
  (SELECT COUNT(*) FROM categories) as total_categories;
```

---

### Method 4: Using the API to Verify

After adding data, fetch it:

**GET** `http://localhost:3000/api/events`
```bash
curl http://localhost:3000/api/events
```

**GET** `http://localhost:3000/api/offers`
```bash
curl http://localhost:3000/api/offers
```

**GET** `http://localhost:3000/api/categories`
```bash
curl http://localhost:3000/api/categories
```

---

## 📊 Quick Test Workflow

### Step 1: Add Sample Data
```bash
# Add an event
curl -X POST http://localhost:3000/api/events \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Event","event_date":"2025-02-01","start_time":"19:00","price_min":100,"category_id":1}'

# Add an offer
curl -X POST http://localhost:3000/api/offers \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Offer","discount_percentage":25,"original_price":400,"category_id":1}'
```

### Step 2: Verify via API
```bash
# Check events
curl http://localhost:3000/api/events

# Check offers
curl http://localhost:3000/api/offers
```

### Step 3: Verify in pgAdmin
1. Open pgAdmin
2. Right-click `events` table → View/Edit Data → All Rows
3. You should see your test event!

---

## 🎯 Available Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/categories` | Get all categories |
| POST | `/api/categories` | Add new category |
| GET | `/api/categories/:id` | Get single category |
| GET | `/api/events` | Get all events |
| POST | `/api/events` | Add new event |
| GET | `/api/offers` | Get all offers |
| POST | `/api/offers` | Add new offer |
| GET | `/api/users` | Get all users |

---

## 🔍 Debugging Tips

### Check if data was added:
```sql
-- In pgAdmin Query Tool
SELECT COUNT(*) FROM events;
SELECT COUNT(*) FROM offers;

-- View latest entries
SELECT * FROM events ORDER BY created_at DESC LIMIT 5;
SELECT * FROM offers ORDER BY created_at DESC LIMIT 5;
```

### Check backend logs:
Look at your terminal where `npm run dev` is running. You should see:
```
Executed query { text: 'INSERT INTO events...', duration: 15, rows: 1 }
```

---

## 🎨 Sample Data for Testing

Copy and paste these into your API client:

### Event 1: Concert
```json
{
  "title": "Amr Diab Live Concert",
  "description": "The legendary Egyptian singer performs his greatest hits",
  "short_description": "Live concert with Amr Diab",
  "image_url": "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=400&h=300&fit=crop",
  "event_date": "2025-02-14",
  "start_time": "21:00",
  "price_min": 500,
  "category_id": 5
}
```

### Event 2: Disco Night
```json
{
  "title": "80s Retro Disco Night",
  "description": "Dance to the best hits from the 80s",
  "short_description": "Retro disco party",
  "image_url": "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=300&fit=crop",
  "event_date": "2025-01-25",
  "start_time": "22:00",
  "price_min": 150,
  "category_id": 3
}
```

### Offer 1: Restaurant Deal
```json
{
  "title": "Dinner for Two Special",
  "description": "3-course meal for two people",
  "discount_percentage": 40,
  "original_price": 600,
  "image_url": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300&h=400&fit=crop",
  "category_id": 2
}
```

### Offer 2: Cafe Deal
```json
{
  "title": "Coffee & Cake Combo",
  "description": "Any coffee with a slice of cake",
  "discount_percentage": 20,
  "original_price": 100,
  "image_url": "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=400&fit=crop",
  "category_id": 1
}
```
