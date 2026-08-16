# Zynxis Client Portal — Security Note

## 1. Authentication

The Zynxis Client Portal uses JSON Web Tokens (JWT) for user
authentication.

After successful login, the backend generates a signed JWT containing
the authenticated user's identity and role.

Protected API requests must include the JWT in the Authorization header:

Authorization: Bearer <JWT_TOKEN>

The authentication middleware verifies the token before allowing access
to protected resources.

## 2. Password Security

User passwords are not stored as plain text.

Passwords are hashed using bcrypt before being stored in MongoDB.

During login, the submitted password is compared against the stored
bcrypt hash.

This prevents the original password from being directly stored in the
database.

## 3. Role-Based Access Control

The application implements role-based authorization.

Example roles include:

- Admin
- Intern

Administrative operations are restricted to users with the appropriate
role.

For example, the user registration endpoint requires an administrator:

POST /api/auth/register

The request must pass both authentication and role authorization
middleware.

## 4. API Protection

Protected endpoints require a valid JWT.

Examples include:

- GET /api/dashboard
- GET /api/projects
- GET /api/tasks
- GET /api/notifications

Requests without a valid token are rejected.

The application returns:

- 401 Unauthorized — when authentication is missing or invalid.
- 403 Forbidden — when the authenticated user does not have sufficient
  permissions.

## 5. Environment Variables

Sensitive configuration values are stored in environment variables
instead of being hard-coded into the application.

Examples include:

- MONGO_URI
- JWT_SECRET
- PORT
- VITE_API_URL

The `.env` files are excluded from Git using `.gitignore`.

This prevents database credentials, JWT secrets, and other sensitive
configuration from being committed to the repository.

## 6. CORS

The backend uses CORS middleware to control cross-origin requests.

This allows the React frontend to communicate with the Express API while
maintaining control over which origins can access the backend.

## 7. Database Security

MongoDB Atlas is used as the database service.

Database credentials are stored through environment variables rather
than directly inside the source code.

The application communicates with MongoDB through Mongoose.

## 8. Authentication and Authorization Testing

The security mechanisms were tested using Postman.

### Test 1 — Successful Login

A valid user successfully authenticated and received a JWT.

Result:

200 — Login successful

### Test 2 — Missing Token

A protected endpoint was requested without an Authorization header.

Result:

401 — No token provided

### Test 3 — Insufficient Role

An authenticated intern attempted to access an administrator-only
endpoint.

Result:

403 — Access denied

### Test 4 — Administrator Access

An authenticated administrator accessed the administrator-only
registration endpoint.

Result:

Successful user registration

These tests demonstrate that both authentication and role-based
authorization are functioning as intended.

## 9. Security Considerations

The application follows basic security practices appropriate for the
project:

- Passwords are hashed using bcrypt.
- JWT secrets are stored outside the source code.
- Database credentials are stored in environment variables.
- Protected API routes require authentication.
- Privileged operations require role authorization.
- `.env` files are excluded from version control.
- Authentication and authorization failures return appropriate HTTP
  status codes.

## 10. Future Security Improvements

For a production-scale system, additional measures could be introduced,
including:

- HTTP-only secure cookies for token storage.
- Refresh token rotation.
- Rate limiting on authentication endpoints.
- More restrictive production CORS configuration.
- Password reset and account recovery.
- Account lockout after repeated failed login attempts.
- Input validation and sanitization.
- Security headers.
- Centralized logging and monitoring.