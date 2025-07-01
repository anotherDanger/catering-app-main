import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const TentangKami = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section id="tentang" className="mb-20">
      <div className="text-center pt-20 w-2/3 mx-auto mb-10">
        <h1
          data-aos="fade-up"
          className="text-4xl font-serif font-semibold mb-6"
          style={{ color: "#333" }}
        >
          Tentang Kami
        </h1>
        <p
          data-aos="fade-up"
          className="text-lg leading-relaxed"
          style={{ color: "#444" }}
        >
          Didirikan sejak (). Khaira Catering adalah layanan katering profesional
          yang berfokus pada rasa, kebersihan, dan pelayanan. Kami hadir untuk
          memberikan pengalaman kuliner terbaik bagi setiap momen istimewa Anda,
          mulai dari acara kecil hingga skala besar.
        </p>
      </div>

      <div className="md:flex md:space-x-10 w-4/5 mx-auto mb-16">
        <div
          data-aos="fade-right"
          className="bg-orange-400 rounded-r-3xl p-12 flex-1 shadow-lg"
        >
          <h3
            className="text-2xl font-serif font-semibold mb-4 text-center"
            style={{ color: "#222" }}
          >
            Pernikahan
          </h3>
          <p
            className="text-justify text-base leading-relaxed"
            style={{ color: "#222" }}
          >
            Jadikan hari bahagia Anda semakin sempurna dengan sajian istimewa dari
            Khaira Catering. Kami hadir untuk menemani setiap momen berharga Anda,
            mulai dari acara lamaran, akad nikah, hingga resepsi pernikahan.
            Khaira Catering menyediakan paket prasmanan fleksibel sesuai tema
            acara, jumlah tamu, dan konsep dekorasi Anda. Tim kami siap membantu
            mulai dari konsultasi menu hingga pelaksanaan hari istimewa Anda.
          </p>
        </div>

        <div
          data-aos="fade-left"
          className="bg-orange-400 rounded-l-3xl p-12 flex-1 shadow-lg"
        >
          <h3
            className="text-2xl font-serif font-semibold mb-4 text-center"
            style={{ color: "#222" }}
          >
            Acara Kantor / Corporate
          </h3>
          <p
            className="text-justify text-base leading-relaxed"
            style={{ color: "#222" }}
          >
            Untuk mendukung kesuksesan setiap acara perusahaan Anda, Khaira Catering
            siap menjadi mitra terbaik dalam menyediakan sajian berkualitas. Kami
            melayani berbagai kebutuhan seperti meeting, seminar, gathering kantor,
            hingga peluncuran produk. Paket tersedia dalam bentuk prasmanan, nasi
            kotak, dan snack box, disesuaikan dengan konsep dan anggaran acara.
            Semua hidangan disiapkan dengan bahan segar dan standar kebersihan tinggi.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TentangKami;
