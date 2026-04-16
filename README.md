 Full Stack Todo App with Authentication (File System Based)

A simple yet professional Full Stack Todo Application built using Node.js, Express, JWT Authentication, and File System (JSON) as database, with a minimal frontend using HTML, CSS, and JavaScript.

 Features
 User Registration & Login (JWT Authentication)
 Password hashing using bcrypt
 File system based data storage (JSON files)
 Create, Read, Delete Todos
 User-specific todos (private data)
 Minimal and clean frontend UI
 Protected API routes using middleware
 Lightweight backend (no database required)
 Tech Stack
Backend:
Node.js
Express.js
JWT (Authentication)
bcrypt.js
File System (fs module)
Frontend:
HTML
CSS
JavaScript (Fetch API)

📁 Project Structure
project-root/
│
├── backend/
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── todoRoutes.js
│   │
│   ├── middleware/
│   │   └── auth.js
│   │
│   ├── utils/
│   │   └── fileHandler.js
│   │
│   ├── data/
│   │   ├── users.json
│   │   └── todos.json
│   │
│   ├── server.js
│   └── .env
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
└── README.md

⚙️ Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/your-username/todo-auth-project.git
cd todo-auth-project
2️⃣ Install backend dependencies
cd backend
npm install
3️⃣ Setup environment variables

Create .env file inside backend:

PORT=5000
JWT_SECRET=supersecretkey
4️⃣ Run backend server
node server.js

Server will run on:

http://localhost:5000
5️⃣ Open frontend

Just open:

frontend/index.html
 API Endpoints
 Auth Routes
Register User
POST /api/auth/register
Login User
POST /api/auth/login
 Todo Routes (Protected)
Get Todos
GET /api/todos
Create Todo
POST /api/todos
Update Todo
PUT /api/todos/:id
Delete Todo
DELETE /api/todos/:id

 Authentication Flow
User registers → data saved in users.json
User logs in → server validates credentials
JWT token generated
Token stored in browser (localStorage)
Token sent in headers for protected routes
 Future Improvements
 Replace JSON storage with MongoDB
 Add refresh tokens
 Improve UI with React
 Make fully responsive UI
 Deploy backend & frontend online
Author

Aryan
Full Stack Developer 
