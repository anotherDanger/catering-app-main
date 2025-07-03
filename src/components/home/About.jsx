import React from 'react';

function About() {
    return (
        <div>
            <div className="container-fluid pt-5 pb-5 about" id="about">
                <div className="container">
                    {/* Judul Utama Section */}
                    <div className="row mb-5">
                        <div className="col-12 text-center text-white">
                            <h2 className="display-3">Tentang Kami</h2>
                        </div>
                    </div>

                    {/* Konten Utama */}
                    <div className="row justify-content-center align-items-center">
                        {/* Kolom Gambar (kiri) */}
                        <div className="col-md-6 text-center mb-4 mb-md-0">
                            <img 
                                src="../img-products/khaira.png" 
                                className="img-fluid img-about"
                                alt="Tentang Khaira Catering"
                            />
                        </div>

                        {/* Kolom Teks (kanan) */}
                        <div className="col-md-6 text-white text-md-start">
                            <h3 className="mb-3">Komitmen Untuk Pengalaman Kuliner Terbaik</h3>
                            <p>
                                Khaira Catering menyajikan layanan katering dengan komitmen untuk memberikan pengalaman
                                kuliner yang istimewa dan memuaskan.
                            </p>
                            <p>
                                Dari acara kecil hingga besar, kami siap mengakomodasi berbagai kebutuhan kuliner dengan
                                pelayanan profesional dan pengalaman bertahun-tahun.
                            </p>
                            
                            {/* Bagian Lokasi yang Ditingkatkan */}
                            <div className="mt-4">
                                <h4>Lokasi Kami</h4>
                                <p>
                                    <strong>
                                        Jl. Pucang No.48, Rejamulya, Gumilir, Kec. Cilacap Utara, Kabupaten Cilacap, Jawa Tengah 53231
                                    </strong>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;