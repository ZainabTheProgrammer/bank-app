import './App.css';
import { useState, useEffect } from 'react';
import BalanceDisplay from './components/BalanceDisplay';
import TransactionList from './components/TransactionList';

function App() {
  const [balance, setBalance] = useState(1000);
  const [amount, setAmount] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    console.log("Balance changed to:", balance);
  }, [balance]);

  function handleDeposit() {
    const amt = parseFloat(amount);
    if (!isNaN(amt) && amt > 0) {
      setBalance(balance + amt);
      setTransactions([...transactions, `Deposited: $${amt}`]);
      setAmount('');
      setError('');
    }
  }

  function handleWithdraw() {
    const amt = parseFloat(amount);
    if (isNaN(amt) || amt <= 0) {
      setError('Enter a valid amount');
      return;
    }
    if (amt > balance) {
      setError('Not enough balance!');
    } else {
      setBalance(balance - amt);
      setTransactions([...transactions, `Withdrew: $${amt}`]);
      setAmount('');
      setError('');
    }
  }

  return (
    <div className="App">
      <div className="bank-form">
        <h1 className="bank-name">MyBank</h1>

        <BalanceDisplay balance={balance} />

        <div className="controls">
          <input 
            type="number" 
            placeholder="Enter amount" 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)} 
          />
          <button onClick={handleDeposit}>Deposit</button>
          <button onClick={handleWithdraw}>Withdraw</button>
        </div>

        {error && <p className="error">{error}</p>}

        <TransactionList transactions={transactions} />
      </div>
    </div>
  );
}

export default App;
