import { NavLink } from "react-router-dom";
import "../styles/navbar.css";

export default function NavBar() {
  return (
    <div className="glass-nav-container">
      <div className="glass-nav">

        <NavLink to="/overview" className="glass-item">
          <span className="glass-icon">🏠</span>
        </NavLink>

        <NavLink to="/add" className="glass-item">
          <span className="glass-icon">➕</span>
        </NavLink>

        <NavLink to="/profile" className="glass-item">
          <span className="glass-icon">👤</span>
        </NavLink>

      </div>
    </div>
  );
}
