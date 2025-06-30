export async function fetchHistory(username) {
  try {
    const token = localStorage.getItem('access_token');

    const response = await fetch(`https://khatering.shop/user/api/v1/history/${username}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) throw new Error(response.status);

    const result = await response.json();
    return result?.data ?? null;
  } catch (e) {
    return null;
  }
}
