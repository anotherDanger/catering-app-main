export async function postCheckout(data) {
  const token = localStorage.getItem('access_token');

  const response = await fetch('https://khatering.shop/user/api/v1/checkout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Error posting checkout data');
  }

  if (response.status === 204) {
    return null;
  }

  return await response.json();
}
