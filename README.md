# JWT Authentication Project

## Overview

This is a simple JWT (JSON Web Token) authentication system built to demonstrate how to implement secure user authentication in a web application using JWT tokens. The system allows users to register, log in, and access protected resources using JWT tokens for authentication.

## Features

- **User Registration**: Users can create an account by providing their credentials.
- **Login**: Users can log in with their credentials and receive a JWT token.
- **Protected Routes**: Access to certain resources is restricted to authenticated users who provide a valid JWT token.
- **Token Expiry**: Tokens come with an expiry time, requiring users to re-authenticate after expiration.

## Installation

1. Clone the repository:

```bash
   git clone https://github.com/mehul-m-prajapati/jwt-basic.git
   npm install
```

2. Set up your environment variables (e.g., JWT secret key, database connection string). You can create a .env file with the following contents:

```
PORT=3000
JWT_SECRET=test
MONGO_URI=mongodb://localhost:27017/jwt-db
```

3. Start the server:

```
npm run dev
```

4. Testing with cURL

```
# Register a new user
curl -X POST http://localhost:3000/api/auth/signup \
-H "Content-Type: application/json" \
-d '{
  "name": "test",
  "email": "test@example.com",
  "password": "test"
}'

# Get private route
curl -X GET http://localhost:3000/api/dashboard \
-H "Authorization: your_jwt_token_here"

# Get new Access token
curl -X POST http://localhost:3000/api/auth/refresh-token   -H "Content-Type: application/json"   -d '{
    "refreshToken": "your-refresh-token-here"
}'
```

### Key Points
- **Access Token**: Short-lived, used for accessing resources.
- **Refresh Token**: Long-lived, used to obtain a new Access Token without re-authentication.
- **Security**: Refresh Tokens must be stored securely (e.g., HTTP-only cookies or encrypted storage)

### Flow diagram
```
+-------------------+       +-------------------+       +-------------------+
|  User Login       |       |  Access Token     |       |  Protected        |
|  (Credentials)    | ----> |  (Short-lived)    | ----> |  Resource Access  |
+-------------------+       +-------------------+       +-------------------+
        |                           |                           |
        |                           |                           |
        v                           v                           v
+-------------------+       +-------------------+       +-------------------+
|  Generate Tokens  |       |  Token Expired    |       |  Validate Token   |
|  (Access + Refresh)| <--- |  (Access Token)   | <---- |  (Access Token)   |
+-------------------+       +-------------------+       +-------------------+
        |                           |
        |                           |
        v                           v
+-------------------+       +-------------------+
|  Refresh Token    |       |  Re-Authenticate  |
|  (Long-lived)     | --->  | (If Refresh Fails)|
+-------------------+       +-------------------+
```
