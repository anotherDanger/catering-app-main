import React, { useEffect, useState } from 'react';
import './register.css';
import { registerUser } from '../../api/getProfile';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    username: '',
    password: '',
    password2: '',
    no_hp: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (form.password !== form.password2) {
      setError('Password dan konfirmasi password tidak cocok');
      return;
    }

    if (form.no_hp.length > 12) {
      setError('Nomor HP maksimal 12 digit');
      return;
    }

    try {
      await registerUser({
        first_name: form.first_name,
        last_name: form.last_name,
        username: form.username,
        password: form.password,
        no_hp: form.no_hp
      });
      navigate('/');
    } catch (err) {
      setError(err.message || 'Registrasi gagal');
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
      <div className="background-image"></div>
      <div
        className="container-fluid d-flex justify-content-center align-items-center"
        style={{ height: '100vh' }}
      >
        <div className="container-custom">
          <div className="card">
            <div className="card-header">Buat Akun</div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                {error && <p className="text-danger">{error}</p>}
                <div className="mb-3">
                  <label htmlFor="first_name" className="form-label">Nama Depan</label>
                  <input
                    type="text"
                    name="first_name"
                    className="form-control"
                    id="first_name"
                    value={form.first_name}
                    onChange={handleChange}
                    required
                    placeholder="Nama Depan"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="last_name" className="form-label">Nama Belakang</label>
                  <input
                    type="text"
                    name="last_name"
                    className="form-control"
                    id="last_name"
                    value={form.last_name}
                    onChange={handleChange}
                    required
                    placeholder="Nama Belakang"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Username</label>
                  <input
                    type="text"
                    name="username"
                    className="form-control"
                    id="username"
                    value={form.username}
                    onChange={handleChange}
                    required
                    placeholder="Username"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="no_hp" className="form-label">Nomor HP</label>
                  <input
                    type="text"
                    name="no_hp"
                    className="form-control"
                    id="no_hp"
                    value={form.no_hp}
                    onChange={handleChange}
                    required
                    maxLength={12}
                    placeholder="Nomor HP"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    id="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    placeholder="Password"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password2" className="form-label">Konfirmasi Password</label>
                  <input
                    type="password"
                    name="password2"
                    className="form-control"
                    id="password2"
                    value={form.password2}
                    onChange={handleChange}
                    required
                    placeholder="Konfirmasi Password"
                  />
                </div>
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
