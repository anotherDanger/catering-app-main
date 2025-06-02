import { useEffect } from 'react';
import React from 'react';
import './checkout.css';

const Checkout = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Checkout submitted');
  };

    useEffect(() => {
        document.body.style.overflow = 'hidden';
    
        return () => {
          document.body.style.overflow = 'auto';
          document.documentElement.style.overflow = 'auto'; // penting!
        };
      }, []);

  return (
    <div className="checkout-container">
      <div className="checkout-card">
        <div className="checkout-card-img">
          {/* Tidak ada gambar */}
        </div>
        <div className="checkout-card-body">
          <div className="checkout-card-title">
            <h3>Pembayaran</h3>
          </div>
          <form onSubmit={handleSubmit}>
            <input type="hidden" name="product_id" value="123" />
            <input type="hidden" name="quantity" value="1" />

            <div className="checkout-form-group">
              <label htmlFor="nama">Nama</label>
              <input type="text" name="nama" id="nama" className="form-control" required />
            </div>

            <div className="checkout-form-group">
              <label htmlFor="no_hp">Nomor HP</label>
              <input type="text" name="no_hp" id="no_hp" className="form-control" required />
            </div>

            <div className="checkout-form-group">
              <label htmlFor="alamat">Alamat</label>
              <input type="text" name="alamat" id="alamat" className="form-control" required />
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

      {/* Modal ShopeePay */}
      <div className="modal fade" id="modalSpay" tabIndex="-1" aria-labelledby="modalSpayLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalSpayLabel">ShopeePay</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              Silakan bayar ke 08xxxxxx dan konfirmasi via WA ke Admin.
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Tutup</button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal GoPay */}
      <div className="modal fade" id="modalGopay" tabIndex="-1" aria-labelledby="modalGopayLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalGopayLabel">GoPay</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              Silakan bayar ke 08xxxxxx dan konfirmasi via WA ke Admin.
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Tutup</button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal DANA */}
      <div className="modal fade" id="modalDana" tabIndex="-1" aria-labelledby="modalDanaLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalDanaLabel">DANA</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              Silakan bayar ke 08xxxxxx dan konfirmasi via WA ke Admin.
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Tutup</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
