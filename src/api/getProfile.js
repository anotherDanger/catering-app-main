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

export function getStoredUser() {
  const token = localStorage.getItem("access_token");
  const username = localStorage.getItem("user");
  if (!token || !username) return null;
  return username;
}

export async function checkLogin() {
  const user = getStoredUser();
  if (user) return user;
  return await tryRefreshToken();
}

export async function logoutUser() {
  try {
    await fetch("https://khatering.shop/v1/logout", {
      method: "POST",
      credentials: "include",
    });
  } catch {}

  localStorage.removeItem("access_token");
  localStorage.removeItem("user");
  window.location.href = "/";
}

export async function loginUser({ username, password }) {
  try {
    const response = await fetch("https://khatering.shop/user/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Login gagal");
    }

    await response.json();

    const authResponse = await fetch("https://khatering.shop/v1/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
      credentials: "include",
    });

    if (!authResponse.ok) {
      throw new Error("Autentikasi tambahan gagal");
    }

    const tokenData = await authResponse.json();

    if (tokenData.access_token) {
      localStorage.setItem("access_token", tokenData.access_token);
    }

    localStorage.setItem("user", username);

    return username;
  } catch (error) {
    throw error;
  }
}

export async function registerUser({ first_name, last_name, username, password, no_hp }) {
  try {
    const response = await fetch("https://khatering.shop/user/v1/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ first_name, last_name, username, password, no_hp }),
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Registrasi gagal");
    }

    await response.json();

    const authResponse = await fetch("https://khatering.shop/v1/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
      credentials: "include",
    });

    if (!authResponse.ok) {
      throw new Error("Autentikasi tambahan gagal setelah registrasi");
    }

    const tokenData = await authResponse.json();

    if (tokenData.access_token) {
      localStorage.setItem("access_token", tokenData.access_token);
    }

    localStorage.setItem("user", username);

    return username;
  } catch (error) {
    throw error;
  }
}

