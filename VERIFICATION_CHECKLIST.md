# Setup Verification Checklist

## Pre-Setup Verification

- [ ] Node.js installed (v16+) - Run: `node --version`
- [ ] npm installed - Run: `npm --version`
- [ ] PostgreSQL installed - Run: `psql --version`
- [ ] Git installed (optional) - Run: `git --version`
- [ ] Text editor or VS Code installed

## Backend Setup Checklist

### Installation
- [ ] Navigate to backend folder: `cd backend`
- [ ] Run: `npm install` (completed without errors)
- [ ] All dependencies installed in node_modules folder

### Configuration
- [ ] Created `.env` file in backend directory
- [ ] Set `DB_HOST=localhost`
- [ ] Set `DB_PORT=5432`
- [ ] Set `DB_USERNAME=postgres`
- [ ] Set `DB_PASSWORD=your_password`
- [ ] Set `DB_NAME=store_rating_db`
- [ ] Set `JWT_SECRET=your_secret_key`
- [ ] Set `APP_PORT=3001`

### Database Setup
- [ ] PostgreSQL service is running
- [ ] Database `store_rating_db` created - Run: `psql -U postgres -c "CREATE DATABASE store_rating_db;"`
- [ ] Can connect to database - Run: `psql -U postgres -d store_rating_db -c "\dt"`

### Backend Server
- [ ] Run: `npm run start:dev`
- [ ] Server starts without errors
- [ ] Console shows: "Application is running on: http://localhost:3001"
- [ ] Keep this terminal open

## Frontend Setup Checklist

### Installation
- [ ] Open NEW terminal window (keep backend terminal open)
- [ ] Navigate to frontend folder: `cd frontend`
- [ ] Run: `npm install` (completed without errors)
- [ ] All dependencies installed in node_modules folder

### Configuration
- [ ] (Optional) Create `.env` file with: `REACT_APP_API_URL=http://localhost:3001`

### Frontend Server
- [ ] Run: `npm start`
- [ ] Browser opens automatically to http://localhost:3000
- [ ] Login page displays with "Store Rating System - Login" heading
- [ ] No console errors in browser (F12 → Console tab)

## Application Functionality Checklist

### Authentication
- [ ] Can register new account
  - [ ] Name validation (20+ chars required)
  - [ ] Email validation
  - [ ] Password validation (uppercase + special char)
  - [ ] Address validation
- [ ] Can login with registered account
- [ ] JWT token stored in localStorage
- [ ] Token sent in API requests

### User Dashboard (NORMAL_USER)
- [ ] Login redirects to user dashboard
- [ ] Can see stores list (if admin created stores)
- [ ] Can search stores by name/address
- [ ] Can sort stores
- [ ] Can submit rating for store
- [ ] Can view personal rating for store
- [ ] Can modify rating
- [ ] Can see average store rating
- [ ] Can update password
- [ ] Can logout

### Admin Dashboard (ADMIN)
- [ ] Create admin account (via database or during setup)
- [ ] Login as admin
- [ ] Dashboard tab shows:
  - [ ] Total users count
  - [ ] Total stores count
  - [ ] Total ratings count
- [ ] Users tab:
  - [ ] Can add new user
  - [ ] Can see all users
  - [ ] Can filter by name/email/address/role
  - [ ] Can sort users
- [ ] Stores tab:
  - [ ] Can add new store
  - [ ] Can see all stores
  - [ ] Can view store ratings

### Store Owner Dashboard (STORE_OWNER)
- [ ] Create store owner account (admin only)
- [ ] Login as store owner
- [ ] Can see average rating of store
- [ ] Can see users who rated store
- [ ] Can update password
- [ ] Can logout

### Data Validation
- [ ] Form validation works on registration
- [ ] Form validation works on user creation
- [ ] Form validation works on store creation
- [ ] Rating must be 1-5
- [ ] Password must meet requirements
- [ ] Email format validation

### Navigation & Routing
- [ ] Can navigate between pages
- [ ] Cannot access other roles' pages without credentials
- [ ] Logout clears token and redirects to login
- [ ] Refresh page maintains session if logged in

## API Testing Checklist

### Test with Postman (Optional)

- [ ] Backend running on port 3001
- [ ] Can POST to `/auth/register` with valid data
- [ ] Can POST to `/auth/login` with valid credentials
- [ ] JWT token returned from login
- [ ] Can GET `/stores` without authentication
- [ ] Protected endpoints return 401 without token
- [ ] Protected endpoints work with valid token

## Performance & Quality Checklist

### Backend
- [ ] No console errors in backend terminal
- [ ] API responds quickly (< 1 second)
- [ ] Database queries are efficient
- [ ] No memory leaks visible

### Frontend
- [ ] No console errors (F12 → Console)
- [ ] No React warnings
- [ ] Pages load quickly (< 2 seconds)
- [ ] Images load properly
- [ ] Responsive on mobile browser (F12 → Toggle device toolbar)

### Network
- [ ] API calls are visible in Network tab (F12)
- [ ] All requests return proper status codes
- [ ] No 404 or 500 errors
- [ ] CORS headers present in responses

## Security Checklist

- [ ] Passwords are hashed (not readable in database)
- [ ] JWT token used for authentication
- [ ] Token expires after 24 hours
- [ ] Can't access admin pages as normal user
- [ ] Can't access user dashboards without login
- [ ] Password requirements enforced
- [ ] Session persists after page refresh
- [ ] Logout clears token

## Troubleshooting

If any checklist item fails:

1. **Backend won't start**
   ```bash
   npm install
   npm run start:dev
   ```

2. **Database connection error**
   - Check PostgreSQL is running
   - Verify credentials in .env
   - Check database exists: `psql -U postgres -d store_rating_db -c "\dt"`

3. **Frontend won't start**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   npm start
   ```

4. **Can't login**
   - Verify backend is running
   - Check if account exists
   - Clear browser cache
   - Check browser console for errors

5. **API errors**
   - Check backend console for error messages
   - Verify backend is running on port 3001
   - Check browser Network tab for response details
   - Verify .env configuration

## Final Verification

- [ ] All checkpoints above completed
- [ ] No errors in console
- [ ] Can perform all user operations
- [ ] Can login as all three roles
- [ ] All pages display correctly
- [ ] Responsive on mobile/tablet
- [ ] Database schema created
- [ ] All validations working

## Ready for Use ✅

If all checkboxes are checked, your Store Rating System is ready to use!

### Next Steps

1. **Create Test Data**
   - Create multiple users
   - Create multiple stores
   - Submit ratings
   - Test all features

2. **Customize (Optional)**
   - Change styling in CSS files
   - Add company branding
   - Customize form fields
   - Add additional features

3. **Deploy (Optional)**
   - Deploy backend to cloud
   - Deploy frontend to Vercel/Netlify
   - Set up custom domain
   - Configure production database

---

**Verification Status**: [ ] COMPLETE - Ready for deployment

**Date Verified**: _________________

**Verified By**: _________________

---

## Support Resources

- [README.md](README.md) - Project overview
- [INSTALLATION_GUIDE.md](INSTALLATION_GUIDE.md) - Detailed setup
- [API_DOCUMENTATION.md](API_DOCUMENTATION.md) - API reference
- [DEVELOPER_GUIDE.md](DEVELOPER_GUIDE.md) - Developer tips
- [BACKEND_SETUP.md](BACKEND_SETUP.md) - Backend details
- [FRONTEND_SETUP.md](FRONTEND_SETUP.md) - Frontend details

For issues not listed in troubleshooting, check the documentation files above.
