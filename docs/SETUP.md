# Setup Guide

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI (for mobile development)

## Step-by-Step Setup

### 1. Backend Setup

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Start the development server
npm run dev
```

You should see:
```
🚀 Server is running on http://localhost:3000
📊 Environment: development
```

### 2. Frontend Setup

```bash
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Start Expo development server
npm start
```

Then:
- Press `a` for Android emulator
- Press `i` for iOS simulator
- Press `w` for web browser

### 3. Verify Connection

1. **Backend Health Check**:
   Open http://localhost:3000/health in your browser
   
   You should see:
   ```json
   {
     "status": "OK",
     "message": "Server is running",
     "timestamp": "2024-..."
   }
   ```

2. **Frontend Connection**:
   In the app, you should see "Backend: ✅ Connected" at the top

## Current Architecture

```
┌─────────────────┐
│   Frontend      │
│  (React Native) │
│                 │
│  Mock Data:     │
│  - Categories   │
│  - Events       │
│  - Offers       │
│  - Users        │
└────────┬────────┘
         │
         │ HTTP Requests
         │ (Ready but not used yet)
         │
┌────────▼────────┐
│   Backend       │
│  (Express API)  │
│                 │
│  Endpoints:     │
│  /api/categories│
│  /api/events    │
│  /api/offers    │
│  /api/users     │
└─────────────────┘
```

## Next Steps (When Ready to Use Real Data)

### 1. Choose a Database
- PostgreSQL
- MongoDB
- MySQL
- SQLite

### 2. Install Database Driver
```bash
cd backend
npm install pg  # for PostgreSQL
# or
npm install mongodb  # for MongoDB
```

### 3. Create Database Configuration
Add connection config in `backend/src/config/database.ts`

### 4. Create Models
Add TypeScript models in `backend/src/models/` for type safety

### 5. Create Routes
Add route handlers in `backend/src/routes/` for CRUD operations

### 6. Update API Endpoints
Replace the placeholder responses in `backend/src/index.ts` with real database queries

### 7. Update Frontend
Replace mock data in `frontend/app/index.tsx` with API calls using `frontend/services/api.ts`

## Troubleshooting

### Backend won't start
- Check if port 3000 is already in use
- Verify Node.js is installed: `node --version`
- Check for errors in the terminal

### Frontend can't connect to backend
- Make sure backend is running on http://localhost:3000
- Check if you're using an emulator/simulator (localhost should work)
- For physical device, update API_BASE_URL in `frontend/services/api.ts` to your computer's IP address
