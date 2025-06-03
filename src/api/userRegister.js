async function userRegister(form) {
    const formData = new FormData(form);
    const jsonObj = Object.fromEntries(formData.entries());
    
    const request = new Request("http://localhost:8080/v1/login", {
      method: "POST", // wajib pakai method POST untuk kirim data
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(jsonObj)
    });
  
    try {
      const response = await fetch(request);
      if (!response.ok) {
        throw new Error(response.statusText); // perbaiki throw error
      }
      const data = await response.json();
      return data; // asumsi API response seperti { data: ... }
    } catch (error) {
      console.error(error);
      // bisa return null atau throw error supaya caller tahu gagal
      throw error; 
    }
  }
  
  export default userRegister;