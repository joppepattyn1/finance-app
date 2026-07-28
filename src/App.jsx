import { useState } from "react";
import { supabase } from "./supabaseClient";

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  async function signUp() {
    const { data, error } = await supabase.auth.signUp({
      email,
      password
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Account created! Check your email to confirm.");
    }
  }

  async function signIn() {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      alert(error.message);
    } else {
      setUser(data.user);
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Finance App</h1>

      {!user && (
        <>
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button onClick={signUp}>Create Account</button>
          <button onClick={signIn}>Login</button>
        </>
      )}

      {user && (
        <div>
          <h2>Welcome, {user.email}</h2>
        </div>
      )}
    </div>
  );
}
