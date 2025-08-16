📝 React Todo App

A simple Todo List App built with React, Axios, and JSON Server.
It supports adding, editing, deleting, and marking tasks as pending or completed.

🚀 Features

➕ Add new tasks

✏️ Edit tasks (only if not completed)

❌ Delete tasks

✅ Mark tasks as completed (strike-through)

⏳ View pending tasks

📅 View all tasks under Today

📦 Data is stored in a fake REST API using json-server

🛠️ Tech Stack

React + Vite – UI framework & dev server

Axios – HTTP requests

JSON Server – Fake REST API

Concurrently – Run multiple commands in parallel

📂 Project Setup
1. Clone the repo
git clone https://github.com/RuthNyankum/MyToDo.git
cd todo-app

2. Install dependencies
npm install

3. Run the project

Instead of running React and JSON Server separately, you can run both at once using concurrently:

npm run dev


This will:

Start Vite (React app) on 👉 http://localhost:5173

Start JSON Server on 👉 http://localhost:5000

⚙️ JSON Server Setup

Make sure you have a db.json file in the project root:

{
  "tasks": [
    { "id": 1, "text": "Learn React", "completed": false },
    { "id": 2, "text": "Setup JSON Server", "completed": true }
  ]
}



✨ Future Improvements

Add due dates for tasks

Add user authentication

Save tasks by category (work, personal, etc.)

👩‍💻 Author

Made with ❤️ by Ruth
