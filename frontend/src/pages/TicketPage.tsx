import React, { useState } from 'react';

const TicketPage: React.FC = () => {
  const [ticketType, setTicketType] = useState('Standard');
  const [quantity, setQuantity] = useState(1);
  const [isPurchased, setIsPurchased] = useState(false);

  const handlePurchase = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPurchased(true);
  };

  const getPrice = () => {
    switch (ticketType) {
      case 'Express': return 1500;
      case 'Limited Express': return 2500;
      case 'Shinkansen': return 12000;
      default: return 500;
    }
  };

  const total = getPrice() * quantity;

  return (
    <div className="ticket-page">
      <h1>Purchase Tickets</h1>
      {!isPurchased ? (
        <form onSubmit={handlePurchase} className="ticket-form">
          <label>Select Ticket Type:</label>
          <select 
            value={ticketType} 
            onChange={(e) => setTicketType(e.target.value)}
          >
            <option value="Standard">Standard (Local/Rapid)</option>
            <option value="Express">Express</option>
            <option value="Limited Express">Limited Express</option>
            <option value="Shinkansen">Shinkansen</option>
          </select>

          <label>Quantity:</label>
          <input 
            type="number" 
            min="1" 
            max="10" 
            value={quantity} 
            onChange={(e) => setQuantity(Number(e.target.value))} 
          />

          <div className="price-summary">
            <p>Unit Price: ¥{getPrice()}</p>
            <h3>Total: ¥{total}</h3>
          </div>

          <button type="submit" className="purchase-btn">Confirm Purchase</button>
        </form>
      ) : (
        <div className="purchase-success">
          <h2>Purchase Successful!</h2>
          <p>Thank you for your purchase. Your e-ticket is ready.</p>
          <div className="e-ticket">
            <h3>{ticketType} Ticket</h3>
            <p>Quantity: {quantity}</p>
            <p>Amount Paid: ¥{total}</p>
            <div className="qr-code-placeholder">
              <p>QR Code Placeholder</p>
            </div>
          </div>
          <button onClick={() => setIsPurchased(false)}>Buy More</button>
        </div>
      )}
    </div>
  );
};

export default TicketPage;
