const API = "http://localhost:5000/api";
console.log("script loaded");

let token = localStorage.getItem("token");

// =========================
// REGISTER
// =========================
async function register() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const res = await fetch(`${API}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });

  const data = await res.json();
  alert(data.message);
}

// =========================
// LOGIN
// =========================
async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  console.log("LOGIN CLICKED");

  try {
    const res = await fetch(`${API}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    console.log("LOGIN RESPONSE:", data);

    if (!res.ok) {
      alert(data.message || "Login failed");
      return;
    }

    if (data.token) {
      token = data.token;
      localStorage.setItem("token", token);

      document.getElementById("auth").style.display = "none";
      document.getElementById("todoApp").style.display = "block";

      loadTodos();
    }

  } catch (err) {
    console.log("ERROR:", err);
    alert("Server not responding");
  }
}

// =========================
// LOGOUT
// =========================
function logout() {
  localStorage.removeItem("token");
  token = null;

  document.getElementById("auth").style.display = "block";
  document.getElementById("todoApp").style.display = "none";
}

// =========================
// ADD TODO
// =========================
async function addTodo() {
  const title = document.getElementById("todoInput").value;

  await fetch(`${API}/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ title })
  });

  document.getElementById("todoInput").value = "";
  loadTodos();
}

// =========================
// LOAD TODOS
// =========================
async function loadTodos() {
  const res = await fetch(`${API}/todos`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });

  const todos = await res.json();

  const list = document.getElementById("todoList");
  list.innerHTML = "";

  todos.forEach(todo => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${todo.title}
      <button onclick="deleteTodo('${todo.id}')">❌</button>
    `;
    list.appendChild(li);
  });
}

// =========================
// DELETE TODO
// =========================
async function deleteTodo(id) {
  await fetch(`${API}/todos/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });

  loadTodos();
}

// AUTO LOAD
if (token) {
  document.getElementById("auth").style.display = "none";
  document.getElementById("todoApp").style.display = "block";
  loadTodos();
}