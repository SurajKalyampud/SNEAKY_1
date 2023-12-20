import React, { useState } from 'react';
import './PaymentPage.css'
import Navbar from './Navbar'

const PaymentPage = () => {
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length === 0) {
      // You can perform actual payment processing here
      console.log('Payment successful!');
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = (data) => {
    const errors = {};
    const cardNumberRegex = /^[0-9]{16}$/;
    const cvvRegex = /^[0-9]{3}$/;

    if (!cardNumberRegex.test(data.cardNumber)) {
      errors.cardNumber = 'Invalid card number';
    }

    if (!data.cardHolder.trim()) {
      errors.cardHolder = 'Card holder name is required';
    }

    if (!data.expiryDate.trim()) {
      errors.expiryDate = 'Expiry date is required';
    }

    if (!cvvRegex.test(data.cvv)) {
      errors.cvv = 'Invalid CVV';
    }

    return errors;
  };

  return (
   
    <div className="payment-container">
      <h2>Payment Page</h2>
      <form onSubmit={handleSubmit} className="payment-form">
        <div className="form-group">
          <label>Card Number:</label>
          <input
            type="text"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
          />
          {errors.cardNumber && <p className="error-message">{errors.cardNumber}</p>}
        </div>
        <div className="form-group">
          <label>Card Holder:</label>
          <input
            type="text"
            name="cardHolder"
            value={formData.cardHolder}
            onChange={handleChange}
          />
          {errors.cardHolder && <p className="error-message">{errors.cardHolder}</p>}
        </div>
        <div className="form-group">
          <label>Expiry Date:</label>
          <input
            type="text"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
          />
          {errors.expiryDate && <p className="error-message">{errors.expiryDate}</p>}
        </div>
        <div className="form-group">
          <label>CVV:</label>
          <input type="text" name="cvv" value={formData.cvv} onChange={handleChange} />
          {errors.cvv && <p className="error-message">{errors.cvv}</p>}
        </div>
        <button type="submit" className="submit-button">
          Submit Payment
        </button>
      </form>
    </div>

  );
};

export default PaymentPage;
