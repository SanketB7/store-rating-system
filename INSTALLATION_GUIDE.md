# Complete Installation & Setup Guide

## Store Rating System - Step by Step Setup

This guide will walk you through the complete setup process for the Store Rating System application.

## System Requirements

- **Operating System**: Windows, macOS, or Linux
- **Node.js**: v16.x or higher ([Download](https://nodejs.org/))
- **npm**: Comes with Node.js
- **PostgreSQL**: v12 or higher ([Download](https://www.postgresql.org/download/))
- **Text Editor**: VS Code or any code editor

## Step 1: Verify Prerequisites

### Check Node.js and npm
```bash
node --version
npm --version
```

Both should display version numbers. If not, install Node.js from https://nodejs.org/

### Check PostgreSQL
```bash
psql --version
```

If not found, install PostgreSQL from https://www.postgresql.org/download/

## Step 2: Clone/Setup Project Files

1. Navigate to your project folder:
```bash
cd "c:\Users\sbhan\OneDrive\Desktop\internship challenge"
```

2. Verify the directory structure:
```
backend/
frontend/
README.md
BACKEND_SETUP.md
FRONTEND_SETUP.md
```

## Step 3: Setup PostgreSQL Database

### On Windows:

1. Open Command Prompt or PowerShell
2. Connect to PostgreSQL:
```bash
psql -U postgres
```

3. Enter your PostgreSQL password when prompted

4. Create the database:
```sql
CREATE DATABASE store_rating_db;
\q
```

### On macOS/Linux:

```bash
sudo -i -u postgres
psql
```

Then run:
```sql
CREATE DATABASE store_rating_db;
\q
exit
```

## Step 4: Backend Setup

### 4.1 Navigate to Backend Directory
```bash
cd backend
```

### 4.2 Install Dependencies
```bash
npm install
```

This will download all required packages (takes 2-5 minutes).

### 4.3 Create Environment File
Create a file named `.env` in the backend directory with this content:

```
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_postgres_password
DB_NAME=store_rating_db
JWT_SECRET=my_super_secret_jwt_key_12345
JWT_EXPIRATION=24h
NODE_ENV=development
APP_PORT=3001
```

Replace `your_postgres_password` with the password you set during PostgreSQL installation.

### 4.4 Start Backend Server
```bash
npm run start:dev
```

You should see output like:
```
[Nest] 1234  - 01/01/2024, 12:00:00 PM     LOG [NestFactory] Starting Nest application...
[Nest] 1234  - 01/01/2024, 12:00:00 PM     LOG [InstanceLoader] TypeOrmModule dependencies initialized
Application is running on: http://localhost:3001
```

✅ **Backend is running!** Keep this terminal open.

## Step 5: Frontend Setup

### 5.1 Open New Terminal/Command Prompt

Do NOT close the backend terminal. Open a new terminal window.

### 5.2 Navigate to Frontend Directory
```bash
cd frontend
```

### 5.3 Install Dependencies
```bash
npm install
```

### 5.4 Start Frontend Development Server
```bash
npm start
```

The browser should automatically open to `http://localhost:3000`

You should see:
- Login page with "Store Rating System - Login" heading
- Register link

✅ **Frontend is running!**

## Step 6: Create Initial Test Accounts

### 6.1 Register as Normal User

1. Click "Register here" on the login page
2. Fill in the form:
   - **Name**: (must be 20+ characters) "Normal User Example Name"
   - **Email**: user@example.com
   - **Address**: "123 Main Street, Your City, ST 12345"
   - **Password**: User@123 (must have uppercase + special char)
   - **Confirm Password**: User@123

3. Click "Register"
4. You'll be redirected to login page

### 6.2 Create Admin User (Via Database)

1. Open PostgreSQL prompt:
```bash
psql -U postgres -d store_rating_db
```

2. Create admin user:
```sql
INSERT INTO users (id, name, email, address, password, role, "createdAt", "updatedAt")
VALUES (
  'admin-id-123',
  'System Administrator Example Name',
  'admin@example.com',
  '$2a$10$NXJ1VHu5wNLWMF7qZxfWoezz8U.Bw8b0qZq.wNJFqxJ3nZJk8ZMtK',
  'ADMIN',
  NOW(),
  NOW()
);
```

Note: The password is a bcrypt hash for "Admin@123"

3. Exit PostgreSQL:
```sql
\q
```

## Step 7: Test the Application

### 7.1 Login as Normal User

1. Go to http://localhost:3000
2. Login with:
   - **Email**: user@example.com
   - **Password**: User@123

3. You should see the User Dashboard with:
   - Search stores
   - List of stores (empty initially)
   - Ability to rate stores

### 7.2 Login as Admin (Optional)

1. Return to login page
2. Login with:
   - **Email**: admin@example.com
   - **Password**: Admin@123

3. You should see Admin Dashboard with:
   - Dashboard tab (statistics)
   - Users tab (add users)
   - Stores tab (add stores)

## Step 8: Create Stores (Admin Only)

### 8.1 Login as Admin

Follow Step 7.2 above.

### 8.2 Click Stores Tab

### 8.3 Add a Store

Fill in the form:
- **Store Name**: (20+ chars) "Amazing Coffee Shop Store"
- **Store Email**: coffee@example.com
- **Address**: "456 Coffee Lane, Coffee City, CC 67890"

Click "Add Store"

### 8.4 Repeat to Add More Stores

Add at least 2-3 stores for testing.

## Step 9: Test Rating System

### 9.1 Logout and Login as Normal User

### 9.2 Go to User Dashboard

You should now see the stores you created.

### 9.3 Submit a Rating

1. Click "Submit Rating" on any store
2. Select a rating (1-5)
3. The rating should be submitted

### 9.4 Modify Rating

1. Click "Modify Rating" on a store you rated
2. Select a new rating
3. The rating should update

## Step 10: Test Other Features

### Admin Dashboard
- Create new users with different roles
- View user statistics
- View list of all stores with ratings

### Store Owner Dashboard
- If you created a store owner account, login as them
- View ratings on their store
- See average rating

### User Dashboard
- Search stores by name or address
- Sort by name or address
- Submit and modify ratings

## Troubleshooting

### Backend Won't Start

**Error: "Cannot find module"**
```bash
# In backend directory
npm install
```

**Error: "Database connection refused"**
- Verify PostgreSQL is running
- Check database credentials in .env
- Ensure database was created

**Error: Port 3001 already in use**
- Change `APP_PORT` in .env to 3002
- Or kill the process using port 3001

### Frontend Won't Start

**Error: "npm ERR!"**
```bash
# In frontend directory
rm -rf node_modules package-lock.json
npm install
npm start
```

**Cannot connect to API**
- Verify backend is running on port 3001
- Check browser console for errors
- Verify firewall isn't blocking port 3001

### Cannot Login

**Error: "Invalid email or password"**
- Verify email is correct
- Check spelling of password
- Ensure account was created successfully

**Stuck on loading**
- Check browser console for errors
- Verify backend is running
- Refresh page

## File Structure Overview

```
internship challenge/
├── backend/
│   ├── src/
│   │   ├── entities/          # Database models
│   │   ├── modules/           # API features
│   │   │   ├── auth/          # Authentication
│   │   │   ├── users/         # User management
│   │   │   ├── stores/        # Store management
│   │   │   └── ratings/       # Rating system
│   │   ├── dtos/              # Data validation
│   │   ├── main.ts            # Server entry point
│   │   └── app.module.ts      # Main module
│   ├── .env                   # Configuration
│   └── package.json           # Dependencies
│
├── frontend/
│   ├── src/
│   │   ├── pages/             # Page components
│   │   ├── components/        # UI components
│   │   ├── context/           # Auth context
│   │   ├── api/               # API client
│   │   ├── styles/            # CSS styles
│   │   └── App.jsx            # Main component
│   ├── public/
│   │   └── index.html         # HTML file
│   └── package.json           # Dependencies
│
└── Documentation Files
    ├── README.md
    ├── INSTALLATION_GUIDE.md  # This file
    ├── BACKEND_SETUP.md
    └── FRONTEND_SETUP.md
```

## API Endpoints Summary

### Authentication (No auth required)
- `POST /auth/register` - Create account
- `POST /auth/login` - Login

### Users (Requires authentication)
- `GET /users` - List users (admin)
- `POST /users` - Create user (admin)
- `GET /users/:id` - Get user details
- `GET /users/dashboard/stats` - Dashboard stats (admin)

### Stores (No auth required for GET)
- `GET /stores` - List stores
- `POST /stores` - Create store (admin)
- `GET /stores/:id` - Get store details

### Ratings (Requires authentication)
- `POST /ratings` - Submit rating
- `PATCH /ratings/:storeId` - Update rating
- `GET /ratings/store/:storeId` - Get store ratings
- `GET /ratings/my-rating/:storeId` - Get your rating

## Best Practices Followed

✅ **Security**
- Passwords hashed with bcryptjs
- JWT authentication
- Input validation
- CORS protection

✅ **Database**
- Proper relationships
- Unique constraints
- Foreign keys
- Data integrity

✅ **Code Quality**
- Modular architecture
- Separation of concerns
- Error handling
- Clean code structure

✅ **User Experience**
- Responsive design
- Form validation
- Clear error messages
- Intuitive navigation

## Performance Tips

1. Keep browser DevTools console open to watch for errors
2. Clear browser cache if styles don't update
3. Restart development servers if code changes aren't reflected
4. Use Chrome for best compatibility

## Next Steps

1. **Customize**: Modify styles and branding
2. **Deploy**: Push to GitHub and deploy to hosting
3. **Extend**: Add more features (reviews, photos, etc.)
4. **Optimize**: Add caching, pagination, search optimization

## Support & Help

If you encounter issues:

1. Check the troubleshooting section above
2. Review the error message carefully
3. Check browser console (F12)
4. Review backend console output
5. Verify all prerequisites are installed

## Getting Help

- **Backend Issues**: Check `backend/src/main.ts` logs
- **Frontend Issues**: Check browser console (F12)
- **Database Issues**: Check PostgreSQL connection in .env
- **API Issues**: Test with Postman at http://localhost:3001

---

**Congratulations!** Your Store Rating System is now ready to use! 🎉

For detailed documentation, see:
- [README.md](README.md) - Project overview
- [BACKEND_SETUP.md](BACKEND_SETUP.md) - Backend details
- [FRONTEND_SETUP.md](FRONTEND_SETUP.md) - Frontend details
