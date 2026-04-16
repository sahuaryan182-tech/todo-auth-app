# 📝 Todo App — Full Stack with JWT Authentication

> A clean, lightweight Full Stack Todo Application built with **Node.js**, **Express**, **JWT Authentication**, and **File System (JSON)** as the database — no external database required.

---

## ✨ Features

- 🔐 **User Registration & Login** with JWT Authentication
- 🔒 **Password hashing** using bcrypt
- 📁 **File System based storage** — JSON files, no database needed
- ✅ **Create, Read, Delete Todos** — user-specific and private
- 🛡️ **Protected API routes** via middleware
- 🎨 **Minimal, clean frontend** built with HTML, CSS & JavaScript
- ⚡ **Lightweight** — runs entirely on Node.js

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Runtime | Node.js |
| Framework | Express.js |
| Authentication | JSON Web Tokens (JWT) |
| Password Security | bcrypt.js |
| Storage | File System (fs module) |
| Frontend | HTML · CSS · JavaScript (Fetch API) |

---

## 📁 Project Structure

```
project-root/
│
├── backend/
│   ├── routes/
│   │   ├── authRoutes.js       # Register & Login endpoints
│   │   └── todoRoutes.js       # CRUD Todo endpoints
│   │
│   ├── middleware/
│   │   └── auth.js             # JWT verification middleware
│   │
│   ├── utils/
│   │   └── fileHandler.js      # JSON read/write helpers
│   │
│   ├── data/
│   │   ├── users.json          # Persisted user data
│   │   └── todos.json          # Persisted todo data
│   │
│   ├── server.js               # Express app entry point
│   └── .env                    # Environment variables
│
├── frontend/
│   ├── index.html              # Main UI
│   ├── style.css               # Styling
│   └── script.js               # API calls & UI logic
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/sahuaryan182-tech/todo-auth-app.git
cd todo-auth-app
```

### 2️⃣ Install Backend Dependencies

```bash
cd backend
npm install
```

### 3️⃣ Configure Environment Variables

Create a `.env` file inside the `backend/` folder:

```env
PORT=5000
JWT_SECRET=your_super_secret_key_here
```

> ⚠️ Never commit your `.env` file. Add it to `.gitignore`.

### 4️⃣ Start the Backend Server

```bash
node server.js
```

Server starts at: `http://localhost:5000`

### 5️⃣ Open the Frontend

Simply open `frontend/index.html` in your browser, or serve it via VS Code Live Server on port `5500`.

---

## 🔌 API Reference

### Auth Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/auth/register` | Register a new user | ❌ |
| `POST` | `/api/auth/login` | Login & receive JWT token | ❌ |

**Register / Login Request Body:**
```json
{
  "username": "aryan",
  "password": "yourpassword"
}
```

**Login Response:**
```json
{
  "token": "<jwt_token>"
}
```

---

### Todo Routes (🔒 Protected)

All todo routes require the `Authorization` header:
```
Authorization: Bearer <your_jwt_token>
```

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/todos` | Fetch all todos for logged-in user |
| `POST` | `/api/todos` | Create a new todo |
| `PUT` | `/api/todos/:id` | Update a todo by ID |
| `DELETE` | `/api/todos/:id` | Delete a todo by ID |

**Create Todo Request Body:**
```json
{
  "title": "Buy groceries"
}
```

---

## 🔐 Authentication Flow

```
User Registers
      │
      ▼
Credentials saved in users.json (password hashed with bcrypt)
      │
      ▼
User Logs In → Server validates credentials
      │
      ▼
JWT Token generated & returned
      │
      ▼
Token stored in browser (localStorage)
      │
      ▼
Token sent in Authorization header for all protected routes
```

---

## 🚀 Future Improvements

- [ ] Replace JSON file storage with **MongoDB** or **PostgreSQL**
- [ ] Add **refresh tokens** for better session management
- [ ] Rebuild frontend with **React**
- [ ] Make UI fully **responsive** (mobile-friendly)
- [ ] Add **Edit / Update** todo functionality in the UI
- [ ] Deploy backend on **Railway** / **Render** and frontend on **Vercel**
- [ ] Add **pagination** for todos
- [ ] Write unit tests with **Jest**

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 👨‍💻 Author

**Aryan Sahu**
Full Stack Developer

GitHub: [sahuaryan182-tech](https://github.com/sahuaryan182-tech)

---

## 📄 License

This project is licensed under the **MIT License** — feel free to use, modify, and distribute.

