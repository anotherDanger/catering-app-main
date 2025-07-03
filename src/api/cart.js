export async function tryRefreshToken() {
  const refreshResponse = await fetch("https://khatering.shop/v1/refresh", {
    method: "POST",
    credentials: "include",
  });

  if (refreshResponse.ok) {
    const refreshData = await refreshResponse.json();
    localStorage.setItem("access_token", refreshData.access_token);
    localStorage.setItem("user", refreshData.username);
    return true;
  }

  localStorage.removeItem("access_token");
  localStorage.removeItem("user");
  return false;
}

export const addToCart = async ({ product, quantity, username }) => {
  if (!product || !username) {
    throw new Error('Data tidak lengkap');
  }

  const payload = {
    product_id: product.product_id,
    product_name: product.product_name,
    product_price: product.product_price,
    quantity: quantity,
    total_price: product.product_price * quantity,
  };
  
  let token = localStorage.getItem('access_token');
  let response = await fetch(`https://khatering.shop/user/api/v1/cart/${username}/${quantity}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (response.status === 401) {
    const refreshed = await tryRefreshToken();
    if (refreshed) {
      token = localStorage.getItem('access_token');
      response = await fetch(`https://khatering.shop/user/api/v1/cart/${username}/${quantity}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
    }
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.data || 'Gagal menambahkan produk.');
  }

  return await response.json();
};

export const getCart = async (username) => {
  if (!username) {
    throw new Error('Username tidak tersedia.');
  }

  let token = localStorage.getItem('access_token');
  let response = await fetch(`https://khatering.shop/user/api/v1/cart/${username}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (response.status === 401) {
    const refreshed = await tryRefreshToken();
    if (refreshed) {
      token = localStorage.getItem('access_token');
      response = await fetch(`https://khatering.shop/user/api/v1/cart/${username}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
    }
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.data || 'Gagal mengambil keranjang.');
  }

  const result = await response.json();
  return result.data || [];
};

export const deleteCartItem = async (username, productId) => {
  if (!username || !productId) {
    throw new Error('Data tidak lengkap.');
  }

  let token = localStorage.getItem('access_token');
  let response = await fetch(`https://khatering.shop/user/v1/cart/${username}/${productId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (response.status === 401) {
    const refreshed = await tryRefreshToken();
    if (refreshed) {
      token = localStorage.getItem('access_token');
      response = await fetch(`https://khatering.shop/user/v1/cart/${username}/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
    }
  }
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.data || 'Gagal menghapus produk dari keranjang.');
  }

  return await response.json();
};

export const decreaseCartItem = async (username, productId, quantity) => {
  if (!username || !productId || !quantity) {
    throw new Error('Data tidak lengkap.');
  }

  let token = localStorage.getItem('access_token');
  let response = await fetch(`https://khatering.shop/user/api/v1/cart/${username}/${productId}/${quantity}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (response.status === 401) {
    const refreshed = await tryRefreshToken();
    if (refreshed) {
      token = localStorage.getItem('access_token');
      response = await fetch(`https://khatering.shop/user/api/v1/cart/${username}/${productId}/${quantity}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
    }
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.data || 'Gagal mengurangi kuantitas produk.');
  }
  
  if (response.status === 204) {
    return null;
  }
  
  return await response.json();
};