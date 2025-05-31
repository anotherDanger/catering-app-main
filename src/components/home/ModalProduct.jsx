
function ModalProduct() {
    return (
        <div>
            <div className="modal fade" id="productModal" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5">Menu Produk</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row pt-4">
                                <div className="col-md-6">
                                    <img src="../img-products/sample.jpg" alt="Nama Produk" className="gmbr-popup"/>
                                </div>
                                <div className="col-md-6">
                                    <h3>Nama Produk</h3>
                                    <p>Rp. 25.000/porsi</p>
                                    <div className="quantity">
                                        <button className="minus-btn" type="button">-</button>
                                        <input type="text" className="quantity-input" value="1"/>
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
                            <a href="#" className="btn-popup">Beli Langsung</a>
                            <button type="button" className="btn-popup btn-add-to-cart">Tambahkan Ke Keranjang</button>
                            <a href="#" className="btn">Masuk</a>
                            <a href="#" className="btn">Buat Akun</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ModalProduct;