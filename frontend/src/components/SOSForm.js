// frontend/src/components/SOSForm.js
import React, { useState } from 'react';
import axios from 'axios';

const SOSForm = () => {
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios.post('/api/sos', { message });
    setMessage('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Describe your emergency"
        required
      />
      <button type="submit">Send SOS</button>
    </form>
  );
};

export default SOSForm;
