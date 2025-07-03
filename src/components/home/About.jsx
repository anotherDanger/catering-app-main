import React from 'react';

function About() {
    return (
        <div>
            <div className="container-fluid pt-5 pb-5 about" id="about">
                <div className="container">
                    <div className="row mb-5">
                        <div className="col-12 text-center text-white">
                            <h2 className="display-3">Tentang Kami</h2>
                        </div>
                    </div>

                    <div className="row justify-content-center align-items-center">
                        <div className="col-md-6 text-white text-md-start mb-4 mb-md-0">
                            <h3 className="mb-3">Komitmen Untuk Pengalaman Kuliner Terbaik</h3>
                            <p>
                                Khaira Catering menyajikan layanan katering dengan komitmen untuk memberikan pengalaman
                                kuliner yang istimewa dan memuaskan.
                            </p>
                            <p>
                                Dari acara kecil hingga besar, kami siap mengakomodasi berbagai kebutuhan kuliner dengan
                                pelayanan profesional dan pengalaman bertahun-tahun.
                            </p>
                            
                            <div className="mt-4">
                                <h4>Lokasi Kami</h4>
                                <p>
                                    <strong>
                                        Jl. Pucang No.48, Rejamulya, Gumilir, Kec. Cilacap Utara, Kabupaten Cilacap, Jawa Tengah 53231
                                    </strong>
                                </p>
                            </div>
                        </div>

                        <div className="col-md-6 text-center">
                            <img
                                src="../../../public/khaira.png" 
                                className="img-fluid rounded-3 shadow"
                                style={{ maxWidth: '380px' }}
                                alt="Tentang Khaira Catering"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;