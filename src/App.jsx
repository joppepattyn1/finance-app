import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Overview from "./pages/Overview";   // ← nieuwe pagina importeren
import AddTransaction from "./pages/AddTransaction";
import Profile from "./pages/Profile";
import NavBar from "./components/NavBar";
import "./styles/theme.css";

export default function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Overview />} />        {/* ← nieuwe hoofdpagina */}
          <Route path="/overview" element={<Overview />} />{/* ← nieuwe route */}
          <Route path="/add" element={<AddTransaction />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>

        <NavBar />
      </div>
    </Router>
  );
}
