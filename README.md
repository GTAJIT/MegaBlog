# Pawlogy

Pawlogy is a modern, full-featured blogging platform built with React, Redux, Appwrite, and TailwindCSS. It allows users to sign up, log in, create, edit, and view blog posts with a beautiful and responsive UI.

## Features
- User authentication (sign up, log in, log out)
- Create, edit, and delete blog posts
- Rich text editor for post content (TinyMCE)
- Responsive design with TailwindCSS
- Appwrite backend for authentication, database, and file storage
- Protected routes for authenticated users

## Tech Stack
- [React](https://react.dev/) 19+
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Appwrite](https://appwrite.io/) (backend)
- [TailwindCSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/) (build tool)
- [TinyMCE](https://www.tiny.cloud/) (rich text editor)
- [React Router v7](https://reactrouter.com/)

## Getting Started

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd Pawlogy
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory and add the following variables:

> **Note:** You must have an [Appwrite](https://appwrite.io/) instance running and configured with the required project, database, collection, and bucket. Obtain a TinyMCE API key from [TinyMCE](https://www.tiny.cloud/).

### 4. Run the development server
```bash
npm run dev
```
The app will be available at [http://localhost:3000](http://localhost:3000).

### 5. Build for production
```bash
npm run build
```
The production-ready files will be in the `dist/` directory.

### 6. Preview the production build
```bash
npm run preview
```

## Available Scripts
- `npm run dev` — Start the development server
- `npm run build` — Build for production
- `npm run preview` — Preview the production build
- `npm run lint` — Run ESLint

## Folder Structure
- `src/` — Main source code
  - `components/` — Reusable UI components
  - `Pages/` — Page components for routing
  - `appwrite/` — Appwrite service and auth logic
  - `conf/` — Configuration files
  - `store/` — Redux store and slices

## License
MIT