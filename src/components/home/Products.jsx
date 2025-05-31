import { useEffect, useState } from "react";
import ModalProduct from "./ModalProduct"
function Products() {
//     const [products, setProducts] = useState([]);
//
//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const data = await getProducts();
//                 setProducts(data); // simpan seluruh array produk
//             } catch (err) {
//                 console.error("Gagal ambil produk:", err);
//             }
//         };
//         fetchData();
//     }, []);
//
//     return (
//         <div>
//             <div className="container-fluid pt-5 menu" id="menu">
//                 <div className="container text-center">
//                     <h2 className="mt-3">Produk</h2>
//                     <div className="row pt-4 gx-4 gy-4">
//                         {products.length === 0 ? (
//                             <p>Loading...</p>
//                         ) : (
//                             products.map((product) => (
//                                 <div className="col-md-4" key={product.id}>
//                                     <div className="card crop-img">
//                                         <img
//                                             src="../img-products/sample.jpg"
//                                             className="card-image card-img-top"
//                                             alt={product.name}
//                                         />
//                                         <h5 className="card-title">{product.name}</h5>
//                                         <p className="card-text">Rp. {product.price}</p>
//                                         <button
//                                             className="btn btn-view-product mb-3"
//                                             type="button"
//                                             data-bs-toggle="modal"
//                                             data-bs-target="#productModal"
//                                         >
//                                             Lihat Produk
//                                         </button>
//                                     </div>
//                                 </div>
//                             ))
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

    return (
        <div>
            <div className="container-fluid pt-5 menu" id="menu">
                <div className="container text-center">
                    <h2 className="mt-3">Produk</h2>
                    <div className="row pt-4 gx-4 gy-4">
                        <div className="col-md-4">
                            <div className="card crop-img">
                                <img
                                    src="../img-products/sample.jpg"
                                    className="card-image card-img-top"
                                    alt="Product 1"
                                />
                                <h5 className="card-title">Product 1</h5>
                                <p className="card-text">Rp. 100</p>
                                <button
                                    className="btn btn-view-product mb-3"
                                    type="button"
                                    data-bs-toggle="modal"
                                    data-bs-target="#productModal"
                                >
                                    Lihat Produk
                                </button>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="card crop-img">
                                <img
                                    src="../img-products/sample.jpg"
                                    className="card-image card-img-top"
                                    alt="Product 2"
                                />
                                <h5 className="card-title">Product 2</h5>
                                <p className="card-text">Rp. 200</p>
                                <button
                                    className="btn btn-view-product mb-3"
                                    type="button"
                                    data-bs-toggle="modal"
                                    data-bs-target="#productModal"
                                >
                                    Lihat Produk
                                </button>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="card crop-img">
                                <img
                                    src="../img-products/sample.jpg"
                                    className="card-image card-img-top"
                                    alt="Product 3"
                                />
                                <h5 className="card-title">Product 3</h5>
                                <p className="card-text">Rp. 300</p>
                                <button
                                    className="btn btn-view-product mb-3"
                                    type="button"
                                    data-bs-toggle="modal"
                                    data-bs-target="#productModal"
                                >
                                    Lihat Produk
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ModalProduct />
        </div>

    );

}
export default Products;
