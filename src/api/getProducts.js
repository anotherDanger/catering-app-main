async function getProducts() {
    const request = new Request("https://khatering.shop/user/v1/products", {
        headers: {
            "Content-Type": "application/json"
        },
        method: "GET"
    });

    try {
        const response = await fetch(request);
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.log(error);
    }
}

export async function getProductImage(filename) {
  const response = await fetch(`https://khatering.shop/user/images/${filename}`, {
    method: "GET"
  });

  if (!response.ok) return null;
  const blob = await response.blob();
  return URL.createObjectURL(blob);
}



export default getProducts;
