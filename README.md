# React.js & Node.js Login/Logout Flow (SQLite)

This is a full-stack project demonstrating a complete user authentication system with registration, login, session management, and a protected route.

## 🚀 Features
- **User Registration**: New users can sign up with an email and password.
- **User Login**: Registered users can log in to access protected content.
- **Session Management**: Uses `express-session` with cookies to keep users logged in across browser sessions.
- **Protected Routes**: The `/dashboard` route is only accessible to authenticated users.
- **Logout**: Users can securely log out, which destroys the session on the server.
- **Password Hashing**: Passwords are securely hashed using `bcrypt` before being stored.
- **Lightweight Database**: Uses **SQLite** for simple, file-based database storage.

## 🛠 Tech Stack
- **Frontend**: React.js, React Router, Axios
- **Backend**: Node.js, Express.js
- **Database**: SQLite
- **Authentication**: `bcrypt` for hashing, `express-session` and `cookie-parser` for session handling.



## 📂 Project Structure

project-root/
│── backend/
│   ├── server.js        # Main Express server
│   ├── db.js            # SQLite database setup
│   ├── routes/auth.js   # Authentication API routes
│   └── package.json
│
│── frontend/
│   ├── src/
│   │   ├── App.js         # Main component with routing
│   │   └── components/    # Reusable UI components
│   └── package.json
│
└── README.md

<<<<<<< HEAD
=======

## Live Demo
  Frontend Application: https://klickks-login-logout.vercel.app
  Backend API: https://klickks-login-logout.onrender.com/
>>>>>>> 90ddecadbac7b79e482701cedcc3f09f5fee5a71
