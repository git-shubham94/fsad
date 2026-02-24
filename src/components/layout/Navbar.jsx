import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAppContext } from '../../context/AppContext';

const Navbar = () => {
  const { currentUser, setCurrentUser } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    setCurrentUser(null);
    navigate('/login');
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    ...(currentUser ? [] : [
      { path: '/login', label: 'Login' },
      { path: '/register', label: 'Register' }
    ]),
    ...(currentUser?.role === 'admin' ? [{ path: '/admin', label: 'Dashboard' }] : []),
    ...(currentUser?.role === 'student' ? [{ path: '/student', label: 'Dashboard' }] : []),
  ];

  return (
    <motion.nav
      className="navbar glass-panel"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      style={{
        position: 'fixed',
        top: '10px',
        left: '200%',
        transform: 'translateX(-50%)',
        width: '90%',
        maxWidth: '600px',
        zIndex: 1000,
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: '0 auto'
      }}
    >


      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            style={{
              position: 'relative',
              color: location.pathname === link.path ? 'var(--primary)' : 'var(--text-secondary)',
              fontWeight: 500
            }}
          >
            {location.pathname === link.path && (
              <motion.div
                layoutId="nav-glow"
                style={{
                  position: 'absolute',
                  bottom: '-5px',
                  left: 0,
                  right: 0,
                  height: '2px',
                  background: 'var(--primary)',
                  boxShadow: '0 0 10px var(--primary)'
                }}
              />
            )}
            {link.label}
          </Link>
        ))}

        {currentUser && (
          <motion.button
            onClick={handleLogout}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: 'rgba(255, 50, 50, 0.1)',
              color: '#ff5555',
              border: '1px solid rgba(255, 50, 50, 0.2)',
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              fontSize: '0.9rem'
            }}
          >
            Logout
          </motion.button>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
