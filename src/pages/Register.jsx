import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister(e) {
    e.preventDefault();

    const { data, error } = await supabase.auth.signUp({
      email,
      password
    });

    if (error) {
      console.error("Register error:", error);
      alert(error.message);
      return;
    }

    alert("Account aangemaakt! Check je e-mail.");
    navigate("/login");
  }

  return (
    <div className="auth-card">
      <h2>Account aanmaken</h2>

      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Wachtwoord"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="auth-btn">
          Account aanmaken
        </button>
      </form>

      {/* Subtiele link zoals op login */}
      <div
        style={{
          marginTop: "12px",
          fontSize: "0.9rem",
          textAlign: "center",
          opacity: 0.8,
          cursor: "pointer"
        }}
        onClick={() => navigate("/login")}
      >
        Al een account? Log in
      </div>
    </div>
  );
}
