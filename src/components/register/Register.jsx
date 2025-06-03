import React from 'react';
import { useEffect } from 'react';
import './register.css';
import userRegister from '../../api/userRegister';

const Register = () => {
    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log('Form submitted');
      const form = document.getElementById('userForm');
  
      try {
        const response = await userRegister(form);
        console.log('Response:', response.code);

        localStorage.setItem("access_token", response.data.username)
        
        
      } catch (error) {
        console.error('Error during registration:', error);
      }
    };

  useEffect(() => {
      document.body.style.overflow = 'hidden';
  
      return () => {
        document.body.style.overflow = 'auto';
        document.documentElement.style.overflow = 'auto'; // penting!
      };
    }, []);

  return (
    <div>
      <div className="background-image"></div>

      <div
        className="container-fluid d-flex justify-content-center align-items-center"
        style={{ height: '100vh' }}
      >
        <div className="container-custom">
          <div className="card">
            <div className="card-header">Buat Akun</div>
            <div className="card-body">
              <form onSubmit={handleSubmit} id='userForm'>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    className="form-control"
                    id="username"
                    placeholder="Username"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                  />
                </div>
                {/* <div className="mb-3">
                  <label htmlFor="password2" className="form-label">
                    Konfirmasi Password
                  </label>
                  <input
                    type="password"
                    name="password2"
                    className="form-control"
                    id="password2"
                    placeholder="Konfirmasi Password"
                  />
                </div> */}
                <button type="submit" name="submit" className="btn btn-login">
                  Buat Akun
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
