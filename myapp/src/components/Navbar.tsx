import React from 'react';

interface NavLink { label: string; page: string; }
interface NavbarProps { currentPage: string; setCurrentPage: (page: string) => void; onLogout: () => void; }

const Navbar: React.FC<NavbarProps> = ({ currentPage, setCurrentPage, onLogout }) => {
  const links: NavLink[] = [
    { label: 'Enrollments', page: 'enrollments' },
    { label: 'Students', page: 'students' },
    { label: 'Teachers', page: 'teachers' },
    { label: 'Courses', page: 'courses' },
  ];

  return (
    <nav style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #ede9fe', padding: '0 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '64px', position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 1px 8px rgba(124,58,237,0.07)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }} onClick={() => setCurrentPage('enrollments')}>
        <div style={{ width: '34px', height: '34px', borderRadius: '8px', backgroundColor: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>🎓</div>
        <span style={{ fontWeight: '800', fontSize: '16px', color: '#3b0764', letterSpacing: '0.5px' }}>ENROLLMENT SYSTEM</span>
      </div>

      <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
        {links.map(link => (
          <button key={link.page} onClick={() => setCurrentPage(link.page)}
            style={{
              background: currentPage === link.page ? '#ede9fe' : 'transparent',
              color: currentPage === link.page ? '#7c3aed' : '#6b7280',
              border: 'none', padding: '8px 16px', borderRadius: '8px',
              cursor: 'pointer', fontSize: '14px',
              fontWeight: currentPage === link.page ? '700' : '500',
              transition: 'all 0.15s',
            }}
            onMouseOver={e => { if (currentPage !== link.page) { e.currentTarget.style.backgroundColor = '#f5f3ff'; e.currentTarget.style.color = '#7c3aed'; } }}
            onMouseOut={e => { if (currentPage !== link.page) { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#6b7280'; } }}>
            {link.label}
          </button>
        ))}
        <div style={{ width: '1px', height: '24px', backgroundColor: '#ede9fe', margin: '0 8px' }} />
        <button onClick={onLogout}
          style={{ backgroundColor: '#7c3aed', color: 'white', border: 'none', padding: '8px 18px', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '600', transition: 'background 0.15s' }}
          onMouseOver={e => (e.currentTarget.style.backgroundColor = '#6d28d9')}
          onMouseOut={e => (e.currentTarget.style.backgroundColor = '#7c3aed')}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;