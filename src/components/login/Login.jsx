import React from 'react';
import './login.css';

const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login form submitted');
  };

  return (
    <div className="login-container login-container-fluid">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="login-card card">
            <div className="login-card-header card-header">Masuk</div>
            <div className="login-card-body card-body">
              <form onSubmit={handleSubmit}>
                {/* <p className="login-error">Error message here</p> */}

                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Username</label>
                  <input
                    type="text"
                    name="username"
                    className="form-control"
                    id="username"
                    placeholder="Username"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                  />
                </div>

                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="remember"
                    name="remember"
                  />
                  <label className="form-check-label" htmlFor="remember">
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
  );
};

export default Login;
