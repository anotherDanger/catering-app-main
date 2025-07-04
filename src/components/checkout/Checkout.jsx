import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchDistrictsByRegency, fetchVillagesByDistrict } from '../../api/wilayah';
import { postCheckout } from '../../api/checkout';
import './checkout.css';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const checkoutData = location.state || {};
  const [districts, setDistricts] = useState([]);
  const [villages, setVillages] = useState([]);
  const [form, setForm] = useState({
    nama: '',
    no_hp: '',
    alamat: '',
    kecamatan: '',
    desa: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    async function loadDistricts() {
      try {
        const data = await fetchDistrictsByRegency('3301');
        setDistricts(data);
      } catch (e) {
        alert(e.message);
      }
    }
    loadDistricts();
    return () => {
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
    };
  }, []);

  const validateNoHp = (value) => {
    if (!/^08\d{0,11}$/.test(value)) {
      return 'Nomor HP harus diawali 08 dan maksimal 13 digit angka';
    }
    return '';
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;

    if (name === 'no_hp') {
      const numericValue = value.replace(/[^0-9]/g, '');
      const errorMsg = validateNoHp(numericValue);
      setErrors(prev => ({ ...prev, no_hp: errorMsg }));
      setForm(prev => ({ ...prev, [name]: numericValue }));
      return;
    }

    setForm(prev => ({ ...prev, [name]: value }));

    if (name === 'kecamatan') {
      setVillages([]);
      setForm(prev => ({ ...prev, desa: '' }));
      const selected = districts.find(d => d.name === value);
      if (selected) {
        try {
          const villageData = await fetchVillagesByDistrict(selected.id);
          setVillages(villageData);
        } catch (e) {
          alert(e.message);
        }
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (errors.no_hp) {
      alert(errors.no_hp);
      return;
    }
    if (!form.no_hp || !/^08\d{8,11}$/.test(form.no_hp)) {
      alert('Nomor HP harus diawali 08 dan berjumlah 10-13 digit angka');
      return;
    }
    try {
      const username = localStorage.getItem('user') || '';
      const payload = {
        ...form,
        product_id: checkoutData.product?.product_id || '',
        product_name: checkoutData.product?.product_name || '',
        quantity: checkoutData.quantity || 0,
        total: checkoutData.total || 0,
        username
      };
      await postCheckout(payload);
      alert('Silahkan hubungi admin untuk konfirmasi');
      navigate('/');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="checkout-container">
      <div className="checkout-card">
        <div className="checkout-card-body">
          <div className="checkout-card-title">Pembayaran</div>
          <form onSubmit={handleSubmit}>
            <div className="checkout-form-group">
              <label htmlFor="nama">Nama</label>
              <input type="text" id="nama" name="nama" className="form-control" value={form.nama} onChange={handleChange} required />
            </div>
            <div className="checkout-form-group">
              <label htmlFor="no_hp">Nomor HP</label>
              <input type="tel" id="no_hp" name="no_hp" className="form-control" value={form.no_hp} onChange={handleChange} maxLength={13} required />
              {errors.no_hp && <small className="text-danger">{errors.no_hp}</small>}
            </div>
            <div className="checkout-form-group">
              <label htmlFor="alamat">Alamat Lengkap</label>
              <input type="text" id="alamat" name="alamat" className="form-control" value={form.alamat} onChange={handleChange} required />
            </div>
            <div className="checkout-form-group">
              <label htmlFor="kecamatan">Kecamatan</label>
              <select id="kecamatan" name="kecamatan" className="form-control" value={form.kecamatan} onChange={handleChange} required>
                <option value="">Pilih Kecamatan</option>
                {districts.map(d => (
                  <option key={d.id} value={d.name}>{d.name}</option>
                ))}
              </select>
            </div>
            <div className="checkout-form-group">
              <label htmlFor="desa">Kelurahan / Desa</label>
              <select id="desa" name="desa" className="form-control" value={form.desa} onChange={handleChange} required>
                <option value="">Pilih Desa</option>
                {villages.map(v => (
                  <option key={v.id} value={v.name}>{v.name}</option>
                ))}
              </select>
            </div>
            <div className="checkout-form-group">
              <label>Total Harga</label>
              <div className="fw-bold">Rp {checkoutData.total ? checkoutData.total.toLocaleString() : '0'}</div>
            </div>
            <button type="submit" className="btn btn-primary w-100 mt-3">Buat Pesanan</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;