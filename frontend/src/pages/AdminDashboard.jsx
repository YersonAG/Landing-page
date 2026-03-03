import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API = "https://luisao.onrender.com";

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', description: '', image: null });
  const [editing, setEditing] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('admin_token');

  useEffect(() => {
    if (!token) { navigate('/admin'); return; }
    fetchProducts();
  }, []);

  const headers = { Authorization: `Bearer ${token}` };

  const fetchProducts = async () => {
    const res = await axios.get(`${API}/products`);
    setProducts(res.data);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, image: file });
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    const data = new FormData();
    data.append('name', form.name);
    data.append('description', form.description);
    if (form.image) data.append('image', form.image);

    if (editing) {
      await axios.put(`${API}/products/${editing.id}`, data, { headers });
    } else {
      await axios.post(`${API}/products`, data, { headers });
    }

    setForm({ name: '', description: '', image: null });
    setEditing(null);
    setPreview(null);
    fetchProducts();
  };

  const handleEdit = (product) => {
    setEditing(product);
    setForm({ name: product.name, description: product.description, image: null });
    setPreview(product.imageUrl ? `${API}${product.imageUrl}` : null);
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Eliminar este producto?')) return;
    await axios.delete(`${API}/products/${id}`, { headers });
    fetchProducts();
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    navigate('/admin');
  };

  return (
    <div style={s.container}>
      {/* Header */}
      <div style={s.header}>
        <h1 style={s.headerTitle}>Panel Admin — Luisao Parfums</h1>
        <button style={s.logoutBtn} onClick={handleLogout}>Cerrar sesión</button>
      </div>

      <div style={s.content}>
        {/* Formulario */}
        <div style={s.formCard}>
          <h2 style={s.sectionTitle}>{editing ? '✏️ Editar producto' : '➕ Nuevo producto'}</h2>

          <input
            style={s.input}
            placeholder="Nombre del producto"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
          />
          <textarea
            style={{ ...s.input, height: '100px', resize: 'vertical' }}
            placeholder="Descripción"
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
          />

          <label style={s.fileLabel}>
            📷 {form.image ? form.image.name : 'Seleccionar imagen'}
            <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageChange} />
          </label>

          {preview && (
            <img src={preview} alt="preview" style={s.preview} />
          )}

          <div style={{ display: 'flex', gap: '12px' }}>
            <button style={s.submitBtn} onClick={handleSubmit}>
              {editing ? 'Guardar cambios' : 'Crear producto'}
            </button>
            {editing && (
              <button style={s.cancelBtn} onClick={() => { setEditing(null); setForm({ name: '', description: '', image: null }); setPreview(null); }}>
                Cancelar
              </button>
            )}
          </div>
        </div>

        {/* Lista de productos */}
        <div style={s.listSection}>
          <h2 style={s.sectionTitle}>Productos ({products.length})</h2>
          <div style={s.productGrid}>
            {products.map(p => (
              <div key={p.id} style={s.productCard}>
                {p.imageUrl && (
                  <img src={`${API}${p.imageUrl}`} alt={p.name} style={s.productImg} />
                )}
                <div style={s.productInfo}>
                  <p style={s.productName}>{p.name}</p>
                  <p style={s.productDesc}>{p.description}</p>
                </div>
                <div style={s.actions}>
                  <button style={s.editBtn} onClick={() => handleEdit(p)}>Editar</button>
                  <button style={s.deleteBtn} onClick={() => handleDelete(p.id)}>Eliminar</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const s = {
  container: { minHeight: '100vh', backgroundColor: '#0a0a0a', color: '#fff' },
  header: { backgroundColor: '#111', borderBottom: '1px solid #d4af37', padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  headerTitle: { color: '#d4af37', margin: 0, fontSize: '20px' },
  logoutBtn: { backgroundColor: 'transparent', border: '1px solid #555', color: '#aaa', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer' },
  content: { display: 'flex', gap: '40px', padding: '40px', flexWrap: 'wrap' },
  formCard: { backgroundColor: '#111', border: '1px solid #d4af37', borderRadius: '16px', padding: '32px', width: '360px', display: 'flex', flexDirection: 'column', gap: '16px' },
  sectionTitle: { color: '#d4af37', margin: '0 0 8px 0', fontSize: '18px' },
  input: { backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px', padding: '12px 16px', color: '#fff', fontSize: '15px', outline: 'none', width: '100%', boxSizing: 'border-box' },
  fileLabel: { backgroundColor: '#1a1a1a', border: '1px dashed #d4af37', borderRadius: '8px', padding: '12px 16px', color: '#d4af37', cursor: 'pointer', textAlign: 'center' },
  preview: { width: '100%', height: '180px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #333' },
  submitBtn: { flex: 1, backgroundColor: '#d4af37', color: '#000', border: 'none', borderRadius: '8px', padding: '14px', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer' },
  cancelBtn: { flex: 1, backgroundColor: 'transparent', color: '#aaa', border: '1px solid #555', borderRadius: '8px', padding: '14px', fontSize: '15px', cursor: 'pointer' },
  listSection: { flex: 1, minWidth: '300px' },
  productGrid: { display: 'flex', flexDirection: 'column', gap: '12px' },
  productCard: { backgroundColor: '#111', border: '1px solid #d4af37', borderRadius: '12px', padding: '16px', display: 'flex', gap: '16px', alignItems: 'center' },
  productImg: { width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px', flexShrink: 0 },
  productInfo: { flex: 1 },
  productName: { color: '#d4af37', fontWeight: 'bold', margin: '0 0 4px 0' },
  productDesc: { color: '#aaa', fontSize: '13px', margin: 0 },
  actions: { display: 'flex', flexDirection: 'column', gap: '8px' },
  editBtn: { backgroundColor: '#1a1a1a', color: '#d4af37', border: '1px solid #d4af37', borderRadius: '6px', padding: '6px 14px', cursor: 'pointer', fontSize: '13px' },
  deleteBtn: { backgroundColor: '#1a1a1a', color: '#ff6b6b', border: '1px solid #ff6b6b', borderRadius: '6px', padding: '6px 14px', cursor: 'pointer', fontSize: '13px' },
};