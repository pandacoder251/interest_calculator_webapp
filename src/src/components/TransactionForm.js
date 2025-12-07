import React, { useState } from 'react';

const TransactionForm = ({ onAddTransaction }) => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    amount: '',
    interestRate: '',
    type: 'given',
    name: '',
    contact: '',
    modeOfPayment: 'cash',
    screenshot: null,
    notes: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type: inputType, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: inputType === 'file' ? files[0] : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount';
    }
    
    if (!formData.interestRate || parseFloat(formData.interestRate) < 0) {
      newErrors.interestRate = 'Please enter a valid interest rate';
    }
    
    if (!formData.name.trim()) {
      newErrors.name = 'Please enter a name';
    }
    
    if (!formData.contact.trim()) {
      newErrors.contact = 'Please enter a contact';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    const transaction = {
      ...formData,
      amount: parseFloat(formData.amount),
      interestRate: parseFloat(formData.interestRate),
      date: new Date(formData.date),
      id: Date.now().toString()
    };
    
    onAddTransaction(transaction);
    
    // Reset form
    setFormData({
      date: new Date().toISOString().split('T')[0],
      amount: '',
      interestRate: '',
      type: 'given',
      name: '',
      contact: '',
      modeOfPayment: 'cash',
      screenshot: null,
      notes: ''
    });
  };

  return (
    <div className="card">
      <h2>Add New Transaction</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="amount">Amount (₹)</label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              step="0.01"
              min="0"
              placeholder="Enter amount"
              className={errors.amount ? 'error' : ''}
            />
            {errors.amount && <span className="alert alert-danger">{errors.amount}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="interestRate">Interest Rate (%)</label>
            <input
              type="number"
              id="interestRate"
              name="interestRate"
              value={formData.interestRate}
              onChange={handleChange}
              step="0.01"
              min="0"
              placeholder="Enter interest rate"
              className={errors.interestRate ? 'error' : ''}
            />
            {errors.interestRate && <span className="alert alert-danger">{errors.interestRate}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="type">Transaction Type</label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
            >
              <option value="given">Given (Loan)</option>
              <option value="taken">Taken (Borrowed)</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter name"
              className={errors.name ? 'error' : ''}
            />
            {errors.name && <span className="alert alert-danger">{errors.name}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="contact">Contact</label>
            <input
              type="text"
              id="contact"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder="Phone/Email"
              className={errors.contact ? 'error' : ''}
            />
            {errors.contact && <span className="alert alert-danger">{errors.contact}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="modeOfPayment">Mode of Payment</label>
            <select
              id="modeOfPayment"
              name="modeOfPayment"
              value={formData.modeOfPayment}
              onChange={handleChange}
            >
              <option value="cash">Cash</option>
              <option value="bank">Bank Transfer</option>
              <option value="upi">UPI</option>
              <option value="cheque">Cheque</option>
              <option value="card">Card</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="screenshot">Screenshot (Optional)</label>
            <input
              type="file"
              id="screenshot"
              name="screenshot"
              accept="image/*"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="notes">Notes</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Additional notes..."
            rows="3"
          />
        </div>

        <button type="submit" className="btn">
          Add Transaction
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;
