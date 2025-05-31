
function Navbar() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-transparent navbar-brown navbar-dark shadow-lg fixed-top">
                <div className="container">
                    <a className="navbar-brand" href="#">Khaira Catering</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarText">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse text-right" id="navbarText">
                        <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                            <li className="nav-item"><a className="nav-link active" href="#home">Home</a></li>
                            <li className="nav-item"><a className="nav-link active" href="#menu">Menu</a></li>
                            <li className="nav-item"><a className="nav-link active" href="#about">About</a></li>
                            <li className="nav-item"><a className="nav-link active" href="#kontak">Contact</a></li>
                        </ul>
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <button
                                    className="btn btn-outline-light"
                                    type="button"
                                    data-bs-toggle="offcanvas"
                                    data-bs-target="#sidebarProfile"
                                    aria-controls="sidebarProfile"
                                >
                                    <i className="fa-solid fa-user"></i> Profil
                                </button>
                            </li>
                            <li className="nav-item">
                                <button className="btn btn-cart" id="viewCartBtn" type="button"
                                        data-bs-toggle="offcanvas" data-bs-target="#offCanfasCart">
                                    <i className="fa-solid fa-cart-shopping fa-xl text-white"></i>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;