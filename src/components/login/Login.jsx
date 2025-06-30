import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import { loginUser } from '../../api/getProfile';

const Login = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await loginUser({ username: form.username, password: form.password });
      navigate('/');
    } catch (err) {
      setError(err.message || 'Login gagal');
    }
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="login-page-wrapper">
      <div className="login-card">
        <div className="login-card-header">Masuk</div>
        <div className="login-card-body">
          <form onSubmit={handleSubmit} className="login-form">
            {error && <p className="login-error-message">{error}</p>}
            <div className="login-form-group">
              <label htmlFor="username" className="login-label">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                className="login-input"
                value={form.username}
                onChange={handleChange}
                placeholder="username"
                required
              />
            </div>
            <div className="login-form-group">
              <label htmlFor="password" className="login-label">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                className="login-input"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                required
              />
            </div>
            <div className="login-form-check">
              <input
                type="checkbox"
                id="remember"
                name="remember"
                className="login-checkbox"
              />
              <label htmlFor="remember" className="login-check-label">Ingat Saya</label>
            </div>
            <button type="submit" className="login-btn">Masuk</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
