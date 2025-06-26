import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addToCart } from '../../api/cart'

function ModalProduct({ product, onClose, modalRef }) {
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    const token = localStorage.getItem('access_token')
    setIsLoggedIn(!!token)
    setQuantity(1)
  }, [product])

  const closeModal = () => {
    if (modalRef.current) {
      const modalInstance = window.bootstrap.Modal.getInstance(modalRef.current)
      if (modalInstance) modalInstance.hide()
    }
    onClose()
  }

  const handleNavigate = (path) => {
    if (modalRef.current) {
      modalRef.current.addEventListener('hidden.bs.modal', () => navigate(path), { once: true })
      closeModal()
    } else {
      navigate(path)
    }
  }

  const increment = () => setQuantity((q) => q + 1)
  const decrement = () => setQuantity((q) => (q > 1 ? q - 1 : 1))

  const handleAddToCartClick = async () => {
    const token = localStorage.getItem('access_token')
    if (!token) {
      alert('Silakan login terlebih dahulu')
      return
    }
    const user = localStorage.getItem('user')
    if (!user) {
      alert('User tidak ditemukan')
      return
    }
    if (!quantity || quantity < 1) {
      alert('Jumlah tidak valid')
      return
    }
    const result = await addToCart({ product, quantity, token, username: user })
    alert(result.message)
  }

  if (!product) return null

  return (
    <div
      className="modal fade"
      id="productModal"
      tabIndex="-1"
      aria-hidden="true"
      ref={modalRef}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5">Menu Produk</h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={closeModal}
            ></button>
          </div>
          <div className="modal-body">
            <div className="row pt-4">
              <div className="col-md-6">
                <img
                  src={product.product_image || '../img-products/sample.jpg'}
                  alt={product.product_name}
                  className="gmbr-popup"
                />
              </div>
              <div className="col-md-6">
                <h3>{product.product_name}</h3>
                <p>Rp. {product.product_price.toLocaleString()}/porsi</p>
                <div className="quantity">
                  <button className="minus-btn" type="button" onClick={decrement}>-</button>
                  <input
                    type="text"
                    className="quantity-input"
                    value={quantity}
                    onChange={(e) => {
                      const val = parseInt(e.target.value)
                      if (!isNaN(val) && val > 0) setQuantity(val)
                    }}
                  />
                  <button className="plus-btn" type="button" onClick={increment}>+</button>
                </div>
              </div>
              <div className="col-md-12 pt-3">
                <p>Deskripsi :</p>
                <p>{product.product_description}</p>
              </div>
            </div>
          </div>
          <div className="modal-footer text-center">
            {isLoggedIn ? (
              <>
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={() => handleNavigate('/v1/checkout')}
                >
                  Pesan
                </button>
                <button
                  type="button"
                  className="btn-popup btn-add-to-cart"
                  onClick={handleAddToCartClick}
                >
                  Tambahkan Ke Keranjang
                </button>
              </>
            ) : (
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
  )
}

export default ModalProduct
