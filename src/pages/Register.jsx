import { useState } from "react";
import { supabase } from "../supabaseClient";
import { Link, useNavigate } from "react-router-dom";
import "../styles/auth.css";

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeat, setRepeat] = useState("");

  async function signUp() {
    if (password !== repeat) {
      alert("Wachtwoorden komen niet overeen");
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Account aangemaakt! Check je e-mail.");
      navigate("/login");
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Create Account</h1>

        <input
          className="auth-input"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="auth-input"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          className="auth-input"
          placeholder="Repeat password"
          type="password"
          value={repeat}
          onChange={(e) => setRepeat(e.target.value)}
        />

        <button className="auth-button" onClick={signUp}>
          Sign Up
        </button>

        <p className="auth-link">
          Al een account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
