export default function AddTransaction() {
  return (
    <div className="page">
      <h1>Add Transaction</h1>
      <input placeholder="Title" />
      <input placeholder="Amount" type="number" />
      <button>Add</button>
    </div>
  );
}
