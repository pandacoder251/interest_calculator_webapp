import React from 'react';

const TransactionList = ({ transactions }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-IN');
  };

  const calculateInterest = (amount, rate, days) => {
    return (amount * rate * days) / (100 * 365);
  };

  const calculateOutstanding = (transaction) => {
    const today = new Date();
    const startDate = new Date(transaction.date);
    const daysDiff = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
    
    const interest = calculateInterest(transaction.amount, transaction.interestRate, daysDiff);
    return transaction.amount + interest;
  };

  return (
    <div className="card">
      <h2>Recent Transactions</h2>
      {transactions.length === 0 ? (
        <p className="alert alert-info">No transactions yet. Add your first transaction above!</p>
      ) : (
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Name</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Rate</th>
                <th>Outstanding</th>
                <th>Mode</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => {
                const outstanding = calculateOutstanding(transaction);
                const isOverdue = transaction.type === 'given' && outstanding > transaction.amount * 1.1;
                
                return (
                  <tr key={transaction.id}>
                    <td>{formatDate(transaction.date)}</td>
                    <td>
                      <div>
                        <div style={{ fontWeight: 600 }}>{transaction.name}</div>
                        <div style={{ fontSize: '0.85rem', color: '#666' }}>{transaction.contact}</div>
                      </div>
                    </td>
                    <td>
                      <span className={`badge ${transaction.type === 'given' ? 'badge-given' : 'badge-taken'}`}>
                        {transaction.type === 'given' ? 'Given' : 'Taken'}
                      </span>
                    </td>
                    <td>₹{transaction.amount.toLocaleString()}</td>
                    <td>{transaction.interestRate}%</td>
                    <td>₹{outstanding.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                    <td>
                      <span className="badge" style={{ backgroundColor: '#e9ecef', color: '#495057' }}>
                        {transaction.modeOfPayment}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${isOverdue ? 'badge-overdue' : 'badge-paid'}`}>
                        {isOverdue ? 'Overdue' : 'Active'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TransactionList;
