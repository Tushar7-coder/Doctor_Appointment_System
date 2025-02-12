import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../../assets/images/logo.png";
import userImg from "../../assets/images/avatar-icon.png";
import backGroundimage from "../../assets/images/mask.png";
import { toast } from "react-toastify";
import { useAuth } from "../../context/authContext"; // Use safe custom hook

const navLinks = [
  { path: "/home", display: "Home" },
  { path: "/doctors", display: "Find a Doctor" },
  { path: "/services", display: "Services" },
  { path: "/contact", display: "Contact" },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, role, token, dispatch } = useAuth(); // Use safe hook

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    toast.success("Logged out successfully!");
    setMenuOpen(false); // Close menu after logout
  };

  return (
    <header
      className="w-full bg-white shadow-md z-50"
      style={{
        backgroundImage: backGroundimage ? `url(${backGroundimage})` : "none",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="container mx-auto px-5 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="Logo" className="w-36" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          {navLinks.map((link, index) => (
            <NavLink
              key={index}
              to={link.path}
              className={({ isActive }) =>
                isActive
                  ? "text-blue-500 font-semibold"
                  : "text-gray-800 font-medium hover:text-blue-500"
              }
            >
              {link.display}
            </NavLink>
          ))}
        </nav>

        {/* User Profile & Login/Logout */}
        <div className="hidden md:flex items-center space-x-4">
          {token && (
            <>
              <Link to={role === "doctor" ? "/doctors/profile/me" : "/users/profile/me"}>
                <img src={user?.photo || userImg} alt="User" className="w-9 h-9 rounded-full" />
              </Link>
              <h1 className="text-gray-800 font-medium">{user?.name}</h1>
            </>
          )}

          {token ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600"
            >
              Logout
            </button>
          ) : (
            <Link to="/login">
              <button className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600">
                Login
              </button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden block text-gray-800" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white shadow-md">
          <nav className="flex flex-col space-y-4 py-4 px-5">
            {navLinks.map((link, index) => (
              <NavLink
                key={index}
                to={link.path}
                className={({ isActive }) =>
                  isActive ? "text-blue-500 font-semibold" : "text-gray-800 font-medium hover:text-blue-500"
                }
                onClick={() => setMenuOpen(false)}
              >
                {link.display}
              </NavLink>
            ))}
          </nav>
          <div className="flex flex-col items-center py-4">
            {token && (
              <Link to={role === "doctor" ? "/doctors/profile/me" : "/users/profile/me"}>
                <img src={user?.photo || userImg} alt="User" className="w-9 h-9 rounded-full mb-3" />
              </Link>
            )}
            {token ? (
              <button
                className="bg-red-500 text-white font-semibold px-5 py-2 rounded-lg hover:bg-red-600 transition"
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <Link to="/login">
                <button
                  className="bg-blue-500 text-white font-semibold px-5 py-2 rounded-lg hover:bg-blue-600 transition"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
    
  );
};

export default Header;
