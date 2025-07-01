import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const TentangKami = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section id="tentang">
      <div className="text-center pt-20 w-2/3 mx-auto mb-5 mt-5">
        <h1 data-aos="fade-up" className="text-3xl mb-5 font-serif">Tentang Kami</h1>
        <p data-aos="fade-up" className="mb-20">
          Didirikan sejak (). Khaira Catering adalah layanan katering profesional yang berfokus pada rasa, kebersihan, dan pelayanan.
          Kami hadir untuk memberikan pengalaman kuliner terbaik bagi setiap momen istimewa Anda, mulai dari acara kecil hingga skala besar.
        </p>
      </div>

      <div className="md:flex justify-between items-center mb-10">
        <div data-aos="fade-right" className="w-full bg-orange-400 p-10 rounded-r-full">
          <h3 className="text-xl mb-3 text-center font-serif text-white">Pernikahan</h3>
          <p className="text-center text-white">
            Jadikan hari bahagia Anda semakin sempurna dengan sajian istimewa dari Khaira Catering.
            Kami hadir untuk menemani setiap momen berharga Anda, mulai dari acara lamaran, akad nikah, hingga resepsi pernikahan.
            Khaira Catering menyediakan paket prasmanan fleksibel sesuai tema acara, jumlah tamu, dan konsep dekorasi Anda.
            Tim kami siap membantu mulai dari konsultasi menu hingga pelaksanaan hari istimewa Anda.
          </p>
        </div>
      </div>

      <div className="md:flex justify-between items-center">
        <div data-aos="fade-left" className="w-full bg-orange-400 p-10 rounded-l-full">
          <h3 className="text-xl mb-3 text-center font-serif text-white">Acara Kantor / Corporate</h3>
          <p className="text-center text-white">
            Untuk mendukung kesuksesan setiap acara perusahaan Anda, Khaira Catering siap menjadi mitra terbaik dalam menyediakan sajian berkualitas.
            Kami melayani berbagai kebutuhan seperti meeting, seminar, gathering kantor, hingga peluncuran produk.
            Paket tersedia dalam bentuk prasmanan, nasi kotak, dan snack box, disesuaikan dengan konsep dan anggaran acara.
            Semua hidangan disiapkan dengan bahan segar dan standar kebersihan tinggi.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TentangKami;
