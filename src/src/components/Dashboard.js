import React from 'react';

const Dashboard = ({ transactions }) => {
  const totalGiven = transactions
    .filter(t => t.type === 'given')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalTaken = transactions
    .filter(t => t.type === 'taken')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalOutstanding = transactions.reduce((sum, transaction) => {
    const today = new Date();
    const startDate = new Date(transaction.date);
    const daysDiff = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
    const interest = (transaction.amount * transaction.interestRate * daysDiff) / (100 * 365);
    return sum + transaction.amount + interest;
  }, 0);

  const netPosition = totalOutstanding - totalTaken;

  const overdueCount = transactions.filter(t => {
    const today = new Date();
    const startDate = new Date(t.date);
    const daysDiff = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
    const interest = (t.amount * t.interestRate * daysDiff) / (100 * 365);
    const outstanding = t.amount + interest;
    return t.type === 'given' && outstanding > t.amount * 1.1;
  }).length;

  return (
    <div className="dashboard-grid">
      <div className="stat-card">
        <h3>Total Given</h3>
        <div className="value">₹{totalGiven.toLocaleString()}</div>
        <small>Money you've lent out</small>
      </div>
      
      <div className="stat-card">
        <h3>Total Taken</h3>
        <div className="value">₹{totalTaken.toLocaleString()}</div>
        <small>Money you've borrowed</small>
      </div>
      
      <div className="stat-card">
        <h3>Outstanding</h3>
        <div className="value">₹{totalOutstanding.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
        <small>Total including interest</small>
      </div>
      
      <div className="stat-card">
        <h3>Net Position</h3>
        <div className="value" style={{ color: netPosition >= 0 ? '#d4edda' : '#f8d7da' }}>
          ₹{netPosition.toLocaleString(undefined, { maximumFractionDigits: 2 })}
        </div>
        <small>{netPosition >= 0 ? 'You are owed' : 'You owe'}</small>
      </div>
      
      <div className="stat-card">
        <h3>Active Transactions</h3>
        <div className="value">{transactions.length}</div>
        <small>Total transactions tracked</small>
      </div>
      
      <div className="stat-card">
        <h3>Overdue</h3>
        <div className="value">{overdueCount}</div>
        <small>Transactions needing attention</small>
      </div>
    </div>
  );
};

export default Dashboard;
