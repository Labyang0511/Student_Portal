import React from 'react';

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f7ff', display: 'flex', flexDirection: 'column', fontFamily: 'sans-serif' }}>

      {/* NAVBAR */}
      <nav style={{ padding: '20px 60px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#ffffff', borderBottom: '1px solid #ede9fe' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>🎓</div>
          <span style={{ fontWeight: 'bold', fontSize: '18px', color: '#3b0764', letterSpacing: '0.5px' }}>ENROLLMENT SYSTEM</span>
        </div>
      </nav>

      {/* HERO */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 40px', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#ede9fe', color: '#7c3aed', padding: '6px 16px', borderRadius: '20px', fontSize: '13px', fontWeight: '600', marginBottom: '32px' }}>
          ✦ Student Portal Management System
        </div>

        <h1 style={{ fontSize: '64px', fontWeight: 'bold', color: '#3b0764', lineHeight: '1.1', marginBottom: '24px', maxWidth: '800px', fontFamily: 'Georgia, serif' }}>
          Manage Students,<br /><span style={{ color: '#7c3aed' }}>Effortlessly.</span>
        </h1>

        <p style={{ fontSize: '18px', color: '#6b7280', maxWidth: '520px', lineHeight: '1.7', marginBottom: '48px' }}>
          A complete enrollment management system for students, teachers, courses, and academic records — all in one place.
        </p>

        <button
          onClick={onGetStarted}
          style={{ backgroundColor: '#7c3aed', color: 'white', border: 'none', padding: '16px 48px', borderRadius: '10px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold', boxShadow: '0 4px 20px rgba(124,58,237,0.35)', transition: 'all 0.2s' }}
          onMouseOver={e => { e.currentTarget.style.backgroundColor = '#6d28d9'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
          onMouseOut={e => { e.currentTarget.style.backgroundColor = '#7c3aed'; e.currentTarget.style.transform = 'translateY(0)'; }}
        >
          Get Started →
        </button>
      </div>

      {/* FEATURES */}
      <div style={{ backgroundColor: '#ffffff', padding: '80px 60px', borderTop: '1px solid #ede9fe' }}>
        <h2 style={{ textAlign: 'center', fontSize: '36px', color: '#3b0764', marginBottom: '12px', fontFamily: 'Georgia, serif' }}>Everything you need</h2>
        <p style={{ textAlign: 'center', color: '#9ca3af', fontSize: '15px', marginBottom: '52px' }}>Four powerful modules to manage your entire enrollment process</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px', maxWidth: '960px', margin: '0 auto' }}>
          {[
            { icon: '👨‍🎓', title: 'Students', desc: 'Register and manage student profiles, programs, and year levels.' },
            { icon: '👨‍🏫', title: 'Teachers', desc: 'Track instructor specializations, departments, and employment status.' },
            { icon: '📚', title: 'Courses', desc: 'Create courses with schedules, units, and assigned instructors.' },
            { icon: '📋', title: 'Enrollments', desc: 'Enroll students in courses and track grades and completion status.' },
          ].map(f => (
            <div key={f.title}
              style={{ backgroundColor: '#faf5ff', border: '1px solid #ede9fe', borderRadius: '12px', padding: '28px 24px', transition: 'all 0.2s', cursor: 'default' }}
              onMouseOver={e => { e.currentTarget.style.borderColor = '#7c3aed'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(124,58,237,0.1)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
              onMouseOut={e => { e.currentTarget.style.borderColor = '#ede9fe'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)'; }}>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>{f.icon}</div>
              <h3 style={{ color: '#3b0764', fontSize: '17px', marginBottom: '8px', fontWeight: '700' }}>{f.title}</h3>
              <p style={{ color: '#6b7280', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ backgroundColor: '#3b0764', color: '#c4b5fd', textAlign: 'center', padding: '24px', fontSize: '13px' }}>
        🎓 Enrollment System — Built with Django & React
      </footer>
    </div>
  );
};

export default LandingPage;