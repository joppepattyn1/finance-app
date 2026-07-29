import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import NavBar from "../components/NavBar";
import "../styles/theme.css";


export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    loadTransactions();
  }, []);

  async function loadTransactions() {
    // ingelogde user ophalen
    const { data: userData } = await supabase.auth.getUser();
    const user = userData?.user;

    if (!user) {
      console.error("Not logged in");
      return;
    }

    // transacties ophalen van deze user
    const { data, error } = await supabase
      .from("transactions")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    setTransactions(data);

    // saldo berekenen
    const total = data.reduce((sum, t) => sum + Number(t.amount), 0);
    setBalance(total);
  }

  return (
    <div className="page">
      <h1 className="balance">€ {balance.toFixed(2)}</h1>

      <div className="transactions">
        {transactions.length === 0 && (
          <div className="transaction">
            <span>Geen transacties</span>
            <span>€ 0,00</span>
          </div>
        )}

        {transactions.map((t) => (
          <div key={t.id} className="transaction">
            <span>{t.title}</span>
            <span>
              {t.amount > 0 ? "+" : ""}
              € {Number(t.amount).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      <NavBar />
    </div>
  );
}
