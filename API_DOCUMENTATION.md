# API Documentation

## Base URL
```
http://localhost:3001
```

## Authentication
All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

## Authentication Endpoints

### Register
**POST** `/auth/register`

Register a new normal user on the platform.

**Request Body:**
```json
{
  "name": "John Doe Example Name",
  "email": "john@example.com",
  "password": "SecurePass@123",
  "address": "123 Main Street, City, ST 12345"
}
```

**Response (201 Created):**
```json
{
  "id": "uuid-here",
  "name": "John Doe Example Name",
  "email": "john@example.com",
  "address": "123 Main Street, City, ST 12345",
  "role": "NORMAL_USER",
  "createdAt": "2024-01-01T12:00:00Z",
  "updatedAt": "2024-01-01T12:00:00Z"
}
```

**Validation Rules:**
- Name: 20-60 characters
- Email: Valid email format
- Password: 8-16 characters, must include uppercase letter and special character
- Address: Max 400 characters

---

### Login
**POST** `/auth/login`

Authenticate user and receive JWT token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "SecurePass@123"
}
```

**Response (200 OK):**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid-here",
    "email": "john@example.com",
    "name": "John Doe Example Name",
    "role": "NORMAL_USER",
    "address": "123 Main Street, City, ST 12345"
  }
}
```

**Error Response (401 Unauthorized):**
```json
{
  "statusCode": 401,
  "message": "Invalid email or password"
}
```

---

### Update Password
**POST** `/auth/update-password`

