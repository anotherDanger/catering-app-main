import { data } from "react-router-dom";

async function getProducts(){
    const request = new Request("http://localhost:8080/v1/products", {
        headers: {
            "Content-Type":"application/json"
        },
        method:"GET"
    });

    try{
        const data = await fetch(request);
    if (! data.ok){
     throw new(data.statusText)   
    }
    const response = await data.json();

    return response.data;
    }catch(error){
        console.log(error)
    }

}

export default getProducts;