# Modern SaaS To-Do Application (MERN Stack)

A production-grade, feature-based **MERN Stack To-Do List Application** built with modern SaaS architecture, automatic category detection, responsive design, and Lucide icons.

![SaaS To-Do Application Architecture](https://img.shields.io/badge/Stack-MongoDB%20%7C%20Express%20%7C%20React%20%7C%20Node.js-blue)
![Icons](https://img.shields.io/badge/Icons-Lucide--React-purple)
![Architecture](https://img.shields.io/badge/Architecture-Feature--Based%20Vertical%20Slice-emerald)

---

## 🌟 Key Features

1. **Feature-Based SaaS Architecture**:
   - Single unified repository (no awkward split into separate disconnected client and server folders).
   - Domain-driven vertical slice in `src/features/tasks/` encapsulating both backend models, controllers, routes, and frontend components, hooks, and utilities.

2. **100% Pure Automatic Category Detection**:
   - When typing in the task title or description (e.g., *"Learn React"*, *"Gym workout"*, *"Read a book"*, *"Buy milk"*, *"Prepare for interview"*), the system automatically analyzes keywords and assigns the category (**Tech**, **Project**, **Fitness**, **Study**, **Shopping**, **Career**, **Personal**, or **General**) with its matching Lucide icon.
   - Clean, frictionless workflow without manual dropdowns or category selection grids.

3. **Complete CRUD Operations with MongoDB**:
   - Create new tasks with title, description, category, and status.
   - Read and filter all tasks (All, Pending, Completed, or search by keyword).
   - Update existing tasks via an edit modal.
   - Toggle status between Pending and Completed with one click.
   - Delete tasks with safe confirmation dialog.
   - Fully persisted in MongoDB Atlas.

4. **UI Design Matching the Reference Image**:
   - Left Sidebar with "My Tasks" branding, active tab indicators, task counter badges, and Light/Dark mode switcher.
   - Top Header with greeting, dynamic date badge ("Today <Date>").
   - Filter pills (`All Tasks (6)`, `Pending (3)`, `Completed (3)`) and real-time search input.
   - 3-column card grid with category badges, 3-dots menu, edit/delete actions, and status toggles.
   - Strictly uses **Lucide icons** (`lucide-react`) — zero AI icons or emoji dependencies.

---

## 📁 Project Architecture & File Directory

```
do/
├── .env                              # Environment variables (MongoDB URI, Port)
├── .env.example                      # Template for environment configuration
├── index.html                        # Application HTML entry point
├── package.json                      # Unified dependencies & scripts
├── vite.config.js                    # Vite bundler configuration & /api proxy
├── README.md                         # Documentation & API testing guide
└── src/
    ├── app/                          # Core App Shell & Bootstrapper
    │   ├── App.jsx                   # Main React dashboard layout
    │   ├── App.css                   # Layout styles
    │   └── main.jsx                  # React DOM root with ThemeProvider
    │
    ├── features/                     # Feature Modules (Vertical Slice SaaS Pattern)
    │   └── tasks/                    # Tasks Domain Module
    │       ├── server/               # Backend Domain Logic
    │       │   ├── task.model.js     # Mongoose Task schema & model
    │       │   ├── task.service.js   # DB queries, business logic & starter seed
    │       │   ├── task.controller.js# Express HTTP controllers & validation
    │       │   └── task.routes.js    # Express REST route endpoints (/api/tasks)
    │       │
    │       └── client/               # Frontend Domain Logic & UI
    │           ├── api/
    │           │   └── taskApi.js    # Axios client for REST API communication
    │           ├── hooks/
    │           │   └── useTasks.js   # State management, filtering & CRUD operations
    │           ├── utils/
    │           │   └── categoryDetector.js # Smart category auto-detection logic
    │           └── components/
    │               ├── TaskCard.jsx      # Task card component
    │               ├── TaskCard.css      # Card styles matching reference UI
    │               ├── TaskForm.jsx      # New task input form with category badge
    │               ├── TaskForm.css      # Form styles
    │               ├── TaskFilters.jsx   # Filter pills and search bar
    │               ├── TaskFilters.css   # Filter styles
    │               ├── TaskList.jsx      # 3-column grid & loading skeletons
    │               ├── TaskList.css      # Grid layout styles
    │               ├── TaskEditModal.jsx # Modal dialog for editing tasks
    │               ├── TaskEditModal.css # Edit modal styles
    │               ├── TaskEmptyState.jsx# Empty state display
    │               └── TaskEmptyState.css
    │
    ├── server/                       # Backend Infrastructure
    │   ├── server.js                 # Express server entry point
    │   ├── config/
    │   │   └── database.js           # Mongoose MongoDB connection handler
    │   └── middleware/
    │       └── errorHandler.js       # Centralized error handler
    │
    └── shared/                       # Shared UI and Utilities
        ├── components/
        │   ├── Sidebar.jsx           # Sidebar navigation & theme toggle
        │   ├── Sidebar.css           # Sidebar styles
        │   ├── Header.jsx            # Top header with date badge
        │   ├── Header.css            # Header styles
        │   ├── ConfirmModal.jsx      # Safe delete confirmation modal
        │   ├── ConfirmModal.css      # Confirm dialog styles
        │   └── LucideIcon.jsx        # Lucide icon mapping utility
        ├── theme/
        │   └── ThemeContext.jsx      # Light / Dark mode context
        └── styles/
            ├── variables.css         # CSS design tokens (colors, radii, shadows)
            └── index.css             # Global styles and resets
```

---

## 🛠️ Purpose of Important Files

| File | Purpose |
| :--- | :--- |
| `src/server/server.js` | Express app initialization, CORS, JSON parsing, API request logging, and router registration. |
| `src/server/config/database.js` | Connects Mongoose to the MongoDB cluster specified in `MONGODB_URI`. |
| `src/features/tasks/server/task.model.js` | Defines the Mongoose Task schema (`title`, `description`, `category`, `completed`, `createdAt`). |
| `src/features/tasks/server/task.controller.js` | Handles HTTP request validation, error responses, and delegates to service. |
| `src/features/tasks/server/task.routes.js` | Maps REST endpoints: `GET`, `POST`, `PUT`, `DELETE /api/tasks`, and `PATCH /:id/toggle`. |
| `src/features/tasks/client/api/taskApi.js` | Axios client configured with base URL `/api` for clean async CRUD API communication. |
| `src/features/tasks/client/utils/categoryDetector.js` | Evaluates task keywords in real time to categorize tasks automatically. |
| `src/features/tasks/client/hooks/useTasks.js` | React custom hook providing reactive state, optimistic updates, search, and category filtering. |
| `src/features/tasks/client/components/TaskCard.jsx` | Card matching the reference screenshot with pastel category icons, status pills, and actions. |
| `src/shared/components/Sidebar.jsx` | Navigation sidebar with counters and light/dark theme switch. |
| `vite.config.js` | Configures Vite React plugin and proxies `/api` requests to the Express backend (`http://localhost:5000`). |

---

## ⚙️ Setup & Installation Instructions

### Prerequisites
- **Node.js** (v18.0.0 or higher)
- **npm** (v9.0.0 or higher)

### 1. Environment Configuration
Create a `.env` file in the root directory (or use the preconfigured one):

```env
PORT=5000
MONGODB_URI=
NODE_ENV=development
```

### 2. Install Dependencies
Run the following command in the project root:

```bash
npm install
```

---

## 🚀 Running the Application Locally

You can run both the Express backend and the Vite React frontend concurrently with a single command:

```bash
npm run dev
```

Or run them individually in separate terminal windows:

### Terminal 1 (Backend Server)
```bash
npm run dev:server
```
*Runs Express on port 5000: `http://localhost:5000`*

### Terminal 2 (Frontend Client)
```bash
npm run dev:client
```
*Runs Vite dev server with proxy to backend: `http://localhost:5173` (or `http://localhost:5174`)*

---

## 🧪 Sample API Requests for Testing

### 1. Get All Tasks
```bash
curl -X GET http://localhost:5000/api/tasks
```

### 2. Create a New Task
```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Build To-Do List App",
    "description": "Create a full-stack To-Do application using MERN stack.",
    "category": "Project",
    "completed": false
  }'
```

### 3. Update a Task
```bash
curl -X PUT http://localhost:5000/api/tasks/<TASK_ID> \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Build Full-Stack MERN App",
    "description": "Production ready SaaS architecture with MongoDB.",
    "completed": true
  }'
```

### 4. Toggle Completed Status
```bash
curl -X PATCH http://localhost:5000/api/tasks/<TASK_ID>/toggle
```

### 5. Delete a Task
```bash
curl -X DELETE http://localhost:5000/api/tasks/<TASK_ID>
```
