# Zynxis Client Portal

A full-stack client portal web application developed as the capstone project for a full-stack development internship.

The Zynxis Client Portal provides a centralized platform for managing clients, projects, tasks, notifications, and task attachments. It uses a React frontend, Node.js/Express backend, MongoDB database, JWT authentication, and REST APIs.

---

## Overview

The Zynxis Client Portal was developed to demonstrate a complete full-stack application workflow, from database design and REST API development to responsive frontend implementation, authentication, live data fetching, file uploads, notifications, and deployment.

The application follows a client-server architecture:

```text
React Frontend
      │
      │ REST API
      ▼
Node.js + Express Backend
      │
      ├── JWT Authentication
      ├── Authorization
      ├── Task Management
      ├── Project Management
      ├── Notifications
      └── File Uploads
      │
      ▼
MongoDB Database
```

---

## Features

### Authentication & Authorization

- User registration and login
- JWT-based authentication
- Protected API routes
- Role-based authorization
- Logout functionality
- Invalid/expired token handling

### Dashboard

- Total clients count
- Total projects count
- Total tasks count
- Unread notifications count
- Live data fetched from the backend

### Project Management

- Retrieve project information
- Display projects through responsive cards
- Project overview table
- Project status information

### Task Management

- Retrieve tasks
- Create tasks
- Display task details
- Project association
- Priority and status
- Due dates
- Task overview table

### Notifications

- Automatic notification when a task is created
- Notification listing
- Read/unread status
- Unread notification count on dashboard
- Notification timestamps

### File Attachments

- Upload task attachments
- Multipart/form-data support
- Multer-based file handling
- 5 MB file-size limit
- Unique uploaded filenames
- View uploaded attachments

### Frontend

- Responsive React interface
- Tailwind CSS styling
- Reusable UI components
- React Router navigation
- TanStack React Query for server-state management
- Loading and error states

---

## Technology Stack

### Frontend

- React
- Vite
- Tailwind CSS
- React Router
- Axios
- TanStack React Query

### Backend

- Node.js
- Express.js
- JWT
- Multer
- CORS
- dotenv

### Database

- MongoDB
- Mongoose

### Development & Testing

- Visual Studio Code
- Git
- GitHub
- Postman
- npm

### Deployment

- Vercel
- Production API deployment

---

## Project Structure

```text
Zynxis-Client-Portal/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── uploads/
│   │   └── server.js
│   │
│   ├── package.json
│   └── .gitignore
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── DataTable.jsx
│   │   │   └── FormInput.jsx
│   │   │
│   │   ├── layouts/
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Notifications.jsx
│   │   │   ├── Projects.jsx
│   │   │   └── Tasks.jsx
│   │   │
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── .gitignore
│
├── postman/
│   └── Zynxis-Client-Portal-API.json
│
├── docs/
│
├── README.md
└── .gitignore
```

---

## Backend API

The backend provides RESTful API endpoints for the main application features.

### Authentication

**Register**

```http
POST /api/auth/register
```

Creates a new user account.

**Login**

```http
POST /api/auth/login
```

Authenticates a user and returns authentication information.

---

### Projects

**Get Projects**

```http
GET /api/projects
```

Returns project information for an authenticated user.

---

### Dashboard

**Get Dashboard Statistics**

```http
GET /api/dashboard
```

Returns dashboard statistics including clients, projects, tasks, and other summary information.

---

### Tasks

**Get Tasks**

```http
GET /api/tasks
```

Returns available tasks.

**Create Task**

```http
POST /api/tasks
```

Creates a new task.

**Upload Task Attachment**

```http
POST /api/tasks/:id/upload
```

Uploads an attachment for a specific task.

The file must be sent using the multipart/form-data field:

```text
attachment
```

---

### Notifications

**Get Notifications**

```http
GET /api/notifications
```

Returns notifications for the authenticated user.

---

## Authentication

Protected API requests require a JWT token.

The token is sent using the Authorization header:

```http
Authorization: Bearer <token>
```

