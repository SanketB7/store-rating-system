# Frontend Setup and Startup Guide

## Prerequisites

Before starting, make sure you have:
- Node.js v16 or higher
- npm or yarn package manager
- Backend server running on `http://localhost:3001`

## Installation Steps

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Configure Environment Variables (Optional)
Create a `.env` file in the frontend directory if you need custom settings:

```env
REACT_APP_API_URL=http://localhost:3001
```

By default, the API URL is set to `http://localhost:3001` in the api.js file.

### 3. Start the Frontend Development Server
```bash
npm start
```

The application will automatically open at `http://localhost:3000`

## Project Structure

```
frontend/
├── public/
│   └── index.html          # Main HTML file
├── src/
│   ├── pages/              # Page components
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── AdminDashboard.jsx
│   │   ├── UserDashboard.jsx
│   │   └── StoreOwnerDashboard.jsx
│   ├── components/         # Reusable components
│   │   └── ProtectedRoute.jsx
│   ├── context/            # React Context
│   │   └── AuthContext.jsx
│   ├── api/                # API client
│   │   └── api.js
│   ├── styles/             # CSS files
│   │   ├── Auth.css
│   │   └── Dashboard.css
│   ├── App.jsx             # Main app component
│   ├── index.jsx           # Entry point
│   └── index.css           # Global styles
└── package.json
```

## User Workflows

### 1. Registration
- Navigate to http://localhost:3000/register
- Fill in the form with valid credentials
- Password must contain: uppercase letter + special character, 8-16 chars
- Click Register

### 2. Login
- Navigate to http://localhost:3000/login or click "Login here"
- Enter email and password
- You'll be redirected to your role-specific dashboard

### 3. Admin Dashboard
- Access: http://localhost:3000/admin-dashboard (requires ADMIN role)
- Create new users or stores
- View all users and stores with filtering/sorting
- View dashboard statistics

### 4. User Dashboard
- Access: http://localhost:3000/user-dashboard (requires NORMAL_USER role)
- View all available stores
- Search stores by name or address
- Submit or modify ratings (1-5)
- View store ratings and your personal rating

### 5. Store Owner Dashboard
- Access: http://localhost:3000/store-owner-dashboard (requires STORE_OWNER role)
- View your store's average rating
- See all users who rated your store
- Update password

## Testing the Application

### Test Scenario 1: Complete User Journey

1. **Register as Normal User**
   - Go to /register
   - Create account with name (20+ chars), email, address, password

2. **Login**
   - Use your credentials to login
   - Navigate to User Dashboard

3. **Rate Stores**
   - Admin first needs to add stores (see scenario 2)
   - Submit ratings for available stores
   - Modify your ratings

### Test Scenario 2: Admin Setup

1. **Create Admin Account** (if needed)
   - Register an account
   - Contact database admin to set role to ADMIN

2. **Access Admin Dashboard**
   - Login as admin
   - Go to Users tab: Add normal users and store owners
   - Go to Stores tab: Add stores to the system
   - View Dashboard: Check statistics

### Test Scenario 3: Store Owner

1. **Create Store Owner Account**
   - Use admin panel to create user with STORE_OWNER role

2. **Access Store Owner Dashboard**
   - Login as store owner
   - View ratings submitted by users
   - See average rating

## Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App (not recommended)

## Features Implemented

### ✅ Authentication
- [x] User registration with validation
- [x] User login
- [x] JWT token management
- [x] Password update
- [x] Auto-logout on token expiration

### ✅ Authorization
- [x] Role-based route protection
- [x] Admin-only features
- [x] User-specific dashboards

### ✅ User Management
- [x] User registration
- [x] View user list (admin)
- [x] Filter users by name, email, address, role
- [x] Sort user lists

### ✅ Store Management
- [x] Create stores (admin)
- [x] View store list
- [x] Filter stores
- [x] Sort stores
- [x] Display average rating

### ✅ Rating System
- [x] Submit ratings (1-5)
- [x] View own ratings
- [x] Update ratings
- [x] View store average ratings
- [x] View user ratings by store

### ✅ UI/UX
- [x] Responsive design
- [x] Clean navigation
- [x] Form validation
- [x] Error messages
- [x] Loading states

## Troubleshooting

### Cannot connect to backend
1. Check if backend is running on port 3001
2. Verify CORS is configured correctly
3. Check browser console for error messages

### Login not working
1. Verify you created an account first
2. Check email and password are correct
3. Ensure backend is accessible

### Page keeps redirecting to login
1. Check your user role matches the page requirement
2. Clear browser localStorage
3. Login again

### Styles not loading
1. Check internet connection
2. Clear browser cache (Ctrl+Shift+Delete)
3. Restart development server

## Production Build

To create an optimized production build:
```bash
npm run build
```

This creates a `build/` folder with optimized files ready for deployment.

## Deployment

### Deploy to Vercel (Recommended)
```bash
npm i -g vercel
vercel
```

### Deploy to Netlify
```bash
npm run build
# Connect to Netlify and drop the build folder
```

Make sure to set `REACT_APP_API_URL` to your production backend URL in the deployment platform.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Tips

1. Use React DevTools for debugging
2. Monitor network requests in DevTools
3. Check Console for warnings and errors
4. Use Performance tab to check render times

## Next Steps

1. Ensure backend is running
2. Run `npm start` to start frontend
3. Create test accounts and test all features
4. Customize styling as needed
5. Deploy to production

