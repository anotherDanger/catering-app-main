import { useEffect, useState, useRef } from "react"
import ModalProduct from "./ModalProduct"
import getProducts from "../../api/getProducts"

function Products() {
  const [products, setProducts] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null)
  const modalRef = useRef(null)

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProducts()
      setProducts(data)
    }
    fetchData()
  }, [])

  useEffect(() => {
    if (selectedProduct && modalRef.current) {
      const modal = window.bootstrap.Modal.getOrCreateInstance(modalRef.current)
      modal.show()
    }
  }, [selectedProduct])

  const openModal = (product) => {
    setSelectedProduct(product)
  }

  const closeModal = () => {
    if (modalRef.current) {
      const modal = window.bootstrap.Modal.getInstance(modalRef.current)
      if (modal) modal.hide()
    }
    setSelectedProduct(null)
  }

  return (
    <>
      <div className="container-fluid pt-5 menu" id="menu">
        <div className="container text-center">
          <h2 className="mt-3">Produk</h2>
          <div className="row pt-4 gx-4 gy-4">
            {products.length === 0 ? (
              <p>Loading...</p>
            ) : (
              products.map((product, index) => (
                <div className="col-md-4" key={product.product_id || index}>
                  <div className="card crop-img">
                    <img
                      src={product.product_image || "../img-products/sample.jpg"}
                      className="card-image card-img-top"
                      alt={product.product_name}
                    />
                    <h5 className="card-title">{product.product_name}</h5>
                    <p className="card-text">Stock. {product.product_stock.toLocaleString()}</p>
                    <p className="card-text">Rp. {product.product_price.toLocaleString()}</p>
                    <button
                      className="btn btn-view-product mb-3"
                      type="button"
                      onClick={() => openModal(product)}
                    >
                      Lihat Produk
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <ModalProduct product={selectedProduct} onClose={closeModal} modalRef={modalRef} />
    </>
  )
}

export default Products
