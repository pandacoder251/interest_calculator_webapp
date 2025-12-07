import React, { useState, useEffect } from 'react';
import './App.css';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import Dashboard from './components/Dashboard';

function App() {
  const [transactions, setTransactions] = useState([]);

  // Load transactions from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('transactions');
    if (saved) {
      setTransactions(JSON.parse(saved));
    }
  }, []);

  // Save transactions to localStorage
  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  const handleAddTransaction = (transaction) => {
    setTransactions(prev => [transaction, ...prev]);
  };

  return (
    <div className="app-container">
      <header>
        <h1 className="app-title">Interest Calculator</h1>
        <nav className="app-nav">
          <a href="/dashboard">Dashboard</a>
          <a href="/transactions">Transactions</a>
        </nav>
      </header>
      
      {/* Mobile Footer Navigation */}
      <footer>
        <div className="mobile-app-title">Interest Calculator</div>
        <nav className="mobile-nav">
          <a href="/dashboard">Dashboard</a>
          <a href="/transactions">Transactions</a>
        </nav>
      </footer>
      
      <main>
        <div className="container">
          <Dashboard transactions={transactions} />
          
          <div className="form-section">
            <TransactionForm onAddTransaction={handleAddTransaction} />
          </div>
          
          <TransactionList transactions={transactions} />
        </div>
      </main>

      <footer className="desktop-footer">
        <p>© 2025 Interest Calculator WebApp</p>
      </footer>
    </div>
  );
}

export default App;
