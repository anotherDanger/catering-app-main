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

  try {
    const response = await fetch(`http://localhost:8083/v1/cart/${username}/${quantity}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (response.ok) {
      return { success: true, message: 'Produk berhasil ditambahkan ke keranjang!' };
    } else {
      return { success: false, message: result.data || 'Gagal menambahkan produk.' };
    }
  } catch (error) {
    return { success: false, message: 'Terjadi kesalahan jaringan.' };
  }
};

export const getCart = async (username, token) => {
  if (!username || !token) {
    return { success: false, message: 'Username atau token tidak tersedia.' };
  }

  try {
    const response = await fetch(`http://localhost:8083/v1/cart/${username}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();

    if (response.ok) {
      return { success: true, data: result.data || [] };
    } else {
      return { success: false, message: result.data || 'Gagal mengambil keranjang.' };
    }
  } catch (error) {
    return { success: false, message: 'Terjadi kesalahan jaringan.' };
  }
};

export const deleteCartItem = async (username, productId, token) => {
  if (!username || !productId || !token) {
    return { success: false, message: 'Data tidak lengkap.' };
  }

  try {
    const response = await fetch(`http://localhost:8083/v1/cart/${username}/${productId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();

    if (response.ok) {
      return { success: true, message: result.data || 'Produk berhasil dihapus dari keranjang.' };
    } else {
      return { success: false, message: result.data || 'Gagal menghapus produk.' };
    }
  } catch (error) {
    return { success: false, message: 'Terjadi kesalahan jaringan.' };
  }
};

export const decreaseCartItem = async (username, productId, quantity, token) => {
  if (!username || !productId || !quantity || !token) {
    return { success: false, message: 'Data tidak lengkap.' };
  }

  try {
    const response = await fetch(
      `http://localhost:8083/v1/cart/${username}/${productId}/${quantity}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const result = await response.json();

    if (response.ok) {
      return { success: true, message: result.data || 'Quantity berhasil dikurangi.' };
    } else {
      return { success: false, message: result.data || 'Gagal mengurangi quantity.' };
    }
  } catch (error) {
    return { success: false, message: 'Terjadi kesalahan jaringan.' };
  }
};
