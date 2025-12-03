# Network Setup Guide

## Current Configuration

Your backend is configured to be accessible from:
- **Local (same computer)**: http://localhost:3000
- **Network (other devices)**: http://192.168.1.10:3000

## Frontend Configuration

The frontend automatically uses the correct URL based on the platform:
- **Web**: Uses `localhost:3000`
- **iOS/Android**: Uses `192.168.1.10:3000`

## Troubleshooting

### "Network request failed" Error

If you see this error in the frontend, check:

1. **Backend is running**
   ```bash
   cd backend
   npm run dev
   ```
   You should see:
   ```
   🚀 Server is running on:
      - Local:   http://localhost:3000
      - Network: http://192.168.1.10:3000
   ```

2. **Test backend from terminal**
   ```bash
   curl http://192.168.1.10:3000/health
   ```
   Should return: `{"status":"OK","message":"Server is running",...}`

3. **Both devices on same WiFi**
   - Your computer and phone/emulator must be on the same WiFi network
   - Corporate/public WiFi may block device-to-device communication

4. **Firewall settings**
   - macOS: System Preferences → Security & Privacy → Firewall
   - Make sure Node.js is allowed to accept incoming connections

5. **IP address changed**
   - If your computer's IP changed, update `frontend/services/config.ts`
   - Find your IP: `ifconfig | grep "inet " | grep -v 127.0.0.1`

### Testing on Different Platforms

**Web Browser:**
```bash
cd frontend
npm start
# Press 'w' for web
```
Open http://localhost:8081 in your browser

**iOS Simulator:**
```bash
cd frontend
npm start
# Press 'i' for iOS
```

**Android Emulator:**
```bash
cd frontend
npm start
# Press 'a' for Android
```

**Physical Device:**
1. Install Expo Go app on your phone
2. Make sure phone is on same WiFi as computer
3. Scan QR code from terminal
4. Backend should connect automatically

## Updating IP Address

If your computer's IP address changes:

1. Find new IP:
   ```bash
   ifconfig | grep "inet " | grep -v 127.0.0.1
   ```

2. Update `frontend/services/config.ts`:
   ```typescript
   const LOCAL_IP = 'YOUR_NEW_IP_HERE';
   ```

3. Restart frontend:
   ```bash
   # Press 'r' in Expo terminal to reload
   ```
