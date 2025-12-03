# Events App

A full-stack React Native application with Express backend.

## Project Structure

```
├── frontend/          # React Native (Expo) app
├── backend/           # Express.js API server
└── docs/             # Documentation
```

## Quick Start

### 1. Setup Backend

```bash
cd backend
npm install
npm run dev
```

The backend will start on http://localhost:3000

### 2. Setup Frontend

```bash
cd frontend
npm install
npm start
```

Then press:
- `a` for Android
- `i` for iOS
- `w` for Web

## Current Status

✅ **Backend**: Running on http://localhost:3000 (local) and http://192.168.1.10:3000 (network)
✅ **Frontend**: Using mock data
✅ **Connection**: Backend and frontend are connected

### Testing the Connection

1. **Backend health check**: Open http://192.168.1.10:3000/health in your browser
2. **Frontend**: Look for "Backend: ✅ Connected" in the app

If you see "Backend: ❌ Disconnected", check the [Network Setup Guide](docs/NETWORK_SETUP.md)

The app currently uses mock data on the frontend. When you're ready to replace it with real data:

1. Add a database (PostgreSQL, MongoDB, etc.)
2. Create database connection in `backend/src/config/`
3. Create models in `backend/src/models/`
4. Update API endpoints in `backend/src/index.ts`
5. Update frontend to fetch from API instead of using mock data

## Environment Variables

### Backend (.env)
```
PORT=3000
NODE_ENV=development
```

## API Endpoints

- `GET /health` - Health check
- `GET /api/categories` - Categories (ready for data)
- `GET /api/events` - Events (ready for data)
- `GET /api/offers` - Offers (ready for data)
- `GET /api/users` - Users (ready for data)
