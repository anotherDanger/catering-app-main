import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCart, deleteCartItem, decreaseCartItem, addToCart } from '../../api/cart'

function OffCanvasCart() {
  const [cart, setCart] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const fetchCart = async () => {
    setLoading(true)
    try {
      const username = localStorage.getItem('user')
      if (username) {
        const data = await getCart(username)
        setCart(data)
      } else {
        setCart([])
      }
    } catch (error) {
      console.error(error)
      setCart([])
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (productId) => {
    try {
      const username = localStorage.getItem('user');
      await deleteCartItem(username, productId);
      fetchCart();
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const handleDecrease = async (productId) => {
    try {
      const username = localStorage.getItem('user');
      await decreaseCartItem(username, productId, 1);
      fetchCart();
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const handleIncrease = async (item) => {
    if (item.quantity >= item.product_stock) return
    try {
      const username = localStorage.getItem('user')
      await addToCart({
        product: {
          product_id: item.product_id,
          product_name: item.product_name,
          product_price: item.price,
        },
        quantity: 1,
        username: username,
      })
      fetchCart()
    } catch (error) {
      console.error(error)
      alert(error.message)
    }
  }

  useEffect(() => {
    const offcanvas = document.getElementById('offCanfasCart')
    if (offcanvas) {
      const handleShow = () => fetchCart()
      offcanvas.addEventListener('show.bs.offcanvas', handleShow)
      return () => {
        offcanvas.removeEventListener('show.bs.offcanvas', handleShow)
      }
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
            <div className="text-center">Loading...</div>
          ) : cart.length === 0 ? (
            <div className="text-center">Keranjang kosong</div>
          ) : (
            <ul className="list-group">
              {cart.map((item) => (
                <li
                  key={item.product_id}
                  className="list-group-item d-flex justify-content-between align-items-center flex-column flex-md-row"
                >
                  <div className="mb-2 mb-md-0">
                    <div>{item.product_name}</div>
                    <small>{item.quantity} &times; Rp{item.price.toLocaleString()}</small>
                  </div>
                  <div className="d-flex align-items-center">
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
                    <span className="me-3 fw-bold">
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