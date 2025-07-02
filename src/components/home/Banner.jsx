import React from 'react';

function Banner() {
    return (
        <div className="container-fluid banner" id="home">
            <div className="container">
                <h4 className="display-1" style={{color: 'black'}}>Khaira Catering</h4>
                <h1 className="text-danger" style={{color: 'red'}}>Menghidangkan Cita Rasa Mengikat Kenangan</h1>
                <h3 className="display-7" style={{color: 'gray'}}>Harga Terjangkau</h3>
                <a href="#menu">
                    <button type="button" className="btn btn-primary btn-lg mt-4 btn-auto">Order Now</button>
                </a>
            </div>
        </div>
    );
}

export default Banner;
