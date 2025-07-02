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

export async function postCheckout(data) {
  let token = localStorage.getItem('access_token');

  const makeRequest = async (token) => {
    const response = await fetch('https://khatering.shop/user/api/v1/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      credentials: "include",
      body: JSON.stringify(data)
    });
    return response;
  };

  let response = await makeRequest(token);

  if (response.status === 401) {
    const username = await tryRefreshToken();
    if (!username) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");
      throw new Error('Unauthorized, please login again');
    }
    token = localStorage.getItem('access_token');
    response = await makeRequest(token);
  }

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Error posting checkout data');
  }

  if (response.status === 204) {
    return null;
  }

  return await response.json();
}
