import { useState } from 'react';

const API_URL = 'http://127.0.0.1:8000/api/greet/';

export default function Greet() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGreet = async () => {
    setLoading(true);
    setError(null);
    setMessage('');

    try {
      const url = new URL(API_URL);
      if (name.trim()) {
        url.searchParams.append('name', name.trim());
      }

      const res = await fetch(url);
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);

      const data = await res.json();
      setMessage(data.message);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleGreet();
  };

  return (
    <div style={{ maxWidth: 400, margin: '3rem auto', fontFamily: 'sans-serif' }}>
      <h1>Greet API Demo</h1>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Enter a name (optional)"
        style={{ padding: '0.5rem', width: '100%', marginBottom: '0.75rem', boxSizing: 'border-box' }}
      />

      <button
        onClick={handleGreet}
        disabled={loading}
        style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}
      >
        {loading ? 'Loading...' : 'Greet'}
      </button>

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {message && <p style={{ fontSize: '1.25rem' }}>{message}</p>}
    </div>
  );
}