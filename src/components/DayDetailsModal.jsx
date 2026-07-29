import { supabase } from "../supabaseClient";

export default function DayDetailsModal({ day, transactions, onClose, onDelete }) {

  async function deleteTransaction(id) {
    console.log("Deleting ID:", id);

    // Verwijder uit Supabase
    const { error } = await supabase
      .from("transactions")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Delete error:", error);
      return;
    }

    // Laat Overview nieuwe data ophalen (update modal live)
    if (onDelete) onDelete();
  }

  return (
    <div className="modal-bg">
      <div className="modal-card">
        <h2 className="modal-title">Dag {day}</h2>

        <button
          className="add-btn"
          onClick={() => (window.location.href = `/add?day=${day}`)}
        >
          + Transactie toevoegen
        </button>

        {transactions.length === 0 && (
          <p className="modal-empty">Geen transacties op deze dag</p>
        )}

        {transactions.map((t) => (
          <div key={t.id} className="modal-item">
            <div className="modal-item-left">
              <span className="modal-item-title">{t.title}</span>
              <small className="modal-item-date">
                {new Date(t.created_at).toLocaleTimeString("nl-BE")}
              </small>
            </div>

            <div className="modal-item-right">
              <span className={t.amount > 0 ? "pos" : "neg"}>
                € {t.amount}
              </span>

              <button
                className="delete-btn"
                onClick={() => deleteTransaction(t.id)}
              >
                ✕
              </button>
            </div>
          </div>
        ))}

        <button className="close-btn" onClick={onClose}>
          Sluiten
        </button>
      </div>
    </div>
  );
}
