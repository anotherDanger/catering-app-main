import React, { useEffect, useState } from "react";
import { fetchHistory } from "../../api/history.js";

function OffCanvasHistory() {
  const [history, setHistory] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(function () {
    var offcanvas = document.getElementById("offcanvasHistory");

    async function handleShow() {
      setLoading(true);
      var username = localStorage.getItem("user");
      if (!username) {
        setHistory(null);
        setLoading(false);
        return;
      }
      var data = await fetchHistory(username);
      setHistory(data);
      setLoading(false);
    }

    offcanvas.addEventListener("show.bs.offcanvas", handleShow);

    return function () {
      offcanvas.removeEventListener("show.bs.offcanvas", handleShow);
    };
  }, []);

  return (
    <div
      className="offcanvas offcanvas-end"
      tabIndex="-1"
      id="offcanvasHistory"
      aria-labelledby="offcanvasHistoryLabel"
    >
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasHistoryLabel">
          Riwayat Pesanan
        </h5>
        <button
          type="button"
          className="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body">
        {loading && <p>Loading...</p>}
        {!loading && !history && <p>Tidak ada riwayat pesanan.</p>}
        {!loading && history && history.length === 0 && <p>Riwayat kosong.</p>}
        {!loading && history && history.length > 0 && (
          <ul className="list-group">
            {history.map(function (item, idx) {
              return (
                <li key={idx} className="list-group-item">
                  <div>{item.product_name}</div>
                  <small>{item.created_at ? item.created_at : "Tanggal tidak tersedia"}</small>
                  <div>Jumlah: {item.quantity}</div>
                  <div>Status: {item.status}</div>
                  <div>Total: Rp{item.total ? item.total.toLocaleString() : "-"}</div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

export default OffCanvasHistory;
