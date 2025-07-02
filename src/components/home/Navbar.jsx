import React from "react";
import OffCanvasHistory from "./OffCanvasHistory";
import OffCanvasProfile from "./OffCanvasProfile";
import OffCanvasCart from "./OffCanvasCart";

export default function App() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-brown navbar-dark shadow-lg fixed-top">
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
                <a className="nav-link" href="#home">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#menu">
                  Menu
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#about">
                  About
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#kontak">
                  Contact
                </a>
              </li>
            </ul>
            <ul className="navbar-nav flex-row gap-2">
              <li className="nav-item">
                <button
                  className="btn btn-outline-light btn-icon"
                  type="button"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasHistory"
                  aria-controls="offcanvasHistory"
                  title="Riwayat"
                >
                  <i className="fa-solid fa-clock-rotate-left"></i>
                  <span className="d-lg-none ms-2">Riwayat</span>
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="btn btn-outline-light btn-icon"
                  type="button"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#sidebarProfile"
                  aria-controls="sidebarProfile"
                  title="Profil"
                >
                  <i className="fa-solid fa-user"></i>
                  <span className="d-lg-none ms-2">Profil</span>
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="btn btn-cart btn-icon"
                  type="button"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offCanfasCart"
                  aria-controls="offCanfasCart"
                  title="Keranjang"
                >
                  <i className="fa-solid fa-cart-shopping fa-xl"></i>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <OffCanvasHistory />
      <OffCanvasProfile />
      <OffCanvasCart />
    </>
  );
}