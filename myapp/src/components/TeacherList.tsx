import React, { useState } from 'react';

interface Teacher { id: number; first_name: string; last_name: string; email: string; specialization: string; employment_status: string; department: string; }
interface TeacherForm { first_name: string; last_name: string; email: string; specialization: string; employment_status: string; }

const inputStyle: React.CSSProperties = { width: '100%', padding: '9px 12px', marginBottom: '10px', borderRadius: '8px', border: '1.5px solid #ede9fe', fontSize: '14px', boxSizing: 'border-box', outline: 'none', fontFamily: 'sans-serif', color: '#3b0764', backgroundColor: '#faf5ff' };
const labelStyle: React.CSSProperties = { fontSize: '12px', fontWeight: '700', color: '#7c3aed', display: 'block', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' };
const cardStyle: React.CSSProperties = { borderRadius: '14px', border: '1px solid #ede9fe', padding: '28px', backgroundColor: 'white', boxShadow: '0 2px 12px rgba(124,58,237,0.06)' };
const btnPrimary: React.CSSProperties = { backgroundColor: '#7c3aed', border: 'none', color: 'white', padding: '11px 16px', borderRadius: '8px', cursor: 'pointer', width: '100%', fontWeight: '700', fontSize: '14px', fontFamily: 'sans-serif' };
const btnSmEdit: React.CSSProperties = { padding: '5px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', marginRight: '6px', border: '1.5px solid #7c3aed', color: '#7c3aed', backgroundColor: 'white', fontWeight: '600', fontFamily: 'sans-serif' };
const btnSmDel: React.CSSProperties = { padding: '5px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', border: '1.5px solid #dc3545', color: '#dc3545', backgroundColor: 'white', fontWeight: '600', fontFamily: 'sans-serif' };

const TeacherList: React.FC = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([
    { id: 1, first_name: 'Jose', last_name: 'Rizal', email: 'jose@school.com', specialization: 'Mathematics', employment_status: 'Full-time', department: 'Science' },
    { id: 2, first_name: 'Ana', last_name: 'Reyes', email: 'ana@school.com', specialization: 'English', employment_status: 'Part-time', department: 'Arts' },
  ]);
  const [form, setForm] = useState<TeacherForm>({ first_name: '', last_name: '', email: '', specialization: '', employment_status: 'Full-time' });
  const [editModal, setEditModal] = useState<Teacher | null>(null);
  const [alert, setAlert] = useState('');

  const showAlert = (msg: string) => { setAlert(msg); setTimeout(() => setAlert(''), 3000); };
  const handleAdd = (e: React.FormEvent) => { e.preventDefault(); setTeachers([...teachers, { ...form, id: Date.now(), department: '' }]); setForm({ first_name: '', last_name: '', email: '', specialization: '', employment_status: 'Full-time' }); showAlert('Teacher added!'); };
  const handleEdit = (e: React.FormEvent) => { e.preventDefault(); if (!editModal) return; setTeachers(teachers.map(t => t.id === editModal.id ? { ...editModal } : t)); setEditModal(null); showAlert('Teacher updated!'); };
  const handleDelete = (id: number) => { if (window.confirm('Delete record?')) { setTeachers(teachers.filter(t => t.id !== id)); showAlert('Teacher deleted.'); } };

  return (
    <div>
      {alert && <div style={{ backgroundColor: '#ede9fe', color: '#6d28d9', padding: '12px 16px', borderRadius: '8px', marginBottom: '16px', fontWeight: '600', fontSize: '14px' }}>✓ {alert}</div>}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px' }}>
        <div style={cardStyle}>
          <h5 style={{ fontWeight: '800', marginBottom: '4px', color: '#3b0764', fontSize: '17px' }}>Hire New Teacher</h5>
          <p style={{ fontSize: '12px', color: '#a78bfa', marginBottom: '20px' }}>Add a new teacher to the system</p>
          <form onSubmit={handleAdd}>
            <label style={labelStyle}>First Name</label><input type="text" placeholder="First Name" value={form.first_name} onChange={e => setForm({ ...form, first_name: e.target.value })} style={inputStyle} required />
            <label style={labelStyle}>Last Name</label><input type="text" placeholder="Last Name" value={form.last_name} onChange={e => setForm({ ...form, last_name: e.target.value })} style={inputStyle} required />
            <label style={labelStyle}>Email</label><input type="email" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} style={inputStyle} required />
            <label style={labelStyle}>Specialization</label><input type="text" placeholder="Specialization" value={form.specialization} onChange={e => setForm({ ...form, specialization: e.target.value })} style={inputStyle} required />
            <label style={labelStyle}>Employment Status</label>
            <select value={form.employment_status} onChange={e => setForm({ ...form, employment_status: e.target.value })} style={{ ...inputStyle, marginBottom: '20px' }}><option>Full-time</option><option>Part-time</option></select>
            <button type="submit" style={btnPrimary} onMouseOver={e => (e.currentTarget.style.backgroundColor = '#6d28d9')} onMouseOut={e => (e.currentTarget.style.backgroundColor = '#7c3aed')}>Save Teacher</button>
          </form>
        </div>

        <div style={cardStyle}>
          <h5 style={{ fontWeight: '800', marginBottom: '4px', color: '#3b0764', fontSize: '17px' }}>Teacher Directory</h5>
          <p style={{ fontSize: '12px', color: '#a78bfa', marginBottom: '20px' }}>List of all registered teachers</p>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
            <thead>
              <tr style={{ backgroundColor: '#faf5ff' }}>
                {['Name', 'Specialization', 'Status', 'Action'].map(h => <th key={h} style={{ padding: '12px 10px', textAlign: 'left', color: '#7c3aed', fontWeight: '700', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {teachers.map(t => (
                <tr key={t.id} style={{ borderTop: '1px solid #f5f3ff' }} onMouseOver={e => (e.currentTarget.style.backgroundColor = '#faf5ff')} onMouseOut={e => (e.currentTarget.style.backgroundColor = 'white')}>
                  <td style={{ padding: '12px 10px', fontWeight: '600', color: '#3b0764' }}>{t.first_name} {t.last_name}</td>
                  <td style={{ padding: '12px 10px', color: '#6b7280' }}>{t.specialization}</td>
                  <td style={{ padding: '12px 10px' }}>
                    <span style={{ backgroundColor: t.employment_status === 'Full-time' ? '#ede9fe' : '#f0fdf4', color: t.employment_status === 'Full-time' ? '#7c3aed' : '#16a34a', padding: '2px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '700' }}>{t.employment_status}</span>
                  </td>
                  <td style={{ padding: '12px 10px' }}>
                    <button onClick={() => setEditModal({ ...t })} style={btnSmEdit} onMouseOver={e => { e.currentTarget.style.backgroundColor = '#7c3aed'; e.currentTarget.style.color = 'white'; }} onMouseOut={e => { e.currentTarget.style.backgroundColor = 'white'; e.currentTarget.style.color = '#7c3aed'; }}>Edit</button>
                    <button onClick={() => handleDelete(t.id)} style={btnSmDel} onMouseOver={e => { e.currentTarget.style.backgroundColor = '#dc3545'; e.currentTarget.style.color = 'white'; }} onMouseOut={e => { e.currentTarget.style.backgroundColor = 'white'; e.currentTarget.style.color = '#dc3545'; }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {editModal !== null && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(59,7,100,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
          <div style={{ backgroundColor: 'white', borderRadius: '16px', width: '440px', overflow: 'hidden', boxShadow: '0 20px 60px rgba(124,58,237,0.2)' }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #ede9fe', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#faf5ff' }}>
              <div><h5 style={{ margin: 0, color: '#3b0764', fontWeight: '800' }}>Edit Teacher</h5><p style={{ margin: 0, fontSize: '12px', color: '#a78bfa' }}>{editModal.first_name} {editModal.last_name}</p></div>
              <button onClick={() => setEditModal(null)} style={{ background: 'none', border: 'none', fontSize: '22px', cursor: 'pointer', color: '#7c3aed' }}>×</button>
            </div>
            <form onSubmit={handleEdit}>
              <div style={{ padding: '20px 24px' }}>
                <label style={labelStyle}>First Name</label><input type="text" value={editModal.first_name} onChange={e => setEditModal({ ...editModal, first_name: e.target.value })} style={inputStyle} />
                <label style={labelStyle}>Last Name</label><input type="text" value={editModal.last_name} onChange={e => setEditModal({ ...editModal, last_name: e.target.value })} style={inputStyle} />
                <label style={labelStyle}>Email</label><input type="email" value={editModal.email} onChange={e => setEditModal({ ...editModal, email: e.target.value })} style={inputStyle} />
                <label style={labelStyle}>Specialization</label><input type="text" value={editModal.specialization} onChange={e => setEditModal({ ...editModal, specialization: e.target.value })} style={inputStyle} />
                <label style={labelStyle}>Department</label><input type="text" placeholder="Department" value={editModal.department} onChange={e => setEditModal({ ...editModal, department: e.target.value })} style={inputStyle} />
                <label style={labelStyle}>Employment Status</label>
                <select value={editModal.employment_status} onChange={e => setEditModal({ ...editModal, employment_status: e.target.value })} style={inputStyle}><option>Full-time</option><option>Part-time</option></select>
              </div>
              <div style={{ padding: '16px 24px', borderTop: '1px solid #ede9fe', display: 'flex', justifyContent: 'flex-end', gap: '10px', backgroundColor: '#faf5ff' }}>
                <button onClick={() => setEditModal(null)} type="button" style={{ padding: '9px 20px', borderRadius: '8px', border: '1.5px solid #ede9fe', cursor: 'pointer', backgroundColor: 'white', color: '#6b7280', fontWeight: '600', fontFamily: 'sans-serif' }}>Cancel</button>
                <button type="submit" style={{ ...btnPrimary, width: 'auto', padding: '9px 24px' }} onMouseOver={e => (e.currentTarget.style.backgroundColor = '#6d28d9')} onMouseOut={e => (e.currentTarget.style.backgroundColor = '#7c3aed')}>Update</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherList;