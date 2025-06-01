import { Link } from "react-router-dom";
function OffCanvasProfile() {
    return (
        <div
            className="offcanvas offcanvas-end"
            tabIndex="-1"
            id="sidebarProfile"
            aria-labelledby="sidebarProfileLabel"
        >
            <div className="offcanvas-header">
                <h5 id="sidebarProfileLabel" className="mb-0">Profil Pengguna</h5>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>

            <div className="offcanvas-body text-center">
                <div className="mb-3">
                    <img
                        src="/img/user-placeholder.png"
                        alt="User"
                        className="rounded-circle mb-2"
                        width="100"
                        height="100"
                    />
                    <p className="fw-semibold">Halo, Username!</p>
                </div>

                <div className="d-grid gap-2 mb-3">
                    <Link to="/v1/register" className="btn btn-outline-primary">Buat Akun</Link>
                    <Link to="/v1/login" className="btn btn-primary">Masuk</Link>
                </div>

                <form
                    action="../upload/upload.php"
                    method="post"
                    encType="multipart/form-data"
                    className="text-start mb-4"
                >
                    <label htmlFor="foto" className="form-label">Upload Foto</label>
                    <input className="form-control mb-2" type="file" name="foto" id="foto" />
                    <button type="submit" name="upload" className="btn btn-secondary w-100">Upload</button>
                </form>

                <a href="logout.php" className="btn btn-danger w-100">Logout</a>
            </div>
        </div>
    );

}
export default OffCanvasProfile;