The backend authentication middleware verifies the token before allowing access to protected resources.

Unauthorized or invalid requests are rejected.

---

## Environment Variables

Environment variables are used to keep configuration and secrets outside the source code.

### Backend

Create a `.env` file inside the `backend` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Additional environment variables may be required depending on the deployment configuration.

### Frontend

Create a `.env` file inside the `frontend` directory:

```env
VITE_API_URL=http://localhost:5000
```

For production, `VITE_API_URL` should point to the deployed backend API.

> Never commit real passwords, JWT secrets, database credentials, or other sensitive values to GitHub.

---

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
```

Navigate into the project:

```bash
cd Zynxis-Client-Portal
```

---

## Backend Setup

Navigate to the backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create the `.env` file and configure the required environment variables.

Start the development server:

```bash
npm run dev
```

The backend runs locally on:

```text
http://localhost:5000
```

---

## Frontend Setup

Open a new terminal and navigate to:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Configure the frontend `.env` file:

```env
VITE_API_URL=http://localhost:5000
```

Start the development server:

```bash
npm run dev
```

The frontend will be available at the local URL provided by Vite.

---

## File Uploads

Task attachments are handled using Multer.

The backend:

1. Receives a multipart/form-data request.
2. Reads the `attachment` field.
3. Generates a unique filename.
4. Stores the file in the uploads directory.
5. Saves the generated filename with the task.
6. Returns the updated task information.

Maximum file size:

```text
5 MB
```

---

## Notifications

When a new task is created, the backend creates a corresponding notification.

Example:

```text
New task "Design Login Page" has been created.
```

The frontend retrieves notifications through the notifications API and displays unread notifications separately.

The dashboard also displays the current unread notification count.

---

## Data Fetching

The frontend uses TanStack React Query to manage server state.

It is used for:

- Dashboard data
- Project data
- Task data
- Notification data
- Upload mutations

React Query also handles loading states, error states, caching, and query invalidation after mutations.

---

## Postman Collection

A Postman-compatible API collection is included in:

```text
postman/Zynxis-Client-Portal-API.json
```

The collection contains requests for:

- Login
- Register
- Projects
- Dashboard
- Tasks
- Create Task
- Upload Task Attachment
- Notifications

The collection uses variables such as:

```text
{{baseUrl}}
{{token}}
{{taskId}}
```

The collection can be imported into Postman for API testing.

---

## Testing

The application was tested during development across the major system features.

Testing included:

- User login and logout
- JWT authentication
- Protected routes
- Invalid/expired token handling
- Project data retrieval
- Task retrieval and creation
- File uploads
- Notification creation and retrieval
- Dashboard statistics
- Frontend API data fetching
- Responsive UI behavior

API responses were also verified through Postman and browser/network testing.

---

## Deployment

The application was prepared for production deployment with environment-based configuration.

Frontend:

```text
https://zynxis-client-portal.vercel.app
```

The production frontend communicates with the deployed backend API through the configured `VITE_API_URL`.

---

## Security Considerations

The application includes several security measures:

- JWT-based authentication
- Protected API routes
- Role-based authorization
- Environment variables for secrets
- `.env` excluded from Git
- Invalid token rejection
- File-size restrictions for uploads
- CORS configuration

Sensitive credentials should never be committed to the repository.

---

## Future Improvements

Possible future improvements include:

- Advanced role-based dashboards
- Project creation and editing from the frontend
- Task editing and deletion UI
- Search and filtering
- Pagination
- Cloud-based file storage
- Email notifications
- Audit logs
- Automated unit and integration testing
- Enhanced analytics and reporting
- Improved file-type validation

---

## Author

**Ayeza Waheed**

Full-Stack Development Internship
Zynxis Client Portal — Capstone Project

---

## Project Status

**Completed — Week 8 Capstone**

The project includes the completed frontend, backend, database integration, authentication, REST APIs, dashboard, projects, tasks, notifications, file attachments, API collection, and deployment.