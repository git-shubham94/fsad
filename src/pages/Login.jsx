import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { motion } from 'framer-motion';
import '../styles/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaCode, setCaptchaCode] = useState('');
  const { setCurrentUser, students } = useAppContext();
  const navigate = useNavigate();

  // Generate random captcha
  const generateCaptcha = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
    let captcha = '';
    for (let i = 0; i < 6; i++) {
      captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(captcha);
    setCaptchaInput('');
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    // Verify captcha
    if (captchaInput !== captchaCode) {
      alert('❌ Invalid captcha! Please try again.');
      generateCaptcha();
      return;
    }

    if (role === 'student') {
      const student = students.find(s => s.email === email && s.password === password);
      if (student) {
        setCurrentUser({ ...student, role: 'student' });
        navigate('/student');
      } else {
        alert('❌ Invalid email or password!');
        generateCaptcha();
      }
    } else {
      setCurrentUser({ email, role: 'admin', name: 'Admin User' });
      navigate('/admin');
    }
  };

  return (
    <div className="login-container">
      {/* Back Button */}
      <motion.button
        className="back-home-btn"
        onClick={() => navigate('/')}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        ← Back to Home
      </motion.button>

      <motion.div
        className="login-card"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="login-header">
          <div className="login-icon-group">
            <motion.span animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>⚛️</motion.span>
          </div>
          <h1>Welcome Back</h1>
          <p>Access your student portal</p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="form-group">
            <label>Login As</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="student">Student</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="form-group captcha-group">
            <label>Verify you are human</label>
            <div className="captcha-container">
              <div className="captcha-display">
                {captchaCode}
              </div>
              <button
                type="button"
                className="captcha-refresh"
                onClick={generateCaptcha}
                title="Refresh Captcha"
              >
                🔄
              </button>
            </div>
            <input
              type="text"
              value={captchaInput}
              onChange={(e) => setCaptchaInput(e.target.value)}
              placeholder="Enter code"
              required
              maxLength={6}
            />
          </div>

          <motion.button
            type="submit"
            className="login-btn"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Login
          </motion.button>
        </form>

        <div className="register-link">
          Don't have an account?
          <button onClick={() => navigate('/register')}>Register here</button>
        </div>

        <div className="demo-credentials">
          <div className="demo-header">
            <strong>Demo Credentials</strong>
          </div>
          <div className="demo-item">
            <span className="role-badge student-badge">Student</span>
            <span>rahul@student.com / password123</span>
          </div>
          <div className="demo-item">
            <span className="role-badge admin-badge">Admin</span>
            <span>admin@college.edu / admin123</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
