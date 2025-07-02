export async function tryRefreshToken() {
  const refreshResponse = await fetch("https://khatering.shop/v1/refresh", {
    method: "POST",
    credentials: "include",
  });

  if (refreshResponse.ok) {
    const refreshData = await refreshResponse.json();
    localStorage.setItem("access_token", refreshData.access_token);
    localStorage.setItem("user", refreshData.username);
    return refreshData.access_token;
  }

  localStorage.removeItem("access_token");
  localStorage.removeItem("user");
  return null;
}

async function withTokenRetry(fetchFn) {
  let result = await fetchFn(localStorage.getItem("access_token"));
  if (result.status === 401) {
    const newToken = await tryRefreshToken();
    if (!newToken) return { success: false, message: "Sesi kedaluwarsa. Silakan login ulang." };
    result = await fetchFn(newToken);
  }
  return result;
}

export const addToCart = async ({ product, quantity, token, username }) => {
  if (!product || !username) return { success: false, message: 'Data tidak lengkap' };

  const payload = {
    product_id: product.product_id,
    product_name: product.product_name,
    product_price: product.product_price,
    quantity,
    total_price: product.product_price * quantity,
  };

  return await withTokenRetry(async (tokenToUse) => {
    const response = await fetch(`https://khatering.shop/user/api/v1/cart/${username}/${quantity}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenToUse}`,
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    return response.ok
      ? { success: true, message: 'Produk berhasil ditambahkan ke keranjang!' }
      : { success: false, message: result.data || 'Gagal menambahkan produk.' };
  });
};

export const getCart = async (username, token) => {
  if (!username) return { success: false, message: 'Username tidak tersedia.' };

  return await withTokenRetry(async (tokenToUse) => {
    const response = await fetch(`https://khatering.shop/user/api/v1/cart/${username}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${tokenToUse}`,
      },
    });

    const result = await response.json();
    return response.ok
      ? { success: true, data: result.data || [] }
      : { success: false, message: result.data || 'Gagal mengambil keranjang.' };
  });
};

export const deleteCartItem = async (username, productId, token) => {
  if (!username || !productId) return { success: false, message: 'Data tidak lengkap.' };

  return await withTokenRetry(async (tokenToUse) => {
    const response = await fetch(`https://khatering.shop/user/v1/cart/${username}/${productId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${tokenToUse}`,
      },
    });

    const result = await response.json();
    return response.ok
      ? { success: true, message: result.data || 'Produk berhasil dihapus dari keranjang.' }
      : { success: false, message: result.data || 'Gagal menghapus produk.' };
  });
};

export const decreaseCartItem = async (username, productId, quantity, token) => {
  if (!username || !productId || !quantity) return { success: false, message: 'Data tidak lengkap.' };

  return await withTokenRetry(async (tokenToUse) => {
    const response = await fetch(
      `https://khatering.shop/user/api/v1/cart/${username}/${productId}/${quantity}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${tokenToUse}`,
        },
      }
    );

    const result = await response.json();
    return response.ok
      ? { success: true, message: result.data || 'Quantity berhasil dikurangi.' }
      : { success: false, message: result.data || 'Gagal mengurangi quantity.' };
  });
};
