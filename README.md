# 📁 Cyoa App

_A brief one-liner describing your project._

> Example: A full-stack portfolio web app showcasing my projects, built with React, Express, and a REST API.

---

## 🚀 Live Demo

👉 [View it here](https://bcruzcyoa.netlify.app)

---

## 🛠️ Tech Stack

**Frontend:**
- React/Vite
- JavaScript  
- Fetch API
- Tailwind CSS

**Backend:**  
- Node.js  
- Express
- JavaScript
- REST API  

**Other:**  
- Netlify & Render hosting

---

## 📂 Project Structure

/cyoa-front -> React frontend
/cyoa-server -> Express/REST backend

## 💡 Features

- Responsive and accessible UI built with React  
- RESTful API with Express   

---

## ⚙️ Installation

1️⃣ **Clone the repository**
```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

2️⃣ **Install dependencies**
```bash
# Install Concurrently in root directory
npm install

# Install backend dependencies
cd cyoa-server
npm install

# Install frontend dependencies
cd cyoa-front
npm install
```

3️⃣ Run the app
```bash
# Run backend
cd cyoa-server
npm run dev

# Run frontend
cd cyoa-front
npm start
# or run in development mode with nodemon
npm run dev

# Run both
# Must be in the root directory
npm run dev
```

## 🧪 Api Endpoints
| Method | Endpoint            | Description          |
| ------ | ------------------- | -------------------- |
| GET    | `/api/projects`     | Get all projects     |
| POST   | `/api/projects`     | Create a new project |
| PUT    | `/api/projects/:id` | Update a project     |
| DELETE | `/api/projects/:id` | Delete a project     |
