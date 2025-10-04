FOLDER STRUCTURE 

project-root/
├── backend/
│   ├── src/
│   │   ├── config/       # DB connection
│   │   ├── controllers/  # Business logic
│   │   ├── models/       # Mongoose schemas
│   │   ├── routes/       # API routes
│   │   └── app.js        # Express setup
│   ├── .env              # Environment variables (not pushed)
│   └── server.js         # Server entry point
│
├── frontend/
│   ├── src/
│   │   ├── pages/        # Login, Register, Dashboard
│   │   ├── components/   # Navbar, etc.
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── vite.config.js
│
└── README.md

RUN BOTH Backend & Frontend Together
npm start

Installation (Backend)

npm install express mongoose dotenv bcryptjs jsonwebtoken cors

Installation (Frontend)

npm install react-router-dom axios bootstrap

.env File

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

