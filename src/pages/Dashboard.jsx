import NavBar from "../components/NavBar";

export default function Dashboard() {
  return (
    <div className="page">
      <h1 className="balance">€ 0,00</h1>

      <div className="transactions">
        <div className="transaction">
          <span>Voorbeeld</span>
          <span>- € 0,00</span>
        </div>
      </div>

      <NavBar />
    </div>
  );
}
