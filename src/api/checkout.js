export async function tryRefreshToken() {
  const refreshResponse = await fetch("https://khatering.shop/v1/refresh", {
    method: "POST",
    credentials: "include",
  });

  if (refreshResponse.ok) {
    const refreshData = await refreshResponse.json();
    localStorage.setItem("access_token", refreshData.access_token);
    localStorage.setItem("user", refreshData.username);
    return refreshData.username;
  }

  localStorage.removeItem("access_token");
  localStorage.removeItem("user");
  return null;
}

export const addToCart = async ({ product, quantity, token, username }) => {
  if (!product || !token || !username) {
    return { success: false, message: 'Data tidak lengkap' };
  }

  const payload = {
    product_id: product.product_id,
    product_name: product.product_name,
    product_price: product.product_price,
    quantity: quantity,
    total_price: product.product_price * quantity,
  };

  const makeRequest = async (token) => {
    return await fetch(`https://khatering.shop/user/api/v1/cart/${username}/${quantity}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
  };

  let response = await makeRequest(token);
  if (response.status === 401) {
    const refreshedUser = await tryRefreshToken();
    if (!refreshedUser) return { success: false, message: 'Sesi berakhir. Silakan login ulang.' };
    token = localStorage.getItem("access_token");
    response = await makeRequest(token);
  }

  const result = await response.json();
  if (response.ok) {
    return { success: true, message: 'Produk berhasil ditambahkan ke keranjang!' };
  }
  return { success: false, message: result.data || 'Gagal menambahkan produk.' };
};

export const getCart = async (username, token) => {
  if (!username || !token) {
    return { success: false, message: 'Username atau token tidak tersedia.' };
  }

  const makeRequest = async (token) => {
    return await fetch(`https://khatering.shop/user/api/v1/cart/${username}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  let response = await makeRequest(token);
  if (response.status === 401) {
    const refreshedUser = await tryRefreshToken();
    if (!refreshedUser) return { success: false, message: 'Sesi berakhir. Silakan login ulang.' };
    token = localStorage.getItem("access_token");
    response = await makeRequest(token);
  }

  const result = await response.json();
  if (response.ok) {
    return { success: true, data: result.data || [] };
  }
  return { success: false, message: result.data || 'Gagal mengambil keranjang.' };
};

export const deleteCartItem = async (username, productId, token) => {
  if (!username || !productId || !token) {
    return { success: false, message: 'Data tidak lengkap.' };
  }

  const makeRequest = async (token) => {
    return await fetch(`https://khatering.shop/user/v1/cart/${username}/${productId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  let response = await makeRequest(token);
  if (response.status === 401) {
    const refreshedUser = await tryRefreshToken();
    if (!refreshedUser) return { success: false, message: 'Sesi berakhir. Silakan login ulang.' };
    token = localStorage.getItem("access_token");
    response = await makeRequest(token);
  }

  const result = await response.json();
  if (response.ok) {
    return { success: true, message: result.data || 'Produk berhasil dihapus dari keranjang.' };
  }
  return { success: false, message: result.data || 'Gagal menghapus produk.' };
};

export const decreaseCartItem = async (username, productId, quantity, token) => {
  if (!username || !productId || !quantity || !token) {
    return { success: false, message: 'Data tidak lengkap.' };
  }

  const makeRequest = async (token) => {
    return await fetch(
      `https://khatering.shop/user/api/v1/cart/${username}/${productId}/${quantity}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };

  let response = await makeRequest(token);
  if (response.status === 401) {
    const refreshedUser = await tryRefreshToken();
    if (!refreshedUser) return { success: false, message: 'Sesi berakhir. Silakan login ulang.' };
    token = localStorage.getItem("access_token");
    response = await makeRequest(token);
  }

  const result = await response.json();
  if (response.ok) {
    return { success: true, message: result.data || 'Quantity berhasil dikurangi.' };
  }
  return { success: false, message: result.data || 'Gagal mengurangi quantity.' };
};
