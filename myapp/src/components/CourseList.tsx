import React, { useState } from 'react';

interface Teacher { id: number; first_name: string; last_name: string; }
interface Course { id: number; course_code: string; course_name: string; units: number; schedule: string; room_number: string; teacher: Teacher; }
interface CourseForm { code: string; name: string; units: string; schedule: string; teacher_id: string; }

const inputStyle: React.CSSProperties = { width: '100%', padding: '9px 12px', marginBottom: '10px', borderRadius: '8px', border: '1.5px solid #ede9fe', fontSize: '14px', boxSizing: 'border-box', outline: 'none', fontFamily: 'sans-serif', color: '#3b0764', backgroundColor: '#faf5ff' };
const labelStyle: React.CSSProperties = { fontSize: '12px', fontWeight: '700', color: '#7c3aed', display: 'block', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' };
const cardStyle: React.CSSProperties = { borderRadius: '14px', border: '1px solid #ede9fe', padding: '28px', backgroundColor: 'white', boxShadow: '0 2px 12px rgba(124,58,237,0.06)' };
const btnPrimary: React.CSSProperties = { backgroundColor: '#7c3aed', border: 'none', color: 'white', padding: '11px 16px', borderRadius: '8px', cursor: 'pointer', width: '100%', fontWeight: '700', fontSize: '14px', fontFamily: 'sans-serif' };
const btnSmEdit: React.CSSProperties = { padding: '5px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', marginRight: '6px', border: '1.5px solid #7c3aed', color: '#7c3aed', backgroundColor: 'white', fontWeight: '600', fontFamily: 'sans-serif' };
const btnSmDel: React.CSSProperties = { padding: '5px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', border: '1.5px solid #dc3545', color: '#dc3545', backgroundColor: 'white', fontWeight: '600', fontFamily: 'sans-serif' };

const sampleTeachers: Teacher[] = [
  { id: 1, first_name: 'Jose', last_name: 'Rizal' },
  { id: 2, first_name: 'Ana', last_name: 'Reyes' },
];

const CourseList: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([
    { id: 1, course_code: 'CS101', course_name: 'Introduction to Computing', units: 3, schedule: 'MWF 8-9am', room_number: 'Room 1', teacher: sampleTeachers[0] },
    { id: 2, course_code: 'IT201', course_name: 'Web Development', units: 3, schedule: 'TTH 10-11:30am', room_number: 'Room 2', teacher: sampleTeachers[1] },
  ]);
  const [form, setForm] = useState<CourseForm>({ code: '', name: '', units: '', schedule: '', teacher_id: String(sampleTeachers[0].id) });
  const [editModal, setEditModal] = useState<Course | null>(null);
  const [alert, setAlert] = useState('');

  const showAlert = (msg: string) => { setAlert(msg); setTimeout(() => setAlert(''), 3000); };
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const teacher = sampleTeachers.find(t => t.id === Number(form.teacher_id));
    if (!teacher) return;
    setCourses([...courses, { id: Date.now(), course_code: form.code, course_name: form.name, units: Number(form.units), schedule: form.schedule, room_number: '', teacher }]);
    setForm({ code: '', name: '', units: '', schedule: '', teacher_id: String(sampleTeachers[0].id) });
    showAlert('Course added!');
  };
  const handleEdit = (e: React.FormEvent) => { e.preventDefault(); if (!editModal) return; setCourses(courses.map(c => c.id === editModal.id ? { ...editModal } : c)); setEditModal(null); showAlert('Course updated!'); };
  const handleDelete = (id: number) => { if (window.confirm('Delete this course?')) { setCourses(courses.filter(c => c.id !== id)); showAlert('Course deleted.'); } };

  return (
    <div>
      {alert && <div style={{ backgroundColor: '#ede9fe', color: '#6d28d9', padding: '12px 16px', borderRadius: '8px', marginBottom: '16px', fontWeight: '600', fontSize: '14px' }}>✓ {alert}</div>}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px' }}>
        <div style={cardStyle}>
          <h5 style={{ fontWeight: '800', marginBottom: '4px', color: '#3b0764', fontSize: '17px' }}>Create New Course</h5>
          <p style={{ fontSize: '12px', color: '#a78bfa', marginBottom: '20px' }}>Add a new course to the system</p>
          <form onSubmit={handleAdd}>
            <label style={labelStyle}>Subject Code</label><input type="text" placeholder="Subject Code" value={form.code} onChange={e => setForm({ ...form, code: e.target.value })} style={inputStyle} required />
            <label style={labelStyle}>Course Title</label><input type="text" placeholder="Course Title" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={inputStyle} required />
            <label style={labelStyle}>Units</label><input type="number" placeholder="Units" value={form.units} onChange={e => setForm({ ...form, units: e.target.value })} style={inputStyle} required />
            <label style={labelStyle}>Schedule</label><input type="text" placeholder="Schedule" value={form.schedule} onChange={e => setForm({ ...form, schedule: e.target.value })} style={inputStyle} />
            <label style={labelStyle}>Instructor</label>
            <select value={form.teacher_id} onChange={e => setForm({ ...form, teacher_id: e.target.value })} style={{ ...inputStyle, marginBottom: '20px' }}>
              {sampleTeachers.map(t => <option key={t.id} value={t.id}>{t.first_name} {t.last_name}</option>)}
            </select>
            <button type="submit" style={btnPrimary} onMouseOver={e => (e.currentTarget.style.backgroundColor = '#6d28d9')} onMouseOut={e => (e.currentTarget.style.backgroundColor = '#7c3aed')}>Add Course</button>
          </form>
        </div>

        <div style={cardStyle}>
          <h5 style={{ fontWeight: '800', marginBottom: '4px', color: '#3b0764', fontSize: '17px' }}>Course List</h5>
          <p style={{ fontSize: '12px', color: '#a78bfa', marginBottom: '20px' }}>List of all available courses</p>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
            <thead>
              <tr style={{ backgroundColor: '#faf5ff' }}>
                {['Code', 'Title', 'Teacher', 'Action'].map(h => <th key={h} style={{ padding: '12px 10px', textAlign: 'left', color: '#7c3aed', fontWeight: '700', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {courses.map(c => (
                <tr key={c.id} style={{ borderTop: '1px solid #f5f3ff' }} onMouseOver={e => (e.currentTarget.style.backgroundColor = '#faf5ff')} onMouseOut={e => (e.currentTarget.style.backgroundColor = 'white')}>
                  <td style={{ padding: '12px 10px' }}><span style={{ backgroundColor: '#ede9fe', color: '#7c3aed', padding: '2px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: '700' }}>{c.course_code}</span></td>
                  <td style={{ padding: '12px 10px', color: '#3b0764', fontWeight: '600' }}>{c.course_name}</td>
                  <td style={{ padding: '12px 10px', color: '#6b7280' }}>{c.teacher.first_name} {c.teacher.last_name}</td>
                  <td style={{ padding: '12px 10px' }}>
                    <button onClick={() => setEditModal({ ...c })} style={btnSmEdit} onMouseOver={e => { e.currentTarget.style.backgroundColor = '#7c3aed'; e.currentTarget.style.color = 'white'; }} onMouseOut={e => { e.currentTarget.style.backgroundColor = 'white'; e.currentTarget.style.color = '#7c3aed'; }}>Edit</button>
                    <button onClick={() => handleDelete(c.id)} style={btnSmDel} onMouseOver={e => { e.currentTarget.style.backgroundColor = '#dc3545'; e.currentTarget.style.color = 'white'; }} onMouseOut={e => { e.currentTarget.style.backgroundColor = 'white'; e.currentTarget.style.color = '#dc3545'; }}>Delete</button>
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
              <div><h5 style={{ margin: 0, color: '#3b0764', fontWeight: '800' }}>Edit Course</h5><p style={{ margin: 0, fontSize: '12px', color: '#a78bfa' }}>{editModal.course_code}</p></div>
              <button onClick={() => setEditModal(null)} style={{ background: 'none', border: 'none', fontSize: '22px', cursor: 'pointer', color: '#7c3aed' }}>×</button>
            </div>
            <form onSubmit={handleEdit}>
              <div style={{ padding: '20px 24px' }}>
                <label style={labelStyle}>Subject Code</label><input type="text" value={editModal.course_code} onChange={e => setEditModal({ ...editModal, course_code: e.target.value })} style={inputStyle} />
                <label style={labelStyle}>Course Name</label><input type="text" value={editModal.course_name} onChange={e => setEditModal({ ...editModal, course_name: e.target.value })} style={inputStyle} />
                <label style={labelStyle}>Units</label><input type="number" value={editModal.units} onChange={e => setEditModal({ ...editModal, units: Number(e.target.value) })} style={inputStyle} />
                <label style={labelStyle}>Schedule</label><input type="text" value={editModal.schedule} onChange={e => setEditModal({ ...editModal, schedule: e.target.value })} style={inputStyle} />
                <label style={labelStyle}>Room Number</label><input type="text" placeholder="Room Number" value={editModal.room_number} onChange={e => setEditModal({ ...editModal, room_number: e.target.value })} style={inputStyle} />
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

export default CourseList;