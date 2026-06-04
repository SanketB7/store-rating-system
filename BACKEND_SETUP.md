# Backend Setup and Startup Guide

## Prerequisites

Before starting, make sure you have:
- Node.js v16 or higher
- PostgreSQL v12 or higher
- npm or yarn package manager

## Installation Steps

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the backend directory with the following variables:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_postgres_password
DB_NAME=store_rating_db
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRATION=24h
NODE_ENV=development
APP_PORT=3001
```

### 3. Create PostgreSQL Database
```sql
-- Run this in PostgreSQL
CREATE DATABASE store_rating_db;
```

### 4. Start the Backend Server
Development mode:
```bash
npm run start:dev
```

Or production mode:
```bash
npm run build
npm run start:prod
```

The server will start on `http://localhost:3001`

## Database Initialization

The backend uses TypeORM with `synchronize: true`, which automatically:
- Creates tables for User, Store, and Rating entities
- Sets up relationships between tables
- Creates necessary indexes

No manual migration needed! The database schema is created automatically on startup.

## Initial Test Data

To test the application, create test users through the API:

### Create Admin User
```bash
POST http://localhost:3001/auth/register
Content-Type: application/json

{
  "name": "System Administrator Example Name",
  "email": "admin@example.com",
  "password": "Admin@123",
  "address": "123 Admin Street, Admin City, AC 12345"
}
```

### Create Normal User
```bash
POST http://localhost:3001/auth/register
Content-Type: application/json

{
  "name": "Normal User Example Name",
  "email": "user@example.com",
  "password": "User@123",
  "address": "456 User Avenue, User City, UC 67890"
}
```

Then update their roles in the database if needed, or use admin panel to create users with specific roles.

## Available Scripts

- `npm run start:dev` - Start development server with hot reload
- `npm run start:prod` - Start production server
- `npm run build` - Build the project
- `npm run lint` - Run linter
- `npm test` - Run tests

## Troubleshooting

### Database Connection Refused
- Check if PostgreSQL is running: `psql -U postgres`
- Verify database credentials in `.env`
- Make sure port 5432 is not blocked

### Port Already in Use
- Change `APP_PORT` in `.env` if port 3001 is taken
- Or kill the process using the port: `lsof -i :3001` (macOS/Linux)

### TypeORM Errors
- Delete node_modules and reinstall: `rm -rf node_modules && npm install`
- Check your .env file for typos

## API Documentation

Once the server is running, you can test endpoints using:
- Postman
- Thunder Client
- curl commands
- Frontend application (http://localhost:3000)

Base URL: `http://localhost:3001`

## Next Steps

1. Start the frontend development server (see FRONTEND_SETUP.md)
2. Access the application at http://localhost:3000
3. Register or login with test credentials
4. Test all features based on your user role

