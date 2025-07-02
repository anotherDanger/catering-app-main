import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addToCart } from '../../api/cart'
import { getProductImage } from '../../api/getProducts.js'

function ModalProduct({ product, onClose, modalRef }) {
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [productImageURL, setProductImageURL] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('access_token')
    setIsLoggedIn(!!token)
    setQuantity(1)
    setProductImageURL('')
    if (product && product.image_metadata) {
      loadImage(product.image_metadata)
    }
  }, [product])

  const loadImage = async (imageMeta) => {
    try {
      const url = await getProductImage(imageMeta)
      setProductImageURL(url)
    } catch (error) {
      console.error('Failed to load product image:', error)
      setProductImageURL('')
    }
  }

  useEffect(() => {
    if (!modalRef.current) return
    const modalEl = modalRef.current
    const handleHidden = () => {
      if (onClose) onClose()
    }
    modalEl.addEventListener('hidden.bs.modal', handleHidden)
    return () => {
      modalEl.removeEventListener('hidden.bs.modal', handleHidden)
    }
  }, [modalRef, onClose])

  const closeModal = () => {
    if (modalRef.current) {
      const modalInstance = window.bootstrap.Modal.getInstance(modalRef.current)
      if (modalInstance) modalInstance.hide()
    }
  }

  const handleNavigate = (path, state = {}) => {
    if (modalRef.current) {
      modalRef.current.addEventListener(
        'hidden.bs.modal',
        () => navigate(path, { state }),
        { once: true }
      )
      closeModal()
    } else {
      navigate(path, { state })
    }
  }

  const increment = () => {
    setQuantity((q) => (product && q < product.product_stock ? q + 1 : q))
  }

  const decrement = () => setQuantity((q) => (q > 1 ? q - 1 : 1))

  const handleQuantityChange = (e) => {
    if (!product) return
    const val = parseInt(e.target.value, 10)
    if (isNaN(val) || val < 1) {
      setQuantity(1)
    } else if (val > product.product_stock) {
      setQuantity(product.product_stock)
    } else {
      setQuantity(val)
    }
  }

  const handleAddToCartClick = async () => {
    if (!isLoggedIn) {
      alert('Silakan login terlebih dahulu')
      return
    }
    const username = localStorage.getItem('user')
    if (!username) {
      alert('User tidak ditemukan, silakan login ulang.')
      return
    }
    if (!quantity || quantity < 1 || quantity > product.product_stock) {
      alert('Jumlah tidak valid atau melebihi stok')
      return
    }
    try {
      await addToCart({ product, quantity, username })
      alert('Produk berhasil ditambahkan ke keranjang!')
      closeModal()
    } catch (error) {
      alert(error.message || 'Gagal menambahkan produk.')
    }
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
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5">{product.product_name}</h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="row g-4">
              <div className="col-12 col-md-6 d-flex justify-content-center align-items-center">
                <img
                  src={productImageURL || '../img-products/sample.jpg'}
                  alt={product.product_name}
                  className="img-fluid rounded"
                  style={{
                    maxHeight: '300px',
                    objectFit: 'cover',
                    width: '100%',
                  }}
                />
              </div>
              <div className="col-12 col-md-6">
                <p className="fs-5 fw-semibold mb-1">
                  Rp. {product.product_price.toLocaleString()}
                </p>
                <p className="text-muted mb-2">
                  Stok tersedia: {product.product_stock}
                </p>
                <div className="d-flex align-items-center gap-2 mb-3">
                  <button className="btn btn-secondary" type="button" onClick={decrement}>-</button>
                  <input
                    type="text"
                    className="form-control text-center"
                    value={quantity}
                    onChange={handleQuantityChange}
                    style={{ width: '70px' }}
                  />
                  <button className="btn btn-secondary" type="button" onClick={increment}>+</button>
                </div>
                <p className="mt-3 mb-1 fw-semibold">Deskripsi:</p>
                <p className="text-secondary" style={{ fontSize: '0.9rem' }}>
                  {product.description}
                </p>
              </div>
            </div>
          </div>
          <div className="modal-footer d-flex flex-column flex-md-row justify-content-center gap-2">
            {isLoggedIn ? (
              <>
                <button
                  type="button"
                  className="btn btn-outline-primary w-100 w-md-auto"
                  onClick={() =>
                    handleNavigate('/v1/checkout', {
                      product,
                      quantity,
                      total: product.product_price * quantity,
                    })
                  }
                >
                  Pesan
                </button>
                <button
                  type="button"
                  className="btn btn-primary w-100 w-md-auto"
                  onClick={handleAddToCartClick}
                >
                  Tambahkan Ke Keranjang
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  className="btn btn-primary w-100 w-md-auto"
                  onClick={() => handleNavigate('/v1/login')}
                >
                  Masuk
                </button>
                <button
                  type="button"
                  className="btn btn-secondary w-100 w-md-auto"
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