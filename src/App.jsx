import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [currentBalance, setCurrentBalance] = useState(0);
  const [amountCredited, setAmountCredited] = useState('');
  const [amountDeducted, setAmountDeducted] = useState('');
  const [transactionSubject, setTransactionSubject] = useState('');
  const [transactions, setTransactions] = useState([]);

  // Function to handle adding a new transaction
  const addTransaction = () => {
    // Check if transaction subject is not empty
    if (transactionSubject.trim() === '') {
      alert('Please enter a transaction subject');
      return;
    }

    // Convert credited and deducted amounts to numbers
    const credited = parseFloat(amountCredited) || 0;
    const deducted = parseFloat(amountDeducted) || 0;

    // Create a new transaction object
    const newTransaction = {
      subject: transactionSubject,
      credited: credited,
      deducted: deducted,
    };

    // Add the new transaction to the list of transactions
    setTransactions([...transactions, newTransaction]);

    // Calculate the new balance
    const newBalance = currentBalance + credited - deducted;

    // Update the current balance
    setCurrentBalance(newBalance);

    // Clear input fields after adding the transaction
    setTransactionSubject('');
    setAmountCredited('');
    setAmountDeducted('');
  };

  return (
    <div className="card">
      <div className="card-content">
        <center><h1>Expense Tracker</h1></center>

        <div className="currentBalance">
          <h2>Current Balance: ₹{currentBalance}</h2>
        </div>

        <div className="newTransaction">
          <h2>Add New Transactions</h2>

          <div className="transaction-subject">
            <h3>Transaction Subject<span>*</span></h3>
            <input
              type="text"
              placeholder="Enter transaction subject"
              value={transactionSubject}
              onChange={(e) => setTransactionSubject(e.target.value)}
            />
          </div>

          <div className="Amount-credited">
            <h3>Amount Credited</h3>
            <input
              type="text"
              placeholder="Enter amount credited"
              value={amountCredited}
              onChange={(e) => setAmountCredited(e.target.value)}
            />
          </div>

          <div className="Amount-Deducted">
            <h3>Amount Deducted</h3>
            <input
              type="text"
              placeholder="Enter amount deducted"
              value={amountDeducted}
              onChange={(e) => setAmountDeducted(e.target.value)}
            />
          </div>

          {/* Add a button for submitting the transaction */}
          <button onClick={addTransaction}>Add Transaction</button>
        </div>

        {/* Display past transactions */}
        <div className="pastTransactions">
          <h2>Past Transactions</h2>
          <ul>
            {transactions.map((transaction, index) => (
              <li key={index} className={transaction.credited > 0 ? 'credited' : 'deducted'}>
                <strong>{transaction.subject}</strong>: Credited - {transaction.credited}, Deducted - {transaction.deducted}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
