import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ModalProduct from "./ModalProduct";
import getProducts, { getProductImage } from "../../api/getProducts.js";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./products.css";

function Products() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [imageURLs, setImageURLs] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const modalRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    setIsLoggedIn(!!token);

    const fetchData = async () => {
      const data = await getProducts();
      setProducts(data || []);
      const imageMap = {};
      for (const product of data || []) {
        if (product.image_metadata) {
          try {
            const url = await getProductImage(product.image_metadata);
            imageMap[product.product_id] = url;
          } catch (error) {
            console.error(`Gagal memuat gambar untuk produk ${product.product_id}:`, error);
          }
        }
      }
      setImageURLs(imageMap);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedProduct && modalRef.current) {
      const modal = window.bootstrap.Modal.getOrCreateInstance(modalRef.current);
      modal.show();
    }
  }, [selectedProduct]);

  const openModal = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    if (modalRef.current) {
      const modal = window.bootstrap.Modal.getInstance(modalRef.current);
      if (modal) modal.hide();
    }
    setSelectedProduct(null);
  };

  return (
    <>
      <div className="container-fluid pt-5 menu" id="menu">
        <div className="container text-center">
          <h2 className="mt-3">Menu Andalan Kami</h2>
          {products.length === 0 ? (
            <p>Loading...</p>
          ) : (
            <Swiper
              className="product-swiper"
              spaceBetween={20}
              slidesPerView={1}
              breakpoints={{
                576: { slidesPerView: 2, spaceBetween: 20 },
                992: { slidesPerView: 3, spaceBetween: 30 },
              }}
            >
              {products.map((product, index) => (
                <SwiperSlide key={product.product_id || index}>
                  <div className="card h-100">
                    <img
                      src={
                        imageURLs[product.product_id] ||
                        "../img-products/sample.jpg"
                      }
                      className="card-image"
                      alt={product.product_name}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{product.product_name}</h5>
                      <p className="card-text">
                        Stok: {product.product_stock.toLocaleString()}
                      </p>
                      <p className="card-text fw-bold">
                        Rp. {product.product_price.toLocaleString()}
                      </p>
                      <button
                        className="btn btn-view-product mt-auto"
                        type="button"
                        onClick={() => openModal(product)}
                      >
                        Lihat Produk
                      </button>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
          <div className="custom-package-box">
            <p className="custom-package-text">
              Butuh paket khusus? Kami siap bantu sesuai kebutuhan Anda!
            </p>
            {isLoggedIn ? (
              <a
                href="https://wa.me/6285876192926"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-contact"
              >
                Hubungi
              </a>
            ) : (
              <div className="d-flex justify-content-center gap-2">
                <button
                  className="btn btn-primary"
                  onClick={() => navigate("/v1/login")}
                >
                  Masuk
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => navigate("/v1/register")}
                >
                  Daftar
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <ModalProduct
        product={selectedProduct}
        onClose={closeModal}
        modalRef={modalRef}
      />
    </>
  );
}

export default Products;