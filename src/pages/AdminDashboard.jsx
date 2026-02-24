import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import AchievementForm from '../features/admin/AchievementForm';
import StudentList from '../features/admin/StudentList';
import AchievementChart from '../components/ui/AchievementChart';
import '../styles/Dashboard.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('add-achievement');
  const { currentUser, setCurrentUser, achievementList, students } = useAppContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    setCurrentUser(null);
    navigate('/');
  };

  const totalAchievements = achievementList.length;
  const totalAwards = achievementList.filter(a => a.category === 'award').length;
  const totalRecognitions = achievementList.filter(a => a.category === 'recognition').length;
  const totalParticipations = achievementList.filter(a => a.category === 'participation').length;

  const menuItems = [
    { id: 'add-achievement', icon: '➕', label: 'Add Achievement' },
    { id: 'students', icon: '👥', label: 'View Students' },
    { id: 'overview', icon: '📊', label: 'Overview' }
  ];

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <motion.nav
        className="sidebar"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="sidebar-header">
          <h2>Admin Panel</h2>
        </div>

        <div className="profile-section">
          <div className="admin-avatar">
            👨‍💼
          </div>
          <strong>{currentUser?.name}</strong>
          <span className="role-badge">Administrator</span>
        </div>

        <ul className="sidebar-menu">
          {menuItems.map((item) => (
            <li
              key={item.id}
              className={activeTab === item.id ? 'active' : ''}
              onClick={() => setActiveTab(item.id)}
            >
              <span className="menu-icon">{item.icon}</span>
              {item.label}
            </li>
          ))}

          <li className="logout-btn" onClick={handleLogout}>
            <span className="menu-icon">🚪</span>
            Logout
          </li>
        </ul>
      </motion.nav>

      {/* Main Content */}
      <div className="main-content">
        <motion.header
          className="dashboard-header"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div>
            <h1>Welcome, Admin! 👋</h1>
            <p style={{ color: 'var(--text-secondary)' }}>Manage student achievements and records</p>
          </div>
          <div className="header-trophy">🏆</div>
        </motion.header>

        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="stats-container">
                <div className="stat-card-admin">
                  <div className="stat-icon-admin" style={{ background: 'rgba(102, 126, 234, 0.2)', color: '#667eea' }}>🏆</div>
                  <div className="stat-content">
                    <h3>{totalAchievements}</h3>
                    <p>Total Achievements</p>
                  </div>
                </div>
                <div className="stat-card-admin">
                  <div className="stat-icon-admin" style={{ background: 'rgba(255, 215, 0, 0.2)', color: '#ffd700' }}>🥇</div>
                  <div className="stat-content">
                    <h3>{totalAwards}</h3>
                    <p>Awards</p>
                  </div>
                </div>
                <div className="stat-card-admin">
                  <div className="stat-icon-admin" style={{ background: 'rgba(255, 107, 107, 0.2)', color: '#ff6b6b' }}>⭐</div>
                  <div className="stat-content">
                    <h3>{totalRecognitions}</h3>
                    <p>Recognitions</p>
                  </div>
                </div>
                <div className="stat-card-admin">
                  <div className="stat-icon-admin" style={{ background: 'rgba(78, 205, 196, 0.2)', color: '#4ecdc4' }}>🎯</div>
                  <div className="stat-content">
                    <h3>{totalParticipations}</h3>
                    <p>Participations</p>
                  </div>
                </div>
              </div>

              {achievementList.length > 0 && (
                <div style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--border-light)', marginBottom: '2rem' }}>
                  <AchievementChart achievements={achievementList} />
                </div>
              )}

              <div className="stat-card-admin" style={{ justifyContent: 'center', textAlign: 'center', flexDirection: 'column' }}>
                <div style={{ fontSize: '3rem' }}>👥</div>
                <h3>{students.length}</h3>
                <p>Total Registered Students</p>
              </div>
            </motion.div>
          )}

          {activeTab === 'add-achievement' && (
            <motion.div
              key="add"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <AchievementForm />
            </motion.div>
          )}

          {activeTab === 'students' && (
            <motion.div
              key="students"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <StudentList />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdminDashboard;
