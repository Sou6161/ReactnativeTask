# Quick Start Guide

## 🚀 Start the Backend

```bash
cd backend
npm run dev
```

You should see:
```
🚀 Server is running on:
   - Local:   http://localhost:3000
   - Network: http://192.168.1.10:3000
📊 Environment: development
```

## 📱 Start the Frontend

```bash
cd frontend
npm start
```

Then press:
- `w` for web browser
- `i` for iOS simulator
- `a` for Android emulator
- Scan QR code with Expo Go app on your phone

## ✅ Verify Connection

In the app, you should see at the top:
```
Backend: ✅ Connected
```

If you see "❌ Disconnected", see [Network Setup Guide](docs/NETWORK_SETUP.md)

## 📂 Project Structure

```
├── frontend/              # React Native app
│   ├── app/              # App screens
│   ├── services/         # API services
│   │   ├── api.ts       # API functions
│   │   └── config.ts    # API configuration
│   └── package.json
│
├── backend/              # Express API
│   ├── src/
│   │   └── index.ts     # Main server file
│   ├── .env             # Environment variables
│   └── package.json
│
└── docs/                 # Documentation
    ├── SETUP.md         # Detailed setup
    └── NETWORK_SETUP.md # Network troubleshooting
```

## 🎯 Current Features

- ✅ Backend REST API running
- ✅ Frontend connected to backend
- ✅ Mock data displayed in app
- ✅ Health check endpoint
- ✅ API endpoints ready for data

## 📝 Next Steps

When you're ready to add real data:

1. Choose a database (PostgreSQL, MongoDB, etc.)
2. Add database connection in `backend/src/config/`
3. Create models in `backend/src/models/`
4. Update API endpoints in `backend/src/index.ts`
5. Replace mock data in frontend with API calls

## 🔧 Troubleshooting

**Backend won't start:**
- Check if port 3000 is in use: `lsof -i :3000`
- Kill the process: `kill -9 <PID>`

**Frontend can't connect:**
- Make sure backend is running
- Check both devices are on same WiFi
- See [Network Setup Guide](docs/NETWORK_SETUP.md)

**App shows errors:**
- Clear cache: `cd frontend && npm start -- --clear`
- Reinstall: `rm -rf node_modules && npm install`
