# Zynxis Client Portal — Authentication Flow

## 1. Overview

The Zynxis Client Portal uses JWT-based authentication to protect
private API resources. Users must successfully log in before accessing
protected portal features such as the dashboard, projects, tasks, and
notifications.

## 2. Login Flow

The authentication process follows these steps:

1. The user enters their email and password on the React login page.
2. The frontend sends a POST request to `/api/auth/login`.
3. The backend searches for the user in MongoDB.
4. The submitted password is compared with the stored hashed password
   using bcrypt.
5. If the credentials are valid, the backend generates a JWT token.
6. The token and user information are returned to the frontend.
7. The frontend stores the token and user information in local storage.
8. The token is included in the Authorization header when accessing
   protected API endpoints.

## 3. Protected Routes

Protected API requests use the authentication middleware.

The middleware:

1. Checks whether an Authorization header is present.
2. Extracts the Bearer token.
3. Verifies the JWT using the server-side JWT secret.
4. Identifies the authenticated user.
5. Allows the request to continue if the token is valid.
6. Rejects the request if the token is missing or invalid.

Example:

`Authorization: Bearer <JWT_TOKEN>`

## 4. Role-Based Access Control

The system also implements role-based authorization.

Different users can have different roles, such as:

- Admin
- Intern

Certain operations require specific roles.

For example, user registration is restricted to administrators:

`POST /api/auth/register`

The request passes through both:

- Authentication middleware
- Role authorization middleware

Therefore:

- No token → `401 Unauthorized`
- Valid token but insufficient role → `403 Forbidden`
- Valid admin token → request is allowed

## 5. Frontend Route Protection

The React frontend also uses a `ProtectedRoute` component.

When a user attempts to access a protected page:

1. The application checks for an authentication token.
2. If a token exists, the user can access the protected route.
3. If no token exists, the user is redirected to `/login`.

Protected pages include:

- Dashboard
- Projects
- Tasks
- Notifications

## 6. Logout Flow

When the user logs out:

1. The stored JWT token is removed.
2. Stored user information is removed.
3. The user is redirected to the login page.
4. Attempting to access a protected route without a token redirects
   the user back to `/login`.

## 7. Authentication Testing

The authentication system was tested using Postman.

### Successful Login

`POST /api/auth/login`

Result:

`200 — Login successful`

A JWT token was returned for the authenticated user.

### Missing Authentication

A protected endpoint was tested without a token.

Result:

`401 — No token provided`

### Role Authorization

An authenticated user without the required administrator role attempted
to access the registration endpoint.

Result:

`403 — Access denied`

### Successful Administrator Authorization

An administrator authenticated successfully and accessed the
registration endpoint.

Result:

`200 — User registered successfully`

## 8. Security Measures

The application uses the following security practices:

- Passwords are stored as bcrypt hashes rather than plain text.
- JWT is used for stateless authentication.
- JWT secrets are stored in environment variables.
- Protected API endpoints require authentication.
- Role-based authorization restricts privileged operations.
- Database credentials are stored in environment variables.
- `.env` files are excluded from Git using `.gitignore`.

## 9. Authentication Architecture

The overall authentication flow is:

User
  ↓
React Login Page
  ↓
POST /api/auth/login
  ↓
Express Authentication Controller
  ↓
MongoDB User Lookup
  ↓
bcrypt Password Verification
  ↓
JWT Generation
  ↓
Frontend Stores JWT
  ↓
Protected API Request
  ↓
Authentication Middleware
  ↓
Role Authorization (when required)
  ↓
Controller
  ↓
MongoDB
  ↓
API Response