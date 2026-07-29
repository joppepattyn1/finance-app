import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation
} from "react-router-dom";

import Overview from "./pages/Overview";
import AddTransaction from "./pages/AddTransaction";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NavBar from "./components/NavBar";

import "./styles/theme.css";

import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

// AuthGuard die login/register NIET blokkeert
function AuthGuard({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
      }
    );

    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  if (user === undefined) return null;

  // Login & Register mogen altijd
  if (location.pathname === "/login" || location.pathname === "/register") {
    return children;
  }

  // Niet ingelogd → redirect naar login
  if (user === null) {
    navigate("/login", { replace: true });
    return null;
  }

  return children;
}

export default function App() {
  return (
    <Router>
      <InnerApp />
    </Router>
  );
}

// InnerApp zit BINNEN Router → geen crash
function InnerApp() {
  const location = useLocation();

  // NavBar verbergen op login/register
  const hideNav =
    location.pathname === "/login" ||
    location.pathname === "/register";

  return (
    <div className="app-container">

      {/* JIJ maakt auth-wrapper mooi gecentreerd in CSS */}
      <div className={hideNav ? "auth-wrapper" : ""}>

        <Routes>
          {/* Open routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Beveiligde routes */}
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

        {/* NavBar alleen tonen als user NIET op login/register zit */}
        {!hideNav && (
          <AuthGuard>
            <NavBar />
          </AuthGuard>
        )}

      </div>
    </div>
  );
}
