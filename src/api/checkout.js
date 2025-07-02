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

export async function postCheckout(data) {
  const makeRequest = async (accessToken) => {
    return await fetch('https://khatering.shop/user/api/v1/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      credentials: "include",
      body: JSON.stringify(data)
    });
  };

  let token = localStorage.getItem('access_token');
  let response = await makeRequest(token);

  if (response.status === 401) {
    const refreshed = await tryRefreshToken();
    if (refreshed) {
      token = localStorage.getItem('access_token');
      response = await makeRequest(token);
    }
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: response.statusText }));
    throw new Error(errorData.message || 'Error posting checkout data');
  }

  if (response.status === 204) {
    return null;
  }

  return await response.json();
}