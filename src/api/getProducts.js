async function getProducts() {
    const request = new Request("https://khatering/v1/products", {
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

export default getProducts;
