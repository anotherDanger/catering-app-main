import React from "react";
import OffCanvasHistory from "./OffCanvasHistory";
import OffCanvasProfile from "./OffCanvasProfile";
import OffCanvasCart from "./OffCanvasCart";

export default function App() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-transparent navbar-brown navbar-dark shadow-lg fixed-top">
        <div className="container">
          <a className="navbar-brand" href="#">
            Khaira Catering
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" href="#home">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" href="#menu">
                  Menu
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" href="#about">
                  About
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" href="#kontak">
                  Contact
                </a>
              </li>
            </ul>
            <ul className="navbar-nav">
              <li className="nav-item">
                <button
                  className="btn btn-outline-light"
                  type="button"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasHistory"
                  aria-controls="offcanvasHistory"
                >
                  <i className="fa-solid fa-clock-rotate-left"></i> Riwayat
                </button>
              </li>
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
                <button
                  className="btn btn-cart"
                  type="button"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offCanfasCart"
                  aria-controls="offCanfasCart"
                >
                  <i className="fa-solid fa-cart-shopping fa-xl text-white"></i>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
