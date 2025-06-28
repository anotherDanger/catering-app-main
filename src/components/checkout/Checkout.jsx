import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { fetchDistrictsByRegency, fetchVillagesByDistrict } from '../../api/wilayah'
import './checkout.css'

const Checkout = () => {
  const location = useLocation()
  const checkoutData = location.state || {}

  const [districts, setDistricts] = useState([])
  const [villages, setVillages] = useState([])
  const [form, setForm] = useState({
    nama: '',
    no_hp: '',
    alamat: '',
    kecamatan: '',
    desa: '',
  })

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    async function loadDistricts() {
      try {
        const data = await fetchDistrictsByRegency('3301')
        setDistricts(data)
      } catch (e) {
        alert(e.message)
      }
    }
    loadDistricts()
    return () => {
      document.body.style.overflow = 'auto'
      document.documentElement.style.overflow = 'auto'
    }
  }, [])

  const handleChange = async (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))

    if (name === 'kecamatan') {
      const selected = districts.find(d => d.name === value)
      if (selected) {
        try {
          const villageData = await fetchVillagesByDistrict(selected.id)
          setVillages(villageData)
          setForm(prev => ({ ...prev, desa: '' }))
        } catch (e) {
          alert(e.message)
        }
      }
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Checkout data:', form)
  }

  return (
    <div className="checkout-container">
      <div className="checkout-card">
        <div className="checkout-card-body">
          <h3>Pembayaran</h3>
          <form onSubmit={handleSubmit}>
            <div className="checkout-form-group">
              <label htmlFor="nama">Nama</label>
              <input type="text" id="nama" name="nama" className="form-control" value={form.nama} onChange={handleChange} required />
            </div>

            <div className="checkout-form-group">
              <label htmlFor="no_hp">Nomor HP</label>
              <input type="text" id="no_hp" name="no_hp" className="form-control" value={form.no_hp} onChange={handleChange} required />
            </div>

            <div className="checkout-form-group">
              <label htmlFor="alamat">Alamat</label>
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

            <div className="checkout-icon-container">
              <button type="button" className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#modalSpay">ShopeePay</button>
              <button type="button" className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#modalGopay">GoPay</button>
              <button type="button" className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#modalDana">DANA</button>
            </div>

            <button type="submit" className="btn btn-primary w-100 mt-3">Buat Pesanan</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Checkout
