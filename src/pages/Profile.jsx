import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import "../styles/profile.css";

export default function Profile() {
  const [user, setUser] = useState(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });
  }, []);

  if (user === undefined) return null;

  if (user === null) {
    navigate("/login");
    return null;
  }

  async function logout() {
    await supabase.auth.signOut();
    navigate("/login");
  }

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
