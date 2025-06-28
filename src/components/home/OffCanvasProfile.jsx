import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { checkLogin, logoutUser } from "../../api/getProfile";

function OffCanvasProfile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const localUser = localStorage.getItem("user");
    if (localUser) {
      setUser({ username: localUser });
    } else {
      async function loadUser() {
        const loggedInUser = await checkLogin();
        if (loggedInUser) setUser(loggedInUser);
      }
      loadUser();
    }
  }, []);

  const handleLogout = async () => {
    await logoutUser();
    localStorage.removeItem("user");
    setUser(null);
  };

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
          <p className="fw-semibold">
            {user ? `Halo, ${user.username}!` : "Halo, Pengunjung!"}
          </p>
        </div>

        {!user ? (
          <div className="d-grid gap-2 mb-3">
            <Link to="/v1/register" className="btn btn-outline-primary">Buat Akun</Link>
            <Link to="/v1/login" className="btn btn-primary">Masuk</Link>
          </div>
        ) : (
          <button onClick={handleLogout} className="btn btn-danger w-100">Logout</button>
        )}
      </div>
    </div>
  );
}

export default OffCanvasProfile;
