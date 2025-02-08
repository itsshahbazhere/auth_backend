# Auth Backend

A backend authentication and authorization system built with Node.js, Express, and MongoDB. This project includes authentication (AuthN) and authorization (AuthZ) logic, utilizing JSON Web Tokens (JWT) and cookies for secure session handling.

## Features

- **User Authentication** (Register & Login)
- **Password Hashing** using bcrypt
- **JWT-Based Authorization**
- **Token Storage in Cookies, Headers, and Request Body**
- **Role-Based Access Control (RBAC)**
- **Secure MongoDB Connection**

## Tech Stack

- Node.js
- Express.js
- MongoDB & Mongoose
- bcrypt (for password hashing)
- JSON Web Tokens (JWT) for authentication
- Cookie-based token storage
- dotenv for environment variables
- Nodemon for development

## Installation

1. **Clone the repository**
   ```sh
   git clone https://github.com/itsshahbazhere/auth_backend.git
   cd auth_backend
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory and add the following:
   ```env
   PORT=4000
   MONGO_URL=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```

4. **Run the server**
   ```sh
   npm run dev
   ```
   The server will start at `http://localhost:4000`.

## API Endpoints

### 1. Signup User
**POST** `/api/v1/signup`
#### Request Body:
```json
{
  "name": "testuser",
  "email": "test@example.com",
  "password": "securepassword",
  "role": "Student"
}
```

### 2. Login
**POST** `/api/v1/login`
#### Request Body:
```json
{
  "email": "test@example.com",
  "password": "securepassword"
}
```

#### Response:
- A JWT token is generated and stored in an HTTP-only cookie, added to the headers, and included in the request body for additional security.

### 3. Student Protected Route
**GET** `/api/v1/student`
- Accessible only to users with a student role.
- Requires a valid token in cookies, headers, or request body.

### 4. Admin Protected Route
**GET** `/api/v1/admin`
- Accessible only to users with an admin role.
- Requires a valid token in cookies, headers, or request body.

### 5. General Authentication Route
**GET** `/api/auth/test`
- Accessible to any authenticated user.
- Requires a valid token in cookies, headers, or request body.

## Authentication Logic

- Passwords are hashed using **bcrypt** before storing in the database.
- Users are authenticated using **JWT**, which is stored in an HTTP-only cookie, added to the headers, and optionally included in the request body.
- Authorization checks are implemented for protected routes.
- JWT tokens are created upon login and stored securely in:
  - **Cookies** (HTTP-only, Secure)
  - **Headers** (Authorization: Bearer Token)
  - **Request Body** (Optional for added flexibility)

## Running in Development Mode
To enable auto-restart on changes, the project uses **nodemon**:
```sh
npm run dev
```

## Author
**Shahbaz**  
[GitHub Profile](https://github.com/itsshahbazhere)

## License
This project is open-source and available under the [MIT License](LICENSE).

