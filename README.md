# JWT Authentication Project

## Overview

This is a simple JWT (JSON Web Token) authentication system built to demonstrate how to implement secure user authentication in a web application using JWT tokens. The system allows users to register, log in, and access protected resources using JWT tokens for authentication.

## Features

- **User Registration**: Users can create an account by providing their credentials.
- **Login**: Users can log in with their credentials and receive a JWT token.
- **Protected Routes**: Access to certain resources is restricted to authenticated users who provide a valid JWT token.
- **Token Expiry**: Tokens come with an expiry time, requiring users to re-authenticate after expiration.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed (version 12 or above)
- npm or yarn for dependency management
- A database (e.g., MongoDB) to store user information (if applicable)
- Postman or any API testing tool to test the endpoints (optional)

## Installation

1. Clone the repository:
```bash
   git clone https://github.com/yourusername/jwt-authentication.git
   npm install
```

2. Set up your environment variables (e.g., JWT secret key, database connection string). You can create a .env file with the following contents:
```
PORT=5000
JWT_SECRET=test
MONGO_URI=mongodb://localhost:27017/jwt-db
```

3. Start the server:
```
npm run dev
```

4. Testing with cURL
```
curl -X POST http://localhost:3000/api/auth/signup \
-H "Content-Type: application/json" \
-d '{
  "username": "test",
  "email": "test@example.com",
  "password": "test"
}'

curl -X GET http://localhost:3000/api/dashboard \
-H "Authorization: your_jwt_token_here"

```
