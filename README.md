# Store Rating System - Full Stack Application

A complete web application for rating stores with role-based access control. Users can register, log in, and rate stores. System administrators can manage users and stores. Store owners can view ratings for their stores.

## Tech Stack

- **Backend**: NestJS + TypeScript
- **Frontend**: React + React Router
- **Database**: PostgreSQL
- **Authentication**: JWT (JSON Web Tokens)

## Project Structure

```
project/
├── backend/          # NestJS backend API
│   ├── src/
│   │   ├── entities/        # TypeORM entities
│   │   ├── modules/         # Feature modules
│   │   │   ├── auth/        # Authentication module
│   │   │   ├── users/       # User management
│   │   │   ├── stores/      # Store management
│   │   │   └── ratings/     # Rating system
│   │   ├── dtos/            # Data Transfer Objects
│   │   ├── common/          # Common utilities and enums
│   │   └── main.ts          # Application entry point
│   └── package.json
│
└── frontend/         # React frontend
    ├── src/
    │   ├── pages/           # Page components
    │   ├── components/      # Reusable components
    │   ├── context/         # Auth context
    │   ├── api/             # API client configuration
    │   ├── styles/          # CSS styles
    │   ├── App.jsx          # Main app component
    │   └── index.jsx        # Entry point
    └── package.json
```

## Features Implemented

### Authentication & Authorization
- User registration with validation (name, email, password, address)
- User login with JWT authentication
- Password update functionality
- Role-based access control (Admin, Normal User, Store Owner)

### System Administrator
- Dashboard with statistics (total users, stores, ratings)
- Add new users and stores
- View all users and stores with filtering/sorting
- View user details including ratings for store owners

### Normal User
- View all registered stores
- Search stores by name and address
- Submit ratings (1-5) for stores
- Modify existing ratings
- View overall and personal ratings for stores

### Store Owner
- View dashboard with store ratings
- See average rating of their store
- View list of users who rated their store
- Update password

### Data Validation
- Name: 20-60 characters
- Email: Standard email validation
- Address: Max 400 characters
- Password: 8-16 characters, at least one uppercase letter and special character
- Ratings: 1-5 range

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Update `.env` with your PostgreSQL configuration:
```
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_NAME=store_rating_db
JWT_SECRET=your_secret_key
JWT_EXPIRATION=24h
APP_PORT=3001
```

5. Create the PostgreSQL database:
```sql
CREATE DATABASE store_rating_db;
```

6. Start the backend:
```bash
npm run start:dev
```

The backend API will be available at `http://localhost:3001`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the frontend development server:
```bash
npm start
```

The frontend will be available at `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - User login
- `POST /auth/update-password` - Update password (protected)

### Users
- `POST /users` - Create user (admin only)
- `GET /users` - Get all users with filtering and sorting
- `GET /users/:id` - Get user details
- `GET /users/dashboard/stats` - Get dashboard statistics (admin only)

### Stores
- `POST /stores` - Create store (admin only)
- `GET /stores` - Get all stores with filtering and sorting
- `GET /stores/:id` - Get store details

### Ratings
- `POST /ratings` - Submit rating (authenticated)
- `PATCH /ratings/:storeId` - Update rating (authenticated)
- `GET /ratings/store/:storeId` - Get store ratings
- `GET /ratings/user/:userId` - Get user ratings (authenticated)
- `GET /ratings/my-rating/:storeId` - Get personal rating for store (authenticated)

## Test Credentials

### Admin Account
- Email: admin@example.com
- Password: Admin@123

### Normal User Account
- Email: user@example.com
- Password: User@123

### Store Owner Account
- Email: owner@example.com
- Password: Owner@123

Note: These are example credentials. You need to register or create them through the admin panel.

## Building for Production

### Backend
```bash
cd backend
npm run build
npm run start:prod
```

### Frontend
```bash
cd frontend
npm run build
```

## Database Schema

The application uses three main entities:

### Users Table
- id (UUID, Primary Key)
- name (varchar, 60 chars max)
- email (varchar, unique)
- address (varchar, 400 chars max)
- password (varchar, hashed)
- role (enum: ADMIN, NORMAL_USER, STORE_OWNER)
- createdAt, updatedAt

### Stores Table
- id (UUID, Primary Key)
- name (varchar, 60 chars max)
- email (varchar, unique)
- address (varchar, 400 chars max)
- createdAt, updatedAt

### Ratings Table
- id (UUID, Primary Key)
- rating (integer, 1-5)
- userId (Foreign Key to Users)
- storeId (Foreign Key to Stores)
- createdAt, updatedAt
- Unique constraint on (userId, storeId)

## Best Practices Implemented

1. **Code Organization**: Modular architecture with clear separation of concerns
2. **Security**: 
   - Password hashing using bcryptjs
   - JWT-based authentication
   - Input validation using class-validator
   - CORS configuration
3. **Database**: 
   - TypeORM for ORM
   - Proper relationships and constraints
   - Migrations support
4. **API Design**: RESTful endpoints with proper HTTP methods
5. **Error Handling**: Consistent error responses
6. **UI/UX**: Responsive design with role-based access

## Future Enhancements

- Email verification for user registration
- Two-factor authentication
- Advanced filtering and search
- Export data to CSV/Excel
- Rating analytics and charts
- Review/comment functionality
- Admin action logs
- User activity tracking

## Development Notes

- The backend automatically creates/syncs the database schema on startup
- JWT tokens expire after 24 hours
- CORS is configured to allow requests from `http://localhost:3000`
- All passwords are hashed using bcryptjs before storage

## Troubleshooting

### Database Connection Error
- Ensure PostgreSQL is running
- Verify database credentials in `.env`
- Check if the database exists

### Frontend Cannot Connect to Backend
- Ensure backend is running on port 3001
- Check CORS configuration in `src/main.ts`
- Verify `REACT_APP_API_URL` environment variable if needed

### JWT Token Issues
- Ensure `JWT_SECRET` is set in `.env`
- Check token expiration time
- Clear browser localStorage and re-login

## License

MIT

## Support

For issues and questions, please open an issue or contact the development team.
