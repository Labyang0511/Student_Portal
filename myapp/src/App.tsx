import React, { useState } from 'react';
import LandingPage from './pages/LandingPage';
import Navbar from './components/Navbar';
import StudentList from './components/StudentList';
import TeacherList from './components/TeacherList';
import CourseList from './components/CourseList';
import EnrollmentList from './components/EnrollmentList';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('enrollments');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const renderPage = () => {
    switch (currentPage) {
      case 'students': return <StudentList />;
      case 'teachers': return <TeacherList />;
      case 'courses': return <CourseList />;
      case 'enrollments': return <EnrollmentList />;
      default: return <EnrollmentList />;
    }
  };

  if (!isLoggedIn) {
    return <LandingPage onGetStarted={() => setIsLoggedIn(true)} />;
  }

  return (
    <div style={{ backgroundColor: '#f8f7ff', minHeight: '100vh' }}>
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} onLogout={() => setIsLoggedIn(false)} />
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px' }}>

        {/* Page Header */}
        <div style={{ marginBottom: '28px' }}>
          <h2 style={{ color: '#3b0764', fontSize: '26px', fontWeight: '800', margin: 0, fontFamily: 'Georgia, serif' }}>
            {currentPage.charAt(0).toUpperCase() + currentPage.slice(1)}
          </h2>
          <p style={{ color: '#9ca3af', fontSize: '14px', margin: '4px 0 0', fontFamily: 'sans-serif' }}>
            Manage your {currentPage} records below
          </p>
        </div>

        {renderPage()}
      </div>
    </div>
  );
};

export default App;