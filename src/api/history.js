export async function fetchHistory(username) {
  try {
    const response = await fetch("https://khatering.shop/user/v1/history/" + username);
    if (!response.ok) throw new Error(response.status);
    const result = await response.json();
    if (result && result.data) {
      return result.data;
    } else {
      return null;
    }
  } catch (e) {
    return null;
  }
}
