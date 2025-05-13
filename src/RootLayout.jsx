// src/components/common/RootLayout.jsx
import { Outlet, NavLink } from "react-router-dom";

export default function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white p-4">
        <nav className="flex gap-4">
          <NavLink to="/" className="hover:underline">
            Home
          </NavLink>
          <NavLink to="/about" className="hover:underline">
            About
          </NavLink>
        </nav>
      </header>

      <main className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </main>

      <footer className="bg-blue-600 text-white p-4 text-center">
        &copy; 2025 My App
      </footer>
    </div>
  );
}
