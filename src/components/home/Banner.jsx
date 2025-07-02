import React from 'react';

function Banner() {
    return (
        <div className="container-fluid banner" id="home">
            <div className="container text-center text-md-start">
                <h4 className="display-2">Khaira Catering</h4>
                <h1 className="display-5 text-danger">Menghidangkan Cita Rasa Mengikat Kenangan</h1>
                <h3 className="fw-light text-light">Harga Terjangkau</h3>
                <a href="#menu">
                    <button type="button" className="btn btn-primary btn-lg mt-4">Order Now</button>
                </a>
            </div>
        </div>
    );
}

export default Banner;