export default function RecentChangesList({ changes }) {
  // Bereken inkomsten en uitgaven
  const income = changes
    .filter((c) => c.amount > 0)
    .reduce((sum, c) => sum + Number(c.amount), 0);

  const expense = changes
    .filter((c) => c.amount < 0)
    .reduce((sum, c) => sum + Number(c.amount), 0);

  const result = income + expense;

  return (
    <div className="recent">
      <h2 className="section-title">Maandberekening</h2>

      <div className="recent-item">
        <span className="recent-title">Inkomsten</span>
        <span className="pos">€ {income}</span>
      </div>

      <div className="recent-item">
        <span className="recent-title">Uitgaven</span>
        <span className="neg">€ {expense}</span>
      </div>

      <div className="recent-item total-result">
        <span className="recent-title">Resultaat</span>
        <span className={result >= 0 ? "pos" : "neg"}>€ {result}</span>
      </div>
    </div>
  );
}
