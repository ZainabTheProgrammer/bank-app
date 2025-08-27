import './App.css';
import { useState, useEffect } from 'react';
import BalanceDisplay from './components/BalanceDisplay';
import TransactionList from './components/TransactionList';

function App() {
  const [balance, setBalance] = useState(1000);
  const [amount, setAmount] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showAll, setShowAll] = useState(false); 

  const maxDeposit = 10000;
  const maxWithdrawal = 5000;

  useEffect(() => {
    console.log("Balance changed to:", balance);
  }, [balance]);

  const handleTransaction = (type) => {
    const amt = parseFloat(amount);

    
    if (isNaN(amt) || amt <= 0) {
      setError("Enter a valid positive amount");
      setSuccess('');
      return;
    }

    const newTransaction = {
      type: type,
      amount: amt,
      time: new Date()
    };

    if (type === "deposit") {
      if (amt > maxDeposit) {
        setError(`Maximum deposit is $${maxDeposit}`);
        setSuccess('');
        return;
      }
      setBalance(balance + amt);
      setTransactions([...transactions, newTransaction]);
      setSuccess(`Successfully deposited $${amt}`);
      setError('');
    } else {
      if (amt > balance) {
        setError("Not enough balance!");
        setSuccess('');
        return;
      }
      if (amt > maxWithdrawal) {
        setError(`Maximum withdrawal is $${maxWithdrawal}`);
        setSuccess('');
        return;
      }
      setBalance(balance - amt);
      setTransactions([...transactions, newTransaction]);
      setSuccess(`Successfully withdrew $${amt}`);
      setError('');
    }

    setAmount('');
  }

  return (
    <div className="App">
      <div className="bank-form">
        <h1 className="bank-name">MyBank</h1>

        <BalanceDisplay balance={balance} />

        <p>Enter a positive amount to deposit or withdraw.</p>

        <div className="controls">
          <input
            type="number"
            placeholder="Enter amount"
            min="1"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <button onClick={() => handleTransaction("deposit")}>Deposit</button>
          <button onClick={() => handleTransaction("withdraw")}>Withdraw</button>
        </div>

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        <TransactionList 
          transactions={transactions} 
          showAll={showAll} 
          setShowAll={setShowAll} 
        />
      </div>
    </div>
  );
}

export default App;
