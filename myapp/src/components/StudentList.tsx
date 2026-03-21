import React, { useState } from 'react';

interface Student {
  id: number; first_name: string; last_name: string; gender: string;
  birthdate: string; address: string; contact: string; email: string;
  year_level: number; program: string;
}
interface StudentForm {
  first_name: string; last_name: string; gender: string; birthdate: string;
  address: string; contact: string; email: string; year_level: string; program: string;
}

const inputStyle: React.CSSProperties = { width: '100%', padding: '9px 12px', marginBottom: '10px', borderRadius: '8px', border: '1.5px solid #ede9fe', fontSize: '14px', boxSizing: 'border-box', outline: 'none', fontFamily: 'sans-serif', color: '#3b0764', backgroundColor: '#faf5ff' };
const labelStyle: React.CSSProperties = { fontSize: '12px', fontWeight: '700', color: '#7c3aed', display: 'block', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' };
const cardStyle: React.CSSProperties = { borderRadius: '14px', border: '1px solid #ede9fe', padding: '28px', backgroundColor: 'white', boxShadow: '0 2px 12px rgba(124,58,237,0.06)' };
const btnPrimary: React.CSSProperties = { backgroundColor: '#7c3aed', border: 'none', color: 'white', padding: '11px 16px', borderRadius: '8px', cursor: 'pointer', width: '100%', fontWeight: '700', fontSize: '14px', fontFamily: 'sans-serif' };
const btnSmEdit: React.CSSProperties = { padding: '5px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', marginRight: '6px', border: '1.5px solid #7c3aed', color: '#7c3aed', backgroundColor: 'white', fontWeight: '600', fontFamily: 'sans-serif' };
const btnSmDel: React.CSSProperties = { padding: '5px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', border: '1.5px solid #dc3545', color: '#dc3545', backgroundColor: 'white', fontWeight: '600', fontFamily: 'sans-serif' };

const StudentList: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([
    { id: 1, first_name: 'Juan', last_name: 'Dela Cruz', gender: 'Male', birthdate: '2000-01-01', address: 'Manila', contact: '09171234567', email: 'juan@email.com', year_level: 2, program: 'BSCS' },
    { id: 2, first_name: 'Maria', last_name: 'Santos', gender: 'Female', birthdate: '2001-05-15', address: 'Cebu', contact: '09281234567', email: 'maria@email.com', year_level: 3, program: 'BSIT' },
  ]);
  const [form, setForm] = useState<StudentForm>({ first_name: '', last_name: '', gender: 'Male', birthdate: '', address: '', contact: '', email: '', year_level: '', program: '' });
  const [editModal, setEditModal] = useState<Student | null>(null);
  const [alert, setAlert] = useState('');

  const showAlert = (msg: string) => { setAlert(msg); setTimeout(() => setAlert(''), 3000); };
  const handleAdd = (e: React.FormEvent) => { e.preventDefault(); setStudents([...students, { ...form, id: Date.now(), year_level: Number(form.year_level) }]); setForm({ first_name: '', last_name: '', gender: 'Male', birthdate: '', address: '', contact: '', email: '', year_level: '', program: '' }); showAlert('Student added!'); };
  const handleEdit = (e: React.FormEvent) => { e.preventDefault(); if (!editModal) return; setStudents(students.map(s => s.id === editModal.id ? { ...editModal } : s)); setEditModal(null); showAlert('Student updated!'); };
  const handleDelete = (id: number, name: string) => { if (window.confirm(`Delete ${name}?`)) { setStudents(students.filter(s => s.id !== id)); showAlert('Student deleted.'); } };

  return (
    <div>
      {alert && <div style={{ backgroundColor: '#ede9fe', color: '#6d28d9', padding: '12px 16px', borderRadius: '8px', marginBottom: '16px', fontWeight: '600', fontSize: '14px' }}>✓ {alert}</div>}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px' }}>

        {/* ADD FORM */}
        <div style={cardStyle}>
          <h5 style={{ fontWeight: '800', marginBottom: '4px', color: '#3b0764', fontSize: '17px' }}>Add Student</h5>
          <p style={{ fontSize: '12px', color: '#a78bfa', marginBottom: '20px' }}>Register a new student record</p>
          <form onSubmit={handleAdd}>
            <label style={labelStyle}>First Name</label>
            <input type="text" placeholder="First Name" value={form.first_name} onChange={e => setForm({ ...form, first_name: e.target.value })} style={inputStyle} required />
            <label style={labelStyle}>Last Name</label>
            <input type="text" placeholder="Last Name" value={form.last_name} onChange={e => setForm({ ...form, last_name: e.target.value })} style={inputStyle} required />
            <label style={labelStyle}>Gender</label>
            <select value={form.gender} onChange={e => setForm({ ...form, gender: e.target.value })} style={inputStyle}><option>Male</option><option>Female</option></select>
            <label style={labelStyle}>Birthdate</label>
            <input type="date" value={form.birthdate} onChange={e => setForm({ ...form, birthdate: e.target.value })} style={inputStyle} required />
            <label style={labelStyle}>Address</label>
            <input type="text" placeholder="Address" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} style={inputStyle} />
            <label style={labelStyle}>Contact</label>
            <input type="text" placeholder="Contact Number" value={form.contact} onChange={e => setForm({ ...form, contact: e.target.value })} style={inputStyle} />
            <label style={labelStyle}>Email</label>
            <input type="email" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} style={inputStyle} required />
            <label style={labelStyle}>Year Level</label>
            <input type="number" placeholder="Year Level" value={form.year_level} onChange={e => setForm({ ...form, year_level: e.target.value })} style={inputStyle} />
            <label style={labelStyle}>Program</label>
            <input type="text" placeholder="Program" value={form.program} onChange={e => setForm({ ...form, program: e.target.value })} style={{ ...inputStyle, marginBottom: '20px' }} />
            <button type="submit" style={btnPrimary} onMouseOver={e => (e.currentTarget.style.backgroundColor = '#6d28d9')} onMouseOut={e => (e.currentTarget.style.backgroundColor = '#7c3aed')}>Save Student</button>
          </form>
        </div>

        {/* TABLE */}
        <div style={cardStyle}>
          <h5 style={{ fontWeight: '800', marginBottom: '4px', color: '#3b0764', fontSize: '17px' }}>Student Directory</h5>
          <p style={{ fontSize: '12px', color: '#a78bfa', marginBottom: '20px' }}>List of all registered students</p>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
            <thead>
              <tr style={{ backgroundColor: '#faf5ff' }}>
                {['Name', 'Program', 'Year', 'Action'].map(h => <th key={h} style={{ padding: '12px 10px', textAlign: 'left', color: '#7c3aed', fontWeight: '700', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {students.map(s => (
                <tr key={s.id} style={{ borderTop: '1px solid #f5f3ff' }}
                  onMouseOver={e => (e.currentTarget.style.backgroundColor = '#faf5ff')}
                  onMouseOut={e => (e.currentTarget.style.backgroundColor = 'white')}>
                  <td style={{ padding: '12px 10px', fontWeight: '600', color: '#3b0764' }}>{s.first_name} {s.last_name}</td>
                  <td style={{ padding: '12px 10px', color: '#6b7280' }}>{s.program}</td>
                  <td style={{ padding: '12px 10px' }}><span style={{ backgroundColor: '#ede9fe', color: '#7c3aed', padding: '2px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '700' }}>Year {s.year_level}</span></td>
                  <td style={{ padding: '12px 10px' }}>
                    <button onClick={() => setEditModal({ ...s })} style={btnSmEdit} onMouseOver={e => { e.currentTarget.style.backgroundColor = '#7c3aed'; e.currentTarget.style.color = 'white'; }} onMouseOut={e => { e.currentTarget.style.backgroundColor = 'white'; e.currentTarget.style.color = '#7c3aed'; }}>Edit</button>
                    <button onClick={() => handleDelete(s.id, s.first_name)} style={btnSmDel} onMouseOver={e => { e.currentTarget.style.backgroundColor = '#dc3545'; e.currentTarget.style.color = 'white'; }} onMouseOut={e => { e.currentTarget.style.backgroundColor = 'white'; e.currentTarget.style.color = '#dc3545'; }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* EDIT MODAL — compact, same size as TeacherList */}
      {editModal !== null && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(59,7,100,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
          <div style={{ backgroundColor: 'white', borderRadius: '16px', width: '500px', maxHeight: '90vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 20px 60px rgba(124,58,237,0.2)' }}>

            {/* Modal Header */}
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #ede9fe', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#faf5ff', flexShrink: 0 }}>
              <div>
                <h5 style={{ margin: 0, color: '#3b0764', fontWeight: '800' }}>Edit Student Info</h5>
                <p style={{ margin: 0, fontSize: '12px', color: '#a78bfa' }}>{editModal.first_name} {editModal.last_name}</p>
              </div>
              <button onClick={() => setEditModal(null)} style={{ background: 'none', border: 'none', fontSize: '22px', cursor: 'pointer', color: '#7c3aed' }}>×</button>
            </div>

            {/* Modal Body — scrollable */}
            <form onSubmit={handleEdit} style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              <div style={{ padding: '20px 24px', overflowY: 'auto', flex: 1 }}>

                {/* Two columns for compact layout */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
                  <div>
                    <label style={labelStyle}>First Name</label>
                    <input type="text" value={editModal.first_name} onChange={e => setEditModal({ ...editModal, first_name: e.target.value })} style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Last Name</label>
                    <input type="text" value={editModal.last_name} onChange={e => setEditModal({ ...editModal, last_name: e.target.value })} style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Gender</label>
                    <select value={editModal.gender} onChange={e => setEditModal({ ...editModal, gender: e.target.value })} style={inputStyle}>
                      <option>Male</option><option>Female</option>
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>Year Level</label>
                    <input type="number" value={editModal.year_level} onChange={e => setEditModal({ ...editModal, year_level: Number(e.target.value) })} style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Program</label>
                    <input type="text" value={editModal.program} onChange={e => setEditModal({ ...editModal, program: e.target.value })} style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Contact</label>
                    <input type="text" value={editModal.contact} onChange={e => setEditModal({ ...editModal, contact: e.target.value })} style={inputStyle} />
                  </div>
                </div>

                {/* Full width fields */}
                <label style={labelStyle}>Address</label>
                <input type="text" value={editModal.address} onChange={e => setEditModal({ ...editModal, address: e.target.value })} style={inputStyle} />
                <label style={labelStyle}>Email</label>
                <input type="email" value={editModal.email} onChange={e => setEditModal({ ...editModal, email: e.target.value })} style={{ ...inputStyle, marginBottom: 0 }} />
              </div>

              {/* Modal Footer */}
              <div style={{ padding: '16px 24px', borderTop: '1px solid #ede9fe', display: 'flex', justifyContent: 'flex-end', gap: '10px', backgroundColor: '#faf5ff', flexShrink: 0 }}>
                <button onClick={() => setEditModal(null)} type="button" style={{ padding: '9px 20px', borderRadius: '8px', border: '1.5px solid #ede9fe', cursor: 'pointer', backgroundColor: 'white', color: '#6b7280', fontWeight: '600', fontFamily: 'sans-serif' }}>Cancel</button>
                <button type="submit" style={{ ...btnPrimary, width: 'auto', padding: '9px 24px' }} onMouseOver={e => (e.currentTarget.style.backgroundColor = '#6d28d9')} onMouseOut={e => (e.currentTarget.style.backgroundColor = '#7c3aed')}>Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentList;