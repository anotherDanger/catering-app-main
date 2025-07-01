import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

// import img1 from '../assets/img/img1.jpg';
// import img2 from '../assets/img/img2.jpg';
// import img3 from '../assets/img/img3.jpg';

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

      <div className="md:flex justify-between items-center">
        <div data-aos="fade-right" className="w-full bg-orange-400 pl-10 rounded-r-full">
          <div className="grid grid-cols-6">
            <div className="col-span-6 col-start-2">
              <img src={img1} alt="" className="h-81 w-60 rounded-2xl border-8 border-white" />
            </div>
            <div className="col-start-1 col-end-3">
              <img src={img2} alt="" className="h-70 w-68 rounded-2xl rounded-tr-none border-8 border-white" />
            </div>
            <div className="col-span-4 col-end-7">
              <img src={img3} alt="" className="h-70 w-80 rounded-2xl rounded-tl-none border-8 border-white" />
            </div>
          </div>
        </div>
        <div data-aos="fade-left" className="w-full md:w-2/3 md:h-151">
          <div className="p-10">
            <h3 className="text-xl mb-3 text-center font-serif text-orange-400">Pernikahan</h3>
            <p className="text-center">
              Jadikan hari bahagia Anda semakin sempurna dengan sajian istimewa dari Khaira Catering.
              Kami hadir untuk menemani setiap momen berharga Anda, mulai dari acara lamaran yang hangat, akad nikah yang penuh makna, hingga resepsi pernikahan yang meriah dan berkesan.
              Khaira Catering menyediakan paket prasmanan yang fleksibel dan dapat disesuaikan sepenuhnya dengan tema acara, jumlah tamu undangan, lokasi, hingga konsep dekorasi yang Anda impikan.
              Kami berkomitmen untuk menyajikan hidangan lezat, berkualitas, dan disiapkan dengan sepenuh hati.
              Tim profesional kami siap membantu Anda mulai dari proses konsultasi menu hingga pelaksanaan di hari istimewa.
            </p>
          </div>
        </div>
      </div>

      <div className="md:flex justify-between items-center">
        <div data-aos="fade-right" className="w-full md:w-2/3 md:h-151">
          <div className="p-10">
            <h3 className="text-xl mb-3 text-center font-serif text-orange-400">Acara Kantor / Corporate</h3>
            <p className="text-center">
              Untuk mendukung kesuksesan setiap acara perusahaan Anda, Khaira Catering siap menjadi mitra terbaik dalam menyediakan sajian berkualitas.
              Kami melayani berbagai kebutuhan, mulai dari meeting, seminar, gathering kantor, hingga acara peluncuran produk dengan menu yang praktis, higienis, namun tetap lezat.
              Paket tersedia dalam bentuk prasmanan, nasi kotak, hingga snack box, yang dapat disesuaikan dengan konsep acara, jumlah peserta, serta anggaran perusahaan Anda.
              Setiap hidangan kami siapkan dengan bahan segar dan standar kebersihan tinggi.
              Percayakan pada Khaira Catering untuk menghadirkan pengalaman kuliner yang praktis, lezat, dan berkesan.
            </p>
          </div>
        </div>
        <div className="w-full">
          <div data-aos="fade-left" className="grid grid-cols-6 bg-orange-400 rounded-l-full pl-25">
            <div className="col-span-6 col-start-2">
              <img src={img1} alt="" className="h-81 w-60 rounded-2xl border-8 border-white" />
            </div>
            <div className="col-start-1 col-end-3">
              <img src={img2} alt="" className="h-70 w-68 rounded-2xl rounded-tr-none border-8 border-white" />
            </div>
            <div className="col-span-4 col-end-7">
              <img src={img3} alt="" className="h-70 w-80 rounded-2xl rounded-tl-none border-8 border-white" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TentangKami;
