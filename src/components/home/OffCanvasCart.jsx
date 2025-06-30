import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCart, deleteCartItem, decreaseCartItem } from '../../api/cart'

function OffCanvasCart() {
  const [cart, setCart] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const fetchCart = async () => {
    setLoading(true)
    const username = localStorage.getItem('user')
    const token = localStorage.getItem('access_token')
    const result = await getCart(username, token)
    if (result.success) {
      setCart(result.data)
    }
    setLoading(false)
  }

  const handleDelete = async (productId) => {
    const username = localStorage.getItem('user')
    const token = localStorage.getItem('access_token')
    await deleteCartItem(username, productId, token)
    fetchCart()
  }

  const handleDecrease = async (productId) => {
    const username = localStorage.getItem('user')
    const token = localStorage.getItem('access_token')
    await decreaseCartItem(username, productId, 1, token)
    fetchCart()
  }

  const handleIncrease = async (item) => {
    if (item.quantity >= item.product_stock) return
    const username = localStorage.getItem('user')
    const token = localStorage.getItem('access_token')
    const response = await fetch(`https://khatering.shop/user/api/v1/cart/${username}/1`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        product_id: item.product_id,
        product_name: item.product_name,
        product_price: item.price,
        quantity: 1,
        total_price: item.price * 1,
      }),
    })
    if (response.status === 400) {
      alert('Jumlah melebihi stok produk.')
      return
    }
    if (response.ok) {
      fetchCart()
    }
  }

  useEffect(() => {
    const offcanvas = document.getElementById('offCanfasCart')
    const handleShow = () => {
      fetchCart()
    }
    offcanvas.addEventListener('show.bs.offcanvas', handleShow)
    return () => {
      offcanvas.removeEventListener('show.bs.offcanvas', handleShow)
    }
  }, [])

  const handleCheckout = (item) => {
    navigate('/v1/checkout', {
      state: {
        product: {
          product_id: item.product_id,
          product_name: item.product_name,
        },
        quantity: item.quantity,
        total: item.price * item.quantity,
      },
    })
  }

  return (
    <div>
      <div className="offcanvas offcanvas-end" tabIndex="-1" id="offCanfasCart">
        <div className="offcanvas-header">
          <h5 className="mb-0">Keranjang Belanja</h5>
          <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas"></button>
        </div>
        <div className="offcanvas-body" id="cartBody">
          {loading ? (
            'Loading...'
          ) : cart.length === 0 ? (
            'Keranjang kosong'
          ) : (
            <ul className="list-group">
              {cart.map((item, index) => (
                <li
                  key={index}
                  className="list-group-item d-flex justify-content-between align-items-center flex-column flex-md-row"
                >
                  <div>
                    <div>{item.product_name}</div>
                    <small>{item.quantity} × Rp{item.price.toLocaleString()}</small>
                  </div>
                  <div className="d-flex align-items-center mt-2 mt-md-0">
                    <button
                      className="btn btn-sm btn-secondary me-1"
                      onClick={() => handleDecrease(item.product_id)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <button
                      className="btn btn-sm btn-secondary me-2"
                      onClick={() => handleIncrease(item)}
                      disabled={item.quantity >= item.product_stock}
                    >
                      +
                    </button>
                    <span className="me-3">
                      Rp{(item.price * item.quantity).toLocaleString()}
                    </span>
                    <button
                      className="btn btn-sm btn-danger me-3"
                      onClick={() => handleDelete(item.product_id)}
                    >
                      &times;
                    </button>
                    <button
                      className="btn btn-sm btn-success"
                      onClick={() => handleCheckout(item)}
                    >
                      Checkout
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

export default OffCanvasCart
