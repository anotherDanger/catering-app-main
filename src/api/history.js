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

export async function fetchHistory(username) {
  const fetchWithToken = async () => {
    const token = localStorage.getItem('access_token');
    const response = await fetch(`https://khatering.shop/user/api/v1/history/${username}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.status === 401) return null;
    if (!response.ok) throw new Error(response.status);
    const result = await response.json();
    return result?.data ?? null;
  };

  let result = await fetchWithToken();
  if (result === null) {
    const refreshedUser = await tryRefreshToken();
    if (!refreshedUser) return null;
    result = await fetchWithToken();
  }

  return result;
}
