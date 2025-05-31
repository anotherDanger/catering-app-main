
function Contact() {
    return (
        <div>
            <form action="../message/message.php" method="post">
                <div className="container-fluid kontak">
                    <div className="container">
                        <h2 className="display-3 text-center" id="kontak">Kontak Kami</h2>
                        <p className="text-center">Jika ada Masukkan hubungi kami melalui form di bawah ini</p>
                        <div className="row pb-3">
                            <div className="col-md-6">
                                <input className="form-control form-control-lg mb-3" type="text" name="nama"
                                       placeholder="Nama"/>
                                <input className="form-control form-control-lg mb-3" type="text" name="email"
                                       placeholder="Email"/>
                                <input className="form-control form-control-lg" type="text" name="noHp"
                                       placeholder="No. Phone"/>
                            </div>
                            <div className="col-md-6">
                                <textarea className="form-control form-control-lg" rows="5" name="message"></textarea>
                            </div>
                        </div>
                        <div className="col-md-3 mx-auto text-center pb-5">
                            <button type="submit" name="kirim" className="btn btn-kirim-pesan btn-lg text-white">Kirim
                                Pesan
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Contact;