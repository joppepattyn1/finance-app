import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <div className="navbar">
      <NavLink to="/overview">
        {({ isActive }) => (
          <span className={`nav-icon ${isActive ? "active" : ""}`}>📊</span>
        )}
      </NavLink>

      <NavLink to="/add">
        {({ isActive }) => (
          <span className={`nav-icon ${isActive ? "active" : ""}`}>➕</span>
        )}
      </NavLink>

      <NavLink to="/profile">
        {({ isActive }) => (
          <span className={`nav-icon ${isActive ? "active" : ""}`}>👤</span>
        )}
      </NavLink>
    </div>
  );
}
