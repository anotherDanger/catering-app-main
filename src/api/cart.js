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
    const response = await fetch(`http://localhost:8083/v1/cart/${username}`, {
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
      return { success: false, message: result.message || 'Gagal menambahkan produk.' };
    }
  } catch (error) {
    return { success: false, message: 'Terjadi kesalahan jaringan.' };
  }
};
