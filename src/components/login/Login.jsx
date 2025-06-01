import React from 'react';
import { useEffect } from 'react';
import './login.css'
const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login form submitted');
  };

  useEffect(() => {
    // Saat masuk login, matikan scroll (jika mau)
    document.body.style.overflow = 'hidden';

    return () => {
      // Saat keluar dari login, aktifkan scroll lagi
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto'; // penting!
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
                {/* <p className="login-error-message">Error message here</p> */}

                <div className="mb-3 login-form-group">
                  <label htmlFor="username" className="form-label login-label">Username</label>
                  <input
                    type="text"
                    name="username"
                    className="form-control login-input"
                    id="username"
                    placeholder="Username"
                  />
                </div>

                <div className="mb-3 login-form-group">
                  <label htmlFor="password" className="form-label login-label">Password</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control login-input"
                    id="password"
                    placeholder="Password"
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
