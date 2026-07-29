import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import "../styles/profile.css";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    loadUser();
  }, []);

  async function loadUser() {
    const { data } = await supabase.auth.getUser();
    setUser(data.user);
  }

  async function logout() {
    await supabase.auth.signOut();
    window.location.href = "/login";
  }

  if (!user) return null;

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="avatar">
          {user.email.charAt(0).toUpperCase()}
        </div>
        <h2 className="profile-email">{user.email}</h2>
      </div>

      <div className="profile-section">
        <div className="profile-item">
          <span>Account ID</span>
          <span className="profile-value">{user.id}</span>
        </div>

        <div className="profile-item">
          <span>Verified</span>
          <span className="profile-value">
            {user.email_confirmed_at ? "Yes" : "No"}
          </span>
        </div>
      </div>

      <button className="logout-button" onClick={logout}>
        Log out
      </button>
    </div>
  );
}
