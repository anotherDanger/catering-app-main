
function Banner() {
    return (
        <div>
            <div className="container-fluid banner" id="home">
            <div className="container">
                <h4 className="display-1">KHAIRA CATERING</h4>
                <h1 className="text-danger">The premium Quality</h1>
                <h3 className="display-7 text-light">Khaira Catering Menyediakan Makanan Berkualitas</h3>
                <a href="#menu">
                    <button type="button" className="btn btn-order-now btn-lg mt-4">Order Now</button>
                </a>
            </div>
            </div>
        </div>
    )
}
export default Banner;