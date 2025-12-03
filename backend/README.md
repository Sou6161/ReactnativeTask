# Events App Backend

## Setup

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

The server will start on http://localhost:3000

## API Endpoints

- `GET /health` - Health check
- `GET /api/categories` - Categories endpoint (ready for data)
- `GET /api/events` - Events endpoint (ready for data)
- `GET /api/offers` - Offers endpoint (ready for data)
- `GET /api/users` - Users endpoint (ready for data)

## Current Status

The backend is a simple REST API without database connection. The frontend uses mock data for now. When you're ready to add a database:

1. Choose your database (PostgreSQL, MongoDB, etc.)
2. Install the appropriate driver
3. Create database connection configuration
4. Create models and routes
5. Update the API endpoints to return real data
