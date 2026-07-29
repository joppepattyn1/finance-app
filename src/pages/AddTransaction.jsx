import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import "../styles/addtransaction.css";

export default function AddTransaction() {
  const [amount, setAmount] = useState("");
  const [isEditingAmount, setIsEditingAmount] = useState(false);

  const [type, setType] = useState("expense"); // income | expense
  const [category, setCategory] = useState("");
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);

  const [note, setNote] = useState("");
  const [date, setDate] = useState("");

  // ===== LOAD DATE FROM URL =====
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const d = Number(params.get("day"));

    if (!isNaN(d)) {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth();
      const localDate = new Date(year, month, d);
      setDate(localDate.toISOString().split("T")[0]);
    }
  }, []);

  // ===== SAVE TRANSACTION =====
  async function saveTransaction() {
    const { data: userData } = await supabase.auth.getUser();
    const user = userData?.user;

    if (!user) {
      alert("Geen gebruiker gevonden.");
      return;
    }

    if (!date) {
      alert("Kies een datum.");
      return;
    }

    if (amount === "" || isNaN(Number(amount))) {
      alert("Voer een geldig bedrag in.");
      return;
    }

    const chosenDate = new Date(date);

    const finalAmount =
      type === "income"
        ? Math.abs(Number(amount))
        : -Math.abs(Number(amount));

    const { error } = await supabase
      .from("transactions")
      .insert({
        user_id: user.id,
        title: category || "Onbekend",
        amount: finalAmount,
        note,
        created_at: chosenDate.toISOString(),
      });

    if (error) {
      alert("Kon niet opslaan: " + error.message);
      return;
    }

    window.location.href = "/overview";
  }

  return (
    <div className="add-page">

      {/* ===== INLINE AMOUNT INPUT ===== */}
      <div className="amount-wrapper">
        {isEditingAmount ? (
          <input
            type="number"
            className="amount-inline-input"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            onBlur={() => setIsEditingAmount(false)}
            autoFocus
          />
        ) : (
          <div
            className="amount-display"
            onClick={() => setIsEditingAmount(true)}
          >
            <span className="amount-big">
              {amount === "" ? "0" : amount}
            </span>
            <span className="amount-euro">€</span>
          </div>
        )}
      </div>

      {/* ===== TYPE TOGGLE ===== */}
      <div className="type-toggle">
        <button
          className={type === "income" ? "active" : ""}
          onClick={() => setType("income")}
        >
          Inkomen
        </button>

        <button
          className={type === "expense" ? "active" : ""}
          onClick={() => setType("expense")}
        >
          Uitgave
        </button>
      </div>

      {/* ===== CATEGORY SELECTOR ===== */}
      <button
        className="category-btn"
        onClick={() => setShowCategoryMenu(true)}
      >
        {category ? category : "Categorie kiezen"}
      </button>

      {/* ===== BOTTOM SHEET MENU ===== */}
      {showCategoryMenu && (
        <div className="category-sheet">
          <div className="sheet-inner">

            <h3>Categorie</h3>

            {[
              "Boodschappen",
              "Horeca",
              "Vervoer",
              "Abonnementen",
              "Vrije tijd",
              "Overig",
            ].map((c) => (
              <button
                key={c}
                className="category-option"
                onClick={() => {
                  setCategory(c);
                  setShowCategoryMenu(false);
                }}
              >
                {c}
              </button>
            ))}

            <button
              className="sheet-close"
              onClick={() => setShowCategoryMenu(false)}
            >
              Sluiten
            </button>
          </div>
        </div>
      )}

      {/* ===== NOTE ===== */}
      <textarea
        className="note-input"
        placeholder="Notitie (optioneel)"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />

      {/* ===== DATE ===== */}
      <label className="date-label">Datum</label>
      <input
        type="date"
        className="date-input"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      {/* ===== SAVE BUTTON ===== */}
      <button className="save-btn" onClick={saveTransaction}>
        Opslaan
      </button>
    </div>
  );
}
