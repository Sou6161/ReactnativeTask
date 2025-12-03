# Sawa App

A full-stack React Native application with Express backend and PostgreSQL database for discovering nightlife events, offers, and venues.

## 🎯 Project Overview

Sawa App helps users discover and explore nightlife events, exclusive offers, and popular venues. Built with React Native (Expo) for the frontend and Express.js with PostgreSQL for the backend.

## 📁 Project Structure

```
├── frontend/          # React Native (Expo) mobile app
├── backend/           # Express.js API server
│   ├── src/          # Source code
│   │   ├── config/   # Database configuration
│   │   ├── models/   # TypeScript type definitions
│   │   └── routes/   # API route handlers
│   └── database/     # Database scripts and schema
└── docs/             # Documentation
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL 18.1
- Expo CLI
- pgAdmin (for database management)

### 1. Setup Database

1. **Create Database in pgAdmin:**
   - Open pgAdmin
   - Right-click "Databases" → Create → Database
   - Name: `sawa_app`
   - Owner: `postgres`

2. **Run Schema:**
   - Connect to `sawa_app` database
   - Open Query Tool (Tools → Query Tool)
   - Open and execute `backend/database/schema.sql`

3. **Add Sample Data:**
   ```bash
   cd backend
   npm run add:sample
   ```

### 2. Setup Backend

```bash
cd backend
npm install

# Configure environment
# Edit backend/.env and set your PostgreSQL password:
# DB_PASSWORD=your_password

# Test database connection
npm run test:db

# Start backend server
npm run dev
```

The backend will start on:
- **Local**: http://localhost:3000
- **Network**: http://192.168.1.10:3000

### 3. Setup Frontend

```bash
cd frontend
npm install
npm start
```

Then press:
- `a` for Android emulator
- `i` for iOS simulator
- `w` for Web browser
- Scan QR code with Expo Go app on your phone

## ✅ Current Status

### Backend
- ✅ Running on http://192.168.1.10:3000
- ✅ Connected to PostgreSQL database (`sawa_app`)
- ✅ All API endpoints working
- ✅ Sample data loaded

### Database
- ✅ PostgreSQL 18.1
- ✅ Database: `sawa_app`
- ✅ 6 tables created (categories, events, offers, venues, users, event_attendees)
- ✅ Sample data: 5 categories, 3 events, 4 offers

### Frontend
- ✅ React Native (Expo) app
- ✅ Connected to backend
- ✅ Currently using mock data (ready to switch to API)

### Testing the Connection

1. **Backend health check**: http://192.168.1.10:3000/health
   - Should show: `"database": "Connected"`

2. **Frontend**: Look for "Backend: ✅ Connected" at the top of the app

3. **API Endpoints**:
   - Categories: http://localhost:3000/api/categories
   - Events: http://localhost:3000/api/events
   - Offers: http://localhost:3000/api/offers

If you see "Backend: ❌ Disconnected", check the [Network Setup Guide](docs/NETWORK_SETUP.md)

## 🗄️ Database Schema

### Tables
- **categories** - Event/venue categories (Cafe, Restaurant, Disco, Bar, Live Music)
- **venues** - Physical locations for events
- **events** - Upcoming events with dates, times, and pricing
- **offers** - Special deals and discounts
- **users** - User accounts
- **event_attendees** - Many-to-many relationship for event RSVPs

### Sample Data
- **5 Categories**: Cafe, Restaurant, Disco, Bar, Live Music
- **3 Events**: 
  - Tamer Ashour: Feen Concert (Jan 10, 2025)
  - Amr Diab: The Tribe Event (Jan 17, 2025)
  - 80s Retro Disco Night (Jan 25, 2025)
- **4 Offers**: 10%, 25%, 5%, 30% OFF deals

## 🔧 Environment Variables

### Backend (.env)
```env
PORT=3000
NODE_ENV=development

# PostgreSQL Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=sawa_app
DB_USER=postgres
DB_PASSWORD=your_password_here
```

## 📡 API Endpoints

| Method | Endpoint | Description | Status |
|--------|----------|-------------|--------|
| GET | `/health` | Health check + DB status | ✅ Working |
| GET | `/api/categories` | Get all categories | ✅ Working |
| POST | `/api/categories` | Add new category | ✅ Working |
| GET | `/api/events` | Get upcoming events | ✅ Working |
| POST | `/api/events` | Add new event | ✅ Working |
| GET | `/api/offers` | Get active offers | ✅ Working |
| POST | `/api/offers` | Add new offer | ✅ Working |
| GET | `/api/users` | Get active users | ✅ Working |

## 🛠️ Available Scripts

### Backend
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run test:db      # Test database connection
npm run add:sample   # Add sample data to database
npm run rename:db    # Rename database (if needed)
```

### Frontend
```bash
npm start            # Start Expo development server
npm run android      # Run on Android
npm run ios          # Run on iOS
npm run web          # Run on web browser
npm run lint         # Run ESLint
```

## 📚 Documentation

- [Setup Instructions](backend/database/SETUP_INSTRUCTIONS.md) - Detailed setup guide
- [pgAdmin Guide](backend/database/PGADMIN_GUIDE.md) - Visual database setup
- [Network Setup](docs/NETWORK_SETUP.md) - Network troubleshooting
- [API Testing](backend/TEST_API.md) - How to test API endpoints
- [Database Viewing](HOW_TO_VIEW_DATABASE.md) - How to view and add data

## 🧪 Testing

### Test Database Connection
```bash
cd backend
npm run test:db
```

### Test API Endpoints
```bash
# Health check
curl http://localhost:3000/health

# Get categories
curl http://localhost:3000/api/categories

# Get events
curl http://localhost:3000/api/events

# Get offers
curl http://localhost:3000/api/offers
```

### Interactive Testing
Open `backend/test-api.html` in your browser for an interactive API testing interface.

## 🎨 Tech Stack

### Frontend
- React Native
- Expo
- TypeScript
- NativeWind (Tailwind CSS for React Native)
- React Navigation

### Backend
- Node.js
- Express.js
- TypeScript
- PostgreSQL
- pg (node-postgres)

### Database
- PostgreSQL 18.1
- pgAdmin 4

## 📱 Features

- ✅ Browse events by category
- ✅ View upcoming events with details
- ✅ Discover exclusive offers and deals
- ✅ See where people are going ("Where is Everyone")
- ✅ Real-time backend connection
- 🔄 User authentication (coming soon)
- 🔄 Event booking/RSVP (coming soon)
- 🔄 User profiles (coming soon)

## 🔍 Troubleshooting

### Backend won't start
- Check if port 3000 is in use: `lsof -i :3000`
- Verify PostgreSQL is running
- Check database credentials in `.env`

### Frontend can't connect
- Make sure backend is running
- Check both devices are on same WiFi
- Verify IP address in `frontend/services/config.ts`
- See [Network Setup Guide](docs/NETWORK_SETUP.md)

### Database connection error
- Verify PostgreSQL is running
- Check database `sawa_app` exists
- Verify password in `backend/.env`
- Run `npm run test:db` to diagnose

## 🚀 Next Steps

1. ✅ Database setup - DONE
2. ✅ Backend API - DONE
3. ✅ Frontend connection - DONE
4. 📝 Replace frontend mock data with API calls
5. 📝 Add user authentication
6. 📝 Implement event booking
7. 📝 Add image upload
8. 📝 Deploy to production

## 📄 License

Private project - All rights reserved

## 👥 Contributors

- Sourabh - Full Stack Developer

---

**Sawa App** - Discover the nightlife! 🎉
