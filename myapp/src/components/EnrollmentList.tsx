import React, { useState } from 'react';

interface Student { id: number; first_name: string; last_name: string; }
interface Course { id: number; course_code: string; course_name: string; }
interface Enrollment { id: number; student: Student; course: Course; status: string; grade: string; remarks: string; }
interface EnrollmentForm { student_id: string; course_id: string; status: string; grade: string; remarks: string; }

const inputStyle: React.CSSProperties = { width: '100%', padding: '9px 12px', marginBottom: '10px', borderRadius: '8px', border: '1.5px solid #ede9fe', fontSize: '14px', boxSizing: 'border-box', outline: 'none', fontFamily: 'sans-serif', color: '#3b0764', backgroundColor: '#faf5ff' };
const labelStyle: React.CSSProperties = { fontSize: '12px', fontWeight: '700', color: '#7c3aed', display: 'block', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' };
const cardStyle: React.CSSProperties = { borderRadius: '14px', border: '1px solid #ede9fe', padding: '28px', backgroundColor: 'white', boxShadow: '0 2px 12px rgba(124,58,237,0.06)' };
const btnPrimary: React.CSSProperties = { backgroundColor: '#7c3aed', border: 'none', color: 'white', padding: '11px 16px', borderRadius: '8px', cursor: 'pointer', width: '100%', fontWeight: '700', fontSize: '14px', fontFamily: 'sans-serif' };
const btnSmEdit: React.CSSProperties = { padding: '5px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', marginRight: '6px', border: '1.5px solid #7c3aed', color: '#7c3aed', backgroundColor: 'white', fontWeight: '600', fontFamily: 'sans-serif' };
const btnSmDel: React.CSSProperties = { padding: '5px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', border: '1.5px solid #dc3545', color: '#dc3545', backgroundColor: 'white', fontWeight: '600', fontFamily: 'sans-serif' };

const sampleStudents: Student[] = [
  { id: 1, first_name: 'Juan', last_name: 'Dela Cruz' },
  { id: 2, first_name: 'Maria', last_name: 'Santos' },
];
const sampleCourses: Course[] = [
  { id: 1, course_code: 'CS101', course_name: 'Introduction to Computing' },
  { id: 2, course_code: 'IT201', course_name: 'Web Development' },
];

const EnrollmentList: React.FC = () => {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([
    { id: 1, student: sampleStudents[0], course: sampleCourses[0], status: 'Enrolled', grade: '', remarks: '' },
    { id: 2, student: sampleStudents[1], course: sampleCourses[1], status: 'Completed', grade: '1.25', remarks: 'Excellent' },
  ]);
  const [form, setForm] = useState<EnrollmentForm>({ student_id: String(sampleStudents[0].id), course_id: String(sampleCourses[0].id), status: 'Enrolled', grade: '', remarks: '' });
  const [editModal, setEditModal] = useState<Enrollment | null>(null);
  const [alert, setAlert] = useState('');

  const showAlert = (msg: string) => { setAlert(msg); setTimeout(() => setAlert(''), 3000); };
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const student = sampleStudents.find(s => s.id === Number(form.student_id));
    const course = sampleCourses.find(c => c.id === Number(form.course_id));
    if (!student || !course) return;
    setEnrollments([...enrollments, { id: Date.now(), student, course, status: form.status, grade: form.grade, remarks: form.remarks }]);
    setForm({ student_id: String(sampleStudents[0].id), course_id: String(sampleCourses[0].id), status: 'Enrolled', grade: '', remarks: '' });
    showAlert('Student enrolled!');
  };
  const handleEdit = (e: React.FormEvent) => { e.preventDefault(); if (!editModal) return; setEnrollments(enrollments.map(en => en.id === editModal.id ? { ...editModal } : en)); setEditModal(null); showAlert('Enrollment updated!'); };
  const handleDelete = (id: number) => { if (window.confirm('Remove this enrollment?')) { setEnrollments(enrollments.filter(en => en.id !== id)); showAlert('Enrollment removed.'); } };

  return (
    <div>
      {alert && <div style={{ backgroundColor: '#ede9fe', color: '#6d28d9', padding: '12px 16px', borderRadius: '8px', marginBottom: '16px', fontWeight: '600', fontSize: '14px' }}>✓ {alert}</div>}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px' }}>
        <div style={cardStyle}>
          <h5 style={{ fontWeight: '800', marginBottom: '4px', color: '#3b0764', fontSize: '17px' }}>New Enrollment</h5>
          <p style={{ fontSize: '12px', color: '#a78bfa', marginBottom: '20px' }}>Enroll a student in a course</p>
          <form onSubmit={handleAdd}>
            <label style={labelStyle}>Student</label>
            <select value={form.student_id} onChange={e => setForm({ ...form, student_id: e.target.value })} style={inputStyle}>
              {sampleStudents.map(s => <option key={s.id} value={s.id}>{s.first_name} {s.last_name}</option>)}
            </select>
            <label style={labelStyle}>Course</label>
            <select value={form.course_id} onChange={e => setForm({ ...form, course_id: e.target.value })} style={inputStyle}>
              {sampleCourses.map(c => <option key={c.id} value={c.id}>{c.course_name}</option>)}
            </select>
            <label style={labelStyle}>Status</label>
            <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} style={inputStyle}><option>Enrolled</option><option>Completed</option></select>
            <label style={labelStyle}>Grade</label>
            <input type="text" placeholder="e.g. 1.25" value={form.grade} onChange={e => setForm({ ...form, grade: e.target.value })} style={inputStyle} />
            <label style={labelStyle}>Remarks</label>
            <input type="text" placeholder="e.g. Excellent" value={form.remarks} onChange={e => setForm({ ...form, remarks: e.target.value })} style={{ ...inputStyle, marginBottom: '20px' }} />
            <button type="submit" style={btnPrimary} onMouseOver={e => (e.currentTarget.style.backgroundColor = '#6d28d9')} onMouseOut={e => (e.currentTarget.style.backgroundColor = '#7c3aed')}>Enroll Student</button>
          </form>
        </div>

        <div style={cardStyle}>
          <h5 style={{ fontWeight: '800', marginBottom: '4px', color: '#3b0764', fontSize: '17px' }}>Enrollment Records</h5>
          <p style={{ fontSize: '12px', color: '#a78bfa', marginBottom: '20px' }}>List of all student enrollments</p>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
            <thead>
              <tr style={{ backgroundColor: '#faf5ff' }}>
                {['Student', 'Course', 'Status', 'Grade', 'Actions'].map(h => <th key={h} style={{ padding: '12px 10px', textAlign: 'left', color: '#7c3aed', fontWeight: '700', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {enrollments.map(en => (
                <tr key={en.id} style={{ borderTop: '1px solid #f5f3ff' }} onMouseOver={e => (e.currentTarget.style.backgroundColor = '#faf5ff')} onMouseOut={e => (e.currentTarget.style.backgroundColor = 'white')}>
                  <td style={{ padding: '12px 10px', fontWeight: '600', color: '#3b0764' }}>{en.student.first_name} {en.student.last_name}</td>
                  <td style={{ padding: '12px 10px', color: '#6b7280' }}>{en.course.course_code}</td>
                  <td style={{ padding: '12px 10px' }}>
                    <span style={{ backgroundColor: en.status === 'Completed' ? '#f0fdf4' : '#ede9fe', color: en.status === 'Completed' ? '#16a34a' : '#7c3aed', padding: '2px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '700' }}>{en.status}</span>
                  </td>
                  <td style={{ padding: '12px 10px', color: '#6b7280' }}>{en.grade || 'N/A'}</td>
                  <td style={{ padding: '12px 10px' }}>
                    <button onClick={() => setEditModal({ ...en })} style={btnSmEdit} onMouseOver={e => { e.currentTarget.style.backgroundColor = '#7c3aed'; e.currentTarget.style.color = 'white'; }} onMouseOut={e => { e.currentTarget.style.backgroundColor = 'white'; e.currentTarget.style.color = '#7c3aed'; }}>Edit</button>
                    <button onClick={() => handleDelete(en.id)} style={btnSmDel} onMouseOver={e => { e.currentTarget.style.backgroundColor = '#dc3545'; e.currentTarget.style.color = 'white'; }} onMouseOut={e => { e.currentTarget.style.backgroundColor = 'white'; e.currentTarget.style.color = '#dc3545'; }}>Delete</button>
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
              <div>
                <h5 style={{ margin: 0, color: '#3b0764', fontWeight: '800' }}>Update Enrollment</h5>
                <p style={{ margin: 0, fontSize: '12px', color: '#a78bfa' }}>{editModal.student.first_name} {editModal.student.last_name} — {editModal.course.course_code}</p>
              </div>
              <button onClick={() => setEditModal(null)} style={{ background: 'none', border: 'none', fontSize: '22px', cursor: 'pointer', color: '#7c3aed' }}>×</button>
            </div>
            <form onSubmit={handleEdit}>
              <div style={{ padding: '20px 24px' }}>
                <label style={labelStyle}>Student</label>
                <input type="text" value={`${editModal.student.first_name} ${editModal.student.last_name}`} disabled style={{ ...inputStyle, backgroundColor: '#f3f4f6', color: '#9ca3af' }} />
                <label style={labelStyle}>Course</label>
                <input type="text" value={`${editModal.course.course_code} — ${editModal.course.course_name}`} disabled style={{ ...inputStyle, backgroundColor: '#f3f4f6', color: '#9ca3af' }} />
                <label style={labelStyle}>Status</label>
                <select value={editModal.status} onChange={e => setEditModal({ ...editModal, status: e.target.value })} style={inputStyle}><option>Enrolled</option><option>Completed</option></select>
                <label style={labelStyle}>Grade</label>
                <input type="text" placeholder="e.g. 1.25" value={editModal.grade} onChange={e => setEditModal({ ...editModal, grade: e.target.value })} style={inputStyle} />
                <label style={labelStyle}>Remarks</label>
                <input type="text" placeholder="e.g. Excellent" value={editModal.remarks} onChange={e => setEditModal({ ...editModal, remarks: e.target.value })} style={inputStyle} />
              </div>
              <div style={{ padding: '16px 24px', borderTop: '1px solid #ede9fe', display: 'flex', justifyContent: 'flex-end', gap: '10px', backgroundColor: '#faf5ff' }}>
                <button onClick={() => setEditModal(null)} type="button" style={{ padding: '9px 20px', borderRadius: '8px', border: '1.5px solid #ede9fe', cursor: 'pointer', backgroundColor: 'white', color: '#6b7280', fontWeight: '600', fontFamily: 'sans-serif' }}>Cancel</button>
                <button type="submit" style={{ ...btnPrimary, width: 'auto', padding: '9px 24px' }} onMouseOver={e => (e.currentTarget.style.backgroundColor = '#6d28d9')} onMouseOut={e => (e.currentTarget.style.backgroundColor = '#7c3aed')}>Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnrollmentList;