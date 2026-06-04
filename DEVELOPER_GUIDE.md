# Developer Quick Reference Guide

## Project Overview

Store Rating System is a full-stack web application built with:
- **Backend**: NestJS + TypeScript + TypeORM + PostgreSQL
- **Frontend**: React + React Router + Axios
- **Authentication**: JWT

## Quick Start Commands

```bash
# Backend Setup
cd backend
npm install
npm run start:dev

# Frontend Setup (new terminal)
cd frontend
npm install
npm start
```

## Project Structure

```
internship challenge/
├── backend/                      # NestJS API Server
│   ├── src/
│   │   ├── entities/             # Database models
│   │   │   ├── user.entity.ts
│   │   │   ├── store.entity.ts
│   │   │   └── rating.entity.ts
│   │   ├── modules/              # Feature modules
│   │   │   ├── auth/             # Authentication & JWT
│   │   │   ├── users/            # User CRUD & admin
│   │   │   ├── stores/           # Store CRUD
│   │   │   └── ratings/          # Rating submission
│   │   ├── dtos/                 # Request/Response objects
│   │   ├── common/               # Enums & utilities
│   │   ├── app.module.ts         # Main app module
│   │   └── main.ts               # Server entry point
│   ├── .env                      # Environment config
│   └── package.json
│
└── frontend/                     # React App
    ├── src/
    │   ├── pages/                # Page components
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── AdminDashboard.jsx
    │   │   ├── UserDashboard.jsx
    │   │   └── StoreOwnerDashboard.jsx
    │   ├── components/           # Reusable components
    │   ├── context/              # Auth context
    │   ├── api/                  # API client
    │   ├── styles/               # CSS styles
    │   ├── App.jsx               # Main component
    │   └── index.jsx             # Entry point
    ├── public/
    │   └── index.html            # HTML template
    └── package.json
```

## Key Files & Responsibilities

### Backend

| File | Purpose |
|------|---------|
| `src/main.ts` | Bootstrap application, configure CORS |
| `src/app.module.ts` | Root module, database config |
| `src/entities/*.ts` | Database table definitions |
| `src/modules/auth/` | JWT strategy, login/register logic |
| `src/modules/users/` | User management, admin functions |
| `src/modules/stores/` | Store CRUD operations |
| `src/modules/ratings/` | Rating submission/update logic |
| `.env` | Environment variables |

### Frontend

| File | Purpose |
|------|---------|
| `src/App.jsx` | Main app, routing setup |
| `src/context/AuthContext.jsx` | Global auth state |
| `src/api/api.js` | API client with token handling |
| `src/pages/*.jsx` | Role-specific pages |
| `src/styles/*.css` | Component styling |

## Database Schema

```
USERS
├── id (UUID, PK)
├── name (varchar 60)
├── email (varchar, UNIQUE)
├── address (varchar 400)
├── password (varchar, hashed)
├── role (enum: ADMIN, NORMAL_USER, STORE_OWNER)
└── timestamps (createdAt, updatedAt)

STORES
├── id (UUID, PK)
├── name (varchar 60)
├── email (varchar, UNIQUE)
├── address (varchar 400)
└── timestamps

RATINGS (Many-to-Many relationship)
├── id (UUID, PK)
├── rating (int 1-5)
├── userId (FK → Users) ─┐
├── storeId (FK → Stores) ├─ UNIQUE constraint
└── timestamps             └─ (one rating per user per store)
```

## Authentication Flow

```
1. User Registration
   → Validate input (name, email, password, address)
   → Hash password with bcryptjs
   → Save to database
   → Return user data

2. User Login
   → Find user by email
   → Compare password with hash
   → Generate JWT token
   → Return token + user info

3. Protected Routes
   → Extract JWT from Authorization header
   → Validate token with JWT strategy
   → Attach user info to request
   → Proceed to route handler
```

## Key API Endpoints

```
Authentication
├── POST   /auth/register           → New user account
├── POST   /auth/login              → Get JWT token
└── POST   /auth/update-password    → Change password

Users (Admin)
├── GET    /users                   → List all users
├── POST   /users                   → Create user
├── GET    /users/:id               → Get user details
└── GET    /users/dashboard/stats   → Dashboard data

Stores
├── GET    /stores                  → List stores
├── POST   /stores                  → Create store (admin)
└── GET    /stores/:id              → Store details + rating

Ratings
├── POST   /ratings                 → Submit rating
├── PATCH  /ratings/:storeId        → Update rating
├── GET    /ratings/store/:storeId  → Store's ratings
├── GET    /ratings/user/:userId    → User's ratings
└── GET    /ratings/my-rating/:id   → My rating (authenticated)
```

## Data Validation Rules

```
Field          | Min    | Max    | Pattern
---------------|--------|--------|-------------------
name           | 20 ch  | 60 ch  | Any characters
email          | -      | -      | Valid email format
password       | 8 ch   | 16 ch  | Uppercase + Special char
address        | -      | 400 ch | Any characters
rating         | 1      | 5      | Integer only
```

## User Roles & Permissions

```
ADMIN
├── Create users (any role)
├── Create stores
├── View dashboard statistics
├── View all users
├── View all stores
└── Full system access

NORMAL_USER
├── Register & login
├── View stores
├── Search & filter stores
├── Submit ratings
├── Modify ratings
└── Update password

STORE_OWNER
├── Login & view dashboard
├── See store ratings
├── View average rating
├── See who rated store
└── Update password
```

## Common Development Tasks

### Add New Route to Backend
```typescript
// In a controller
@Get('route-path')
@UseGuards(JwtAuthGuard)
async methodName(@Request() req) {
  // req.user contains: userId, email, role
  return this.service.methodName();
}
```

### Add New Page to Frontend
```jsx
// Create src/pages/NewPage.jsx
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const NewPage = () => {
  const { user } = useContext(AuthContext);
  
  return <div>Page content</div>;
};
```

### Call API from Frontend
```javascript
import api from '../api/api';

// GET request
const response = await api.get('/endpoint');

// POST request
const response = await api.post('/endpoint', {
  data: 'value'
});

// With query params
const response = await api.get('/endpoint', {
  params: { page: 1, limit: 10 }
});
```

## Debugging Tips

### Backend Debugging
```bash
# Watch for compilation errors
npm run start:dev

# Check database connection
psql -U postgres -d store_rating_db -c "SELECT 1"

# View database tables
psql -U postgres -d store_rating_db -c "\dt"
```

### Frontend Debugging
```javascript
// Console logging
console.log('Debug:', variable);

// React DevTools
// Install React DevTools extension in Chrome/Firefox

// Network debugging
// Open DevTools → Network tab → Check API calls
```

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Database connection error | Check .env credentials |
| JWT token errors | Clear localStorage, re-login |
| CORS errors | Verify backend origin in app.module.ts |
| Port already in use | Change port in .env |
| API returns 401 | Token expired or invalid, re-login |
| Styles not loading | Hard refresh (Ctrl+Shift+R) |

## Testing Credentials

```
Admin
├── Email: admin@example.com
└── Password: Admin@123

User
├── Email: user@example.com
└── Password: User@123

Store Owner
├── Email: owner@example.com
└── Password: Owner@123
```

## Performance Considerations

- JWT tokens expire after 24h
- Database queries are optimized with pagination
- Frontend loads only visible data
- No infinite scroll (pagination-based)
- API responses include pagination metadata

## Security Best Practices

✅ Passwords hashed with bcryptjs (10 rounds)
✅ JWT authentication on protected routes
✅ Input validation with class-validator
✅ CORS configured
✅ Environment variables for secrets
✅ No sensitive data in frontend

## Next Steps for Development

1. **Add Features**
   - User profile page
   - Store photos
   - Review comments
   - Email notifications

2. **Improve Performance**
   - Add caching
   - Optimize queries
   - Lazy load components
   - Image optimization

3. **Deploy**
   - Set up CI/CD pipeline
   - Configure production database
   - Enable analytics
   - Monitor errors

## Useful Resources

- [NestJS Documentation](https://docs.nestjs.com)
- [React Documentation](https://react.dev)
- [TypeORM Documentation](https://typeorm.io)
- [PostgreSQL Documentation](https://www.postgresql.org/docs)

## Code Standards

- Use TypeScript for strong typing
- Follow NestJS module pattern
- Use React hooks (functional components)
- Component names in PascalCase
- Function names in camelCase
- Database tables in lowercase

## Git Workflow

```bash
# Create feature branch
git checkout -b feature/feature-name

# Make changes and commit
git add .
git commit -m "feat: description of change"

# Push to remote
git push origin feature/feature-name

# Create pull request
# After review, merge to main
```

---

**Happy Coding!** 🚀

For detailed guides, see:
- [README.md](README.md)
- [INSTALLATION_GUIDE.md](INSTALLATION_GUIDE.md)
- [API_DOCUMENTATION.md](API_DOCUMENTATION.md)
