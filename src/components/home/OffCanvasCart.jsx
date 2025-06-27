import { useEffect, useState } from 'react'
import { getCart, deleteCartItem, decreaseCartItem, addToCart } from '../../api/cart'

function OffCanvasCart() {
  const [cart, setCart] = useState([])
  const [loading, setLoading] = useState(true)

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
    await addToCart({
      product: {
        product_id: item.product_id,
        product_name: item.product_name,
        product_price: item.price,
      },
      quantity: 1,
      token,
      username,
    })
    fetchCart()
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

  return (
    <div>
      <div className="offcanvas offcanvas-end" tabIndex="-1" id="offCanfasCart">
        <div className="offcanvas-header">
          <h5 className="mb-0">Keranjang Belanja</h5>
          <a href="../checkout/history.php" className="history-icon text-decoration-none">
            <i className="fas fa-history"></i>
          </a>
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
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div>
                    <div>{item.product_name}</div>
                    <small>{item.quantity} × Rp{item.price.toLocaleString()}</small>
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
                    <span className="me-3">
                      Rp{(item.price * item.quantity).toLocaleString()}
                    </span>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(item.product_id)}
                    >
                      &times;
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
