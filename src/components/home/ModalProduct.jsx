import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function ModalProduct() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const closeModal = () => {
    const modalEl = document.getElementById('productModal');
    if (modalEl) {
      const modalInstance = window.bootstrap.Modal.getInstance(modalEl);
      if (modalInstance) {
        modalInstance.hide();
      }
    }
  };

  const handleNavigate = (path) => {
    closeModal();

    const modalEl = document.getElementById('productModal');
    if (modalEl) {
      modalEl.addEventListener('hidden.bs.modal', () => {
        navigate(path);
      }, { once: true });
    } else {
      navigate(path);
    }
  };

  useEffect(() => {
    // Cek apakah access_token tersedia
    const token = localStorage.getItem('access_token');
    setIsLoggedIn(!!token); // true jika ada, false jika tidak

    return () => {
      const modalEl = document.getElementById('productModal');
      if (modalEl) {
        modalEl.removeEventListener('hidden.bs.modal', () => {});
      }
    };
  }, []);

  return (
    <div>
      <div className="modal fade" id="productModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5">Menu Produk</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="row pt-4">
                <div className="col-md-6">
                  <img src="../img-products/sample.jpg" alt="Nama Produk" className="gmbr-popup" />
                </div>
                <div className="col-md-6">
                  <h3>Nama Produk</h3>
                  <p>Rp. 25.000/porsi</p>
                  <div className="quantity">
                    <button className="minus-btn" type="button">-</button>
                    <input type="text" className="quantity-input" defaultValue="1" />
                    <button className="plus-btn" type="button">+</button>
                  </div>
                </div>
                <div className="col-md-12 pt-3">
                  <p>Deskripsi :</p>
                  <p>Deskripsi produk di sini.</p>
                </div>
              </div>
            </div>
            <div className="modal-footer text-center">
              {isLoggedIn && (
                <>
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={() => handleNavigate('/v1/checkout')}
                  >
                    Pesan
                  </button>
                  <button type="button" className="btn-popup btn-add-to-cart">Tambahkan Ke Keranjang</button>
                </>
              )}
              {!isLoggedIn && (
                <>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => handleNavigate('/v1/login')}
                  >
                    Masuk
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => handleNavigate('/v1/register')}
                  >
                    Buat Akun
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalProduct;
