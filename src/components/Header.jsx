import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const Header = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const pages = [
    { name: "Home", path: "/" },
    { name: "Properties", path: "/properties" },
    { name: "Locations", path: "/locations" },
  ];

  const settings = [
    { name: "Profile", path: "/profile" },
    { name: "My Properties", path: "/my-properties" },
    { name: "Bookmarks", path: "/bookmarks" },
    { name: "Logout", path: "/" },
  ];

  const handleMenuItemClick = async (path, name) => {
    setUserMenuOpen(false);
    setMenuOpen(false);

    if (name === "Logout") {
      await signOut();
      navigate("/login");
      return;
    }

    navigate(path);
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-gray-800">
          PropertyFinder
        </Link>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-600 focus:outline-none"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex space-x-6">
          {pages.map((page) => (
            <Link
              key={page.name}
              to={page.path}
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              {page.name}
            </Link>
          ))}
        </nav>

        {/* User avatar/menu */}
        {user && (
          <div className="relative ml-4">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-800 font-semibold focus:outline-none"
            >
              {user.firstName?.charAt(0).toUpperCase() || "U"}
            </button>

            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-50">
                {settings.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => handleMenuItemClick(item.path, item.name)}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-gray-700"
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          {pages.map((page) => (
            <Link
              key={page.name}
              to={page.path}
              onClick={() => setMenuOpen(false)}
              className="block text-gray-700 hover:text-blue-600 font-medium"
            >
              {page.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
