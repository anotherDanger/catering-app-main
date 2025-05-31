
function OffCanvasCart() {
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
                <div className="offcanvas-body" id="cartBody">Loading...</div>
            </div>
        </div>
    )
}

export default OffCanvasCart;