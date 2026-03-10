# 🚀 CodeLeap Network - Engineering Test

A high-performance, scalable, and type-safe CRUD application built for the CodeLeap recruitment process. This project demonstrates modern frontend engineering practices, focusing on state management, component architecture, and exceptional user experience.

---

## 🔍 Overview

The **CodeLeap Network** is a social networking platform where users can join by providing a username and interact by creating, editing, and deleting posts. The application ensures a seamless experience with real-time-like updates and persistent authentication.

### Key Features

- **Persistent Authentication**: Seamless signup with local storage persistence.
- **Full CRUD Operations**: Create, Read, Update, and Delete posts with instant UI feedback.
- **Advanced State Management**: Powered by TanStack Query for robust caching and synchronization.
- **Context-Aware Actions**: Edit and Delete permissions are strictly enforced for the post owner.
- **Responsive Design**: Optimized for both desktop and mobile viewports.
- **Visual Feedback**: Loading states, success/error notifications, and interactive modals.

---

## 🛠️ Tech Stack

| Technology              | Purpose                                                          |
| :---------------------- | :--------------------------------------------------------------- |
| **React 19**            | Modern UI development with the latest features.                  |
| **TypeScript**          | Static typing for enhanced reliability and developer experience. |
| **TanStack Query (v5)** | Industry-standard server state management and caching.           |
| **Tailwind CSS (v4)**   | Utility-first styling for rapid and consistent UI development.   |
| **React Router 7**      | Declarative routing and layout management.                       |
| **Vitest & RTL**        | Unit testing for core components to ensure stability.            |
| **Sonner**              | Elegant, non-intrusive toast notifications.                      |
| **Phosphor Icons**      | Consistent and flexible iconography.                             |

---

## 🏗️ Architecture & Best Practices

This project follows a **Feature-Based Architecture**, ensuring high maintainability and clear separation of concerns:

- **Modular Features**: Logic for `auth` and `blog` is encapsulated within their respective directories.
- **Custom Hooks**: Business logic and data fetching are abstracted into reusable hooks (`usePosts`, `useUser`, etc.).
- **Optimistic Updates**: UI updates immediately upon user action, with rollback capabilities on failure.
- **Component Reusability**: Atomic UI components (`Button`, `Input`) ensure design consistency across the app.
- **Type Safety**: End-to-end typing for API responses and component props using TypeScript interfaces.

---

## 🚦 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or pnpm

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/allysrdev/codeleap-react-code-test.git
   cd codeleap-react-code-test
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the development server:**

   ```bash
   npm run dev
   ```

4. **Run tests:**
   ```bash
   npm run test
   ```

---

## 🧪 Testing

Quality is a priority. The project includes unit tests for core components and forms to prevent regressions and ensure functional correctness.

```bash
# Execute all tests
npm run test

# Run tests in UI mode
npx vitest --ui
```

---

## 👨‍💻 Author

**Ally Santana**

- GitHub: [@allysrdev](https://github.com/allysrdev)
- LinkedIn: [Allyson Santana](https://linkedin.com/in/allysantanadev)

---

> "Developed with a focus on clean code, scalability, and user-centric design."
