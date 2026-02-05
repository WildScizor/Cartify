# Cartify Project Dependencies Explained

This document explains all the dependencies used in the Cartify project, which is a full-stack e-commerce application with a React frontend and Express backend.

---

## 📦 Server Dependencies (`cartify-main/server/package.json`)

### Production Dependencies

#### 1. **express** (^5.1.0)
- **Purpose**: Web application framework for Node.js
- **Usage**: Creates the REST API server that handles HTTP requests
- **Why needed**: Core framework for building the backend API endpoints

#### 2. **mongoose** (^8.18.2)
- **Purpose**: MongoDB object modeling library for Node.js
- **Usage**: Connects to MongoDB database and defines data models (User, Item, Cart)
- **Why needed**: Provides schema validation, middleware, and easy database operations for MongoDB

#### 3. **bcryptjs** (^3.0.2)
- **Purpose**: Library for hashing passwords
- **Usage**: Securely hashes user passwords before storing them in the database
- **Why needed**: Security - never store plain text passwords; hash them for protection

#### 4. **jsonwebtoken** (^9.0.2)
- **Purpose**: Implementation of JSON Web Tokens (JWT)
- **Usage**: Creates and verifies authentication tokens for logged-in users
- **Why needed**: User authentication - tokens are used to verify user identity on protected routes

#### 5. **cors** (^2.8.5)
- **Purpose**: Cross-Origin Resource Sharing middleware
- **Usage**: Allows the React frontend (running on different port) to make requests to the backend
- **Why needed**: By default, browsers block requests from different origins (ports/domains); CORS enables this

#### 6. **dotenv** (^17.2.2)
- **Purpose**: Loads environment variables from a `.env` file
- **Usage**: Stores sensitive configuration like database URLs, JWT secrets, ports
- **Why needed**: Security and configuration management - keeps secrets out of code

#### 7. **lowdb** (^6.0.1)
- **Purpose**: Small JSON database for Node.js
- **Usage**: Alternative lightweight database option (fallback if MongoDB not available)
- **Why needed**: Simple local storage option for development/testing

#### 8. **nanoid** (^5.1.5)
- **Purpose**: Small, secure, URL-friendly unique string ID generator
- **Usage**: Generates unique IDs for items, users, or other entities
- **Why needed**: Creates unique identifiers that are shorter and URL-safe compared to UUIDs

---

### Development Dependencies

#### 9. **nodemon** (^3.1.10)
- **Purpose**: Automatically restarts the server when code changes
- **Usage**: Used in `npm run dev` script
- **Why needed**: Development productivity - no need to manually restart server after every change

---

## 🎨 Client Dependencies (`cartify-main/client/package.json`)

### Production Dependencies

#### 1. **react** (^18.3.1)
- **Purpose**: JavaScript library for building user interfaces
- **Usage**: Core framework for building the frontend components
- **Why needed**: Creates interactive UI components and manages component state

#### 2. **react-dom** (^18.3.1)
- **Purpose**: React renderer for the DOM
- **Usage**: Renders React components to the browser DOM
- **Why needed**: Bridges React components to the actual HTML DOM in the browser

#### 3. **react-router-dom** (^7.8.2)
- **Purpose**: Routing library for React applications
- **Usage**: Handles navigation between pages (Login, Signup, Products, Cart, Checkout)
- **Why needed**: Single Page Application (SPA) routing - changes URL and renders different components

#### 4. **axios** (^1.11.0)
- **Purpose**: HTTP client library for making API requests
- **Usage**: Sends requests to the backend API (login, fetch items, cart operations)
- **Why needed**: Communicates with the Express backend server to get/send data

#### 5. **zustand** (^5.0.8)
- **Purpose**: Small, fast, and scalable state management library
- **Usage**: Manages global application state (user authentication, cart, currency preferences)
- **Why needed**: Centralized state management - shares data between components without prop drilling

---

### Development Dependencies

#### 6. **vite** (^7.1.2)
- **Purpose**: Next-generation frontend build tool
- **Usage**: Development server, bundler, and build tool for the React app
- **Why needed**: Fast development server with hot module replacement (HMR) - instant updates

#### 7. **typescript** (~5.8.3)
- **Purpose**: Typed superset of JavaScript
- **Usage**: Adds type checking to JavaScript code
- **Why needed**: Catches errors early, improves code quality and developer experience

#### 8. **tailwindcss** (^4.1.13)
- **Purpose**: Utility-first CSS framework
- **Usage**: Styling the UI with utility classes
- **Why needed**: Rapid UI development with pre-built utility classes instead of writing custom CSS

#### 9. **@tailwindcss/postcss** (^4.1.13)
- **Purpose**: PostCSS plugin for Tailwind CSS
- **Usage**: Processes Tailwind CSS in the build pipeline
- **Why needed**: Required for Tailwind CSS to work with the build system

#### 10. **autoprefixer** (^10.4.21)
- **Purpose**: PostCSS plugin that adds vendor prefixes to CSS
- **Usage**: Automatically adds browser prefixes (e.g., `-webkit-`, `-moz-`) to CSS
- **Why needed**: Ensures CSS works across different browsers

#### 11. **postcss** (^8.5.6)
- **Purpose**: Tool for transforming CSS with JavaScript plugins
- **Usage**: Processes CSS through plugins (Tailwind, Autoprefixer)
- **Why needed**: Build tool that runs CSS transformations

#### 12. **daisyui** (^5.1.10)
- **Purpose**: Component library for Tailwind CSS
- **Usage**: Pre-built UI components (buttons, cards, modals) styled with Tailwind
- **Why needed**: Speeds up UI development with ready-made, customizable components

---

## 🔄 Dependency Relationships

### How They Work Together:

1. **Frontend (React) → Backend (Express)**:
   - React app uses `axios` to make HTTP requests
   - Express server handles these requests and responds with JSON data

2. **Authentication Flow**:
   - User logs in → `axios` sends credentials → Express validates → `bcryptjs` checks password → `jsonwebtoken` creates token → React stores token in `zustand` state

3. **Database Flow**:
   - Express receives request → `mongoose` queries MongoDB → Returns data → React displays it

4. **Routing**:
   - User navigates → `react-router-dom` changes URL → Renders appropriate React component

5. **Styling**:
   - Components use Tailwind classes → `postcss` processes → `tailwindcss` generates CSS → Browser displays styled UI

---

## 📋 Quick Reference

| Dependency | Category | Purpose |
|------------|----------|---------|
| express | Server (Core) | Web framework |
| mongoose | Server (Database) | MongoDB ORM |
| bcryptjs | Server (Security) | Password hashing |
| jsonwebtoken | Server (Security) | Authentication tokens |
| cors | Server (Middleware) | Cross-origin requests |
| react | Client (Core) | UI library |
| react-router-dom | Client (Routing) | Navigation |
| axios | Client (HTTP) | API requests |
| zustand | Client (State) | State management |
| tailwindcss | Client (Styling) | CSS framework |
| vite | Client (Build) | Build tool & dev server |

---

## 🚀 To Run the Project

1. **Install Server Dependencies**:
   ```bash
   cd cartify-main/server
   npm install
   ```

2. **Install Client Dependencies**:
   ```bash
   cd cartify-main/client
   npm install
   ```

3. **Start Server** (requires MongoDB):
   ```bash
   cd cartify-main/server
   npm run dev  # Runs on port 4000
   ```

4. **Start Client**:
   ```bash
   cd cartify-main/client
   npm run dev  # Runs on port 5173
   ```
