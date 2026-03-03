import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AdminLogin() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const res = await axios.post('https://luisao.onrender.com/auth/login', form);
      localStorage.setItem('admin_token', res.data.access_token);
      navigate('/admin/dashboard');
    } catch {
      setError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Admin Panel</h2>
        <p style={styles.subtitle}>Luisao Parfums</p>

        <input
          style={styles.input}
          placeholder="Usuario"
          value={form.username}
          onChange={e => setForm({ ...form, username: e.target.value })}
        />
        <input
          style={styles.input}
          type="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
          onKeyDown={e => e.key === 'Enter' && handleSubmit()}
        />

        {error && <p style={styles.error}>{error}</p>}

        <button style={styles.btn} onClick={handleSubmit}>
          Ingresar
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#0a0a0a',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#111',
    border: '1px solid #d4af37',
    borderRadius: '16px',
    padding: '48px',
    width: '360px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  title: { color: '#d4af37', textAlign: 'center', margin: 0, fontSize: '24px' },
  subtitle: { color: '#aaa', textAlign: 'center', margin: 0, fontSize: '14px' },
  input: {
    backgroundColor: '#1a1a1a',
    border: '1px solid #333',
    borderRadius: '8px',
    padding: '12px 16px',
    color: '#fff',
    fontSize: '15px',
    outline: 'none',
  },
  btn: {
    backgroundColor: '#d4af37',
    color: '#000',
    border: 'none',
    borderRadius: '8px',
    padding: '14px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '8px',
  },
  error: { color: '#ff6b6b', textAlign: 'center', margin: 0, fontSize: '14px' },
};