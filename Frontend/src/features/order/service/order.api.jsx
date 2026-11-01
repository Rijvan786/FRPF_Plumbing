import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api/order",
    withCredentials: true
});

export async function CreateOrder(payload) {
    const formData = payload instanceof FormData 
        ? payload 
        : (payload?.formdata || payload?.formData || payload);

    const response = await api.post("/CreateOrder", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
    return response.data;
}

export async function GetOrderDetail() {
    const response = await api.get("/GetOrderDetail");
    return response.data;
}
