export default function RecentChangesList({ changes }) {
  return (
    <div className="recent">
      <h2 className="section-title">Recente aanpassingen</h2>

      {changes.length === 0 && (
        <p className="recent-empty">Nog geen recente transacties</p>
      )}

      {changes.map((c) => (
        <div key={c.id} className="recent-item">
          <span className="recent-title">{c.title}</span>
          <span className={c.amount > 0 ? "pos" : "neg"}>
            € {c.amount}
          </span>
        </div>
      ))}
    </div>
  );
}
