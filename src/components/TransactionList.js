function TransactionList({ transactions, showAll, setShowAll }) {
  const visibleTransactions = showAll ? transactions : transactions.slice(-10);

  const formatTime = (date) => {
    return new Date(date).toLocaleString(); 
  }

  return (
    <>
      <h3>Transactions:</h3>
      <div className="transaction-list">
        <ul>
          {visibleTransactions.map((t, index) => (
            <li 
              key={index} 
              style={{ color: t.type === "deposit" ? "green" : "red" }}
            >
              {t.type === "deposit" ? "Deposited" : "Withdrew"}: ${t.amount} 
              <span style={{ fontSize: '12px', color: '#555', marginLeft: '5px' }}>
                ({formatTime(t.time)})
              </span>
            </li>
          ))}
        </ul>
      </div>

      {transactions.length > 10 && (
        <button 
          className="show-btn"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "Show Less" : "Show All"}
        </button>
      )}
    </>
  );
}
export default TransactionList;