Update user password (authenticated).

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "currentPassword": "SecurePass@123",
  "newPassword": "NewSecure@456"
}
```

**Response (200 OK):**
```json
{
  "message": "Password updated successfully"
}
```

---

## User Endpoints

### Get All Users
**GET** `/users`

Get list of all users with filtering and sorting (requires admin role).

**Query Parameters:**
- `page` (optional): Page number, default = 1
- `limit` (optional): Items per page, default = 10
- `sortBy` (optional): Field to sort by (name, email, createdAt), default = name
- `sortOrder` (optional): ASC or DESC, default = ASC
- `name` (optional): Filter by name
- `email` (optional): Filter by email
- `address` (optional): Filter by address
- `role` (optional): Filter by role (ADMIN, NORMAL_USER, STORE_OWNER)

**Example Request:**
```
GET /users?page=1&limit=10&sortBy=name&sortOrder=ASC&role=NORMAL_USER
```

**Response (200 OK):**
```json
{
  "data": [
    {
      "id": "uuid-1",
      "name": "John Doe Example Name",
      "email": "john@example.com",
      "address": "123 Main Street",
      "role": "NORMAL_USER",
      "createdAt": "2024-01-01T12:00:00Z",
      "updatedAt": "2024-01-01T12:00:00Z"
    }
  ],
  "pagination": {
    "total": 50,
    "page": 1,
    "limit": 10,
    "totalPages": 5
  }
}
```

---

### Create User
**POST** `/users`

Create new user (admin only).

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Request Body:**
```json
{
  "name": "Jane Smith Example Name",
  "email": "jane@example.com",
  "password": "SecurePass@123",
  "address": "456 Oak Avenue, City, ST 67890",
  "role": "STORE_OWNER"
}
```

**Response (201 Created):**
```json
{
  "id": "uuid-here",
  "name": "Jane Smith Example Name",
  "email": "jane@example.com",
  "address": "456 Oak Avenue, City, ST 67890",
  "role": "STORE_OWNER",
  "createdAt": "2024-01-01T12:00:00Z",
  "updatedAt": "2024-01-01T12:00:00Z"
}
```

---

### Get User Details
**GET** `/users/:id`

Get specific user information.

**Path Parameters:**
- `id`: User UUID

**Response (200 OK):**
```json
{
  "id": "uuid-here",
  "name": "John Doe Example Name",
  "email": "john@example.com",
  "address": "123 Main Street",
  "role": "NORMAL_USER",
  "ratings": [],
  "createdAt": "2024-01-01T12:00:00Z",
  "updatedAt": "2024-01-01T12:00:00Z"
}
```

---

### Get Dashboard Statistics
**GET** `/users/dashboard/stats`

Get dashboard statistics (admin only).

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Response (200 OK):**
```json
{
  "totalUsers": 50,
  "totalAdmins": 2,
  "totalNormalUsers": 45,
  "totalStoreOwners": 3
}
```

---

## Store Endpoints

### Get All Stores
**GET** `/stores`

Get list of all stores with filtering and sorting.

**Query Parameters:**
- `page` (optional): Page number, default = 1
- `limit` (optional): Items per page, default = 10
- `sortBy` (optional): Field to sort by (name, email, address), default = name
- `sortOrder` (optional): ASC or DESC, default = ASC
- `name` (optional): Filter by name
- `email` (optional): Filter by email
- `address` (optional): Filter by address

**Example Request:**
```
GET /stores?page=1&limit=20&sortBy=name&sortOrder=ASC
```

**Response (200 OK):**
```json
{
  "data": [
    {
      "id": "uuid-1",
      "name": "Amazing Coffee Shop Store",
      "email": "coffee@example.com",
      "address": "456 Coffee Lane, City, ST 67890",
      "averageRating": 4.5,
      "createdAt": "2024-01-01T12:00:00Z",
      "updatedAt": "2024-01-01T12:00:00Z"
    }
  ],
  "pagination": {
    "total": 100,
    "page": 1,
    "limit": 20,
    "totalPages": 5
  }
}
```

---

### Create Store
**POST** `/stores`

Create new store (admin only).

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Request Body:**
```json
{
  "name": "Amazing Pizza Restaurant Store",
  "email": "pizza@example.com",
  "address": "789 Pizza Place, City, ST 98765"
}
```

**Response (201 Created):**
```json
{
  "id": "uuid-here",
  "name": "Amazing Pizza Restaurant Store",
  "email": "pizza@example.com",
  "address": "789 Pizza Place, City, ST 98765",
  "createdAt": "2024-01-01T12:00:00Z",
  "updatedAt": "2024-01-01T12:00:00Z"
}
```

---

### Get Store Details
**GET** `/stores/:id`

Get specific store information with average rating.

**Path Parameters:**
- `id`: Store UUID

**Response (200 OK):**
```json
{
  "id": "uuid-here",
  "name": "Amazing Coffee Shop Store",
  "email": "coffee@example.com",
  "address": "456 Coffee Lane, City, ST 67890",
  "averageRating": 4.5,
  "createdAt": "2024-01-01T12:00:00Z",
  "updatedAt": "2024-01-01T12:00:00Z"
}
```

---

## Rating Endpoints

### Submit Rating
**POST** `/ratings`

Submit a rating for a store.

**Headers:**
```
Authorization: Bearer <user_token>
```

**Request Body:**
```json
{
  "rating": 5,
  "storeId": "store-uuid-here"
}
```

**Validation:**
- Rating must be between 1-5
- User can only submit one rating per store
- User must be authenticated

**Response (201 Created):**
```json
{
  "id": "rating-uuid",
  "rating": 5,
  "userId": "user-uuid",
  "storeId": "store-uuid",
  "createdAt": "2024-01-01T12:00:00Z",
  "updatedAt": "2024-01-01T12:00:00Z"
}
```

**Error Response (409 Conflict):**
```json
{
  "statusCode": 409,
  "message": "You have already rated this store"
}
```

---

### Update Rating
**PATCH** `/ratings/:storeId`

Update existing rating for a store.

**Headers:**
```
Authorization: Bearer <user_token>
```

**Path Parameters:**
- `storeId`: Store UUID

**Request Body:**
```json
{
  "rating": 4
}
```

**Response (200 OK):**
```json
{
  "id": "rating-uuid",
  "rating": 4,
  "userId": "user-uuid",
  "storeId": "store-uuid",
  "createdAt": "2024-01-01T12:00:00Z",
  "updatedAt": "2024-01-01T12:05:00Z"
}
```

---

### Get Store Ratings
**GET** `/ratings/store/:storeId`

Get all ratings for a specific store.

**Path Parameters:**
- `storeId`: Store UUID

**Query Parameters:**
- `page` (optional): Page number, default = 1
- `limit` (optional): Items per page, default = 10

**Response (200 OK):**
```json
{
  "ratings": [
    {
      "id": "rating-uuid-1",
      "rating": 5,
      "user": {
        "id": "user-uuid",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "createdAt": "2024-01-01T12:00:00Z"
    }
  ],
  "averageRating": 4.5,
  "pagination": {
    "total": 15,
    "page": 1,
    "limit": 10,
    "totalPages": 2
  }
}
```

---

### Get User Ratings
**GET** `/ratings/user/:userId`

Get all ratings submitted by a user.

**Headers:**
```
Authorization: Bearer <user_token>
```

**Path Parameters:**
- `userId`: User UUID

**Query Parameters:**
- `page` (optional): Page number, default = 1
- `limit` (optional): Items per page, default = 10

**Response (200 OK):**
```json
{
  "ratings": [
    {
      "id": "rating-uuid",
      "rating": 5,
      "store": {
        "id": "store-uuid",
        "name": "Amazing Coffee Shop",
        "address": "456 Coffee Lane"
      },
      "createdAt": "2024-01-01T12:00:00Z"
    }
  ],
  "pagination": {
    "total": 8,
    "page": 1,
    "limit": 10,
    "totalPages": 1
  }
}
```

---

### Get User's Rating for Store
**GET** `/ratings/my-rating/:storeId`

Get your rating for a specific store.

**Headers:**
```
Authorization: Bearer <user_token>
```

**Path Parameters:**
- `storeId`: Store UUID

**Response (200 OK):**
```json
{
  "id": "rating-uuid",
  "rating": 4,
  "userId": "user-uuid",
  "storeId": "store-uuid",
  "createdAt": "2024-01-01T12:00:00Z",
  "updatedAt": "2024-01-01T12:05:00Z"
}
```

**Response (200 OK - No rating):**
```json
null
```

---

## Error Responses

### 400 Bad Request
```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "error": "Bad Request"
}
```

### 401 Unauthorized
```json
{
  "statusCode": 401,
  "message": "Unauthorized"
}
```

### 403 Forbidden
```json
{
  "statusCode": 403,
  "message": "Forbidden"
}
```

### 404 Not Found
```json
{
  "statusCode": 404,
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "statusCode": 500,
  "message": "Internal server error"
}
```

---

## Testing with Postman

1. Import this collection into Postman
2. Set the base URL: `http://localhost:3001`
3. After login, copy the `accessToken`
4. Create a Postman variable: `token` = accessToken
5. Use `{{token}}` in Authorization header for protected routes

---

## Rate Limiting & Considerations

- No rate limiting currently implemented
- Tokens expire after 24 hours
- Database connections are pooled
- Maximum request size: Standard (usually 1MB)

---

## Useful Query Examples

### Get all normal users, sorted by name
```
GET /users?role=NORMAL_USER&sortBy=name&sortOrder=ASC
```

### Search stores by name with pagination
```
GET /stores?name=coffee&page=1&limit=10
```

### Get store ratings (newest first)
```
GET /ratings/store/{storeId}?page=1&limit=20
```

---

For more information, see the [README.md](README.md)
