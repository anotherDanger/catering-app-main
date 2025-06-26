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
    <div>
      <div className="login-wrapper login-container-fluid">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div className="login-card card">
              <div className="login-card-header card-header">Masuk</div>
              <div className="login-card-body card-body">
                <form onSubmit={handleSubmit} className="login-form">
                  {error && <p className="login-error-message">{error}</p>}
                  <div className="mb-3 login-form-group">
                    <label htmlFor="username" className="form-label login-label">username</label>
                    <input
                      type="text"
                      name="username"
                      className="form-control login-input"
                      id="username"
                      value={form.username}
                      onChange={handleChange}
                      placeholder="username"
                      required
                    />
                  </div>

                  <div className="mb-3 login-form-group">
                    <label htmlFor="password" className="form-label login-label">Password</label>
                    <input
                      type="password"
                      name="password"
                      className="form-control login-input"
                      id="password"
                      value={form.password}
                      onChange={handleChange}
                      placeholder="Password"
                      required
                    />
                  </div>

                  <div className="mb-3 form-check login-form-check">
                    <input
                      type="checkbox"
                      className="form-check-input login-checkbox"
                      id="remember"
                      name="remember"
                    />
                    <label className="form-check-label login-check-label" htmlFor="remember">
                      Ingat Saya
                    </label>
                  </div>

                  <button type="submit" name="login" className="btn login-btn">
                    Masuk
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
