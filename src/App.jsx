import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Overview from "./pages/Overview";
import AddTransaction from "./pages/AddTransaction";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import NavBar from "./components/NavBar";
import "./styles/theme.css";

import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

// AuthGuard die NOOIT een refresh-loop veroorzaakt
function AuthGuard({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    // Luistert naar login / logout / token refresh
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
      }
    );

    // Eerste load
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  // Nog aan het laden → niets doen
  if (user === undefined) return null;

  // Niet ingelogd → naar login
  if (user === null) {
    navigate("/login", { replace: true });
    return null;
  }

  return children;
}

export default function App() {
  return (
    <Router>
      <div className="app-container">

        <Routes>
          {/* LOGIN MAG ALTIJD */}
          <Route path="/login" element={<Login />} />

          {/* BEVEILIGDE PAGINA'S */}
          <Route
            path="/"
            element={
              <AuthGuard>
                <Overview />
              </AuthGuard>
            }
          />

          <Route
            path="/overview"
            element={
              <AuthGuard>
                <Overview />
              </AuthGuard>
            }
          />

          <Route
            path="/add"
            element={
              <AuthGuard>
                <AddTransaction />
              </AuthGuard>
            }
          />

          <Route
            path="/profile"
            element={
              <AuthGuard>
                <Profile />
              </AuthGuard>
            }
          />
        </Routes>

        {/* NAVBAR ALLEEN ALS JE INGLOGD BENT */}
        <AuthGuard>
          <NavBar />
        </AuthGuard>

      </div>
    </Router>
  );
}
