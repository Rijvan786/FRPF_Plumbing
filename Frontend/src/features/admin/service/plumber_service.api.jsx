import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/admin",
  withCredentials: true,
});

export async function CreateService(payload) {
  // If payload is FormData, axios handles multipart headers
  const response = await api.post("/createService", payload, {
    headers: payload instanceof FormData ? { "Content-Type": "multipart/form-data" } : undefined,
  });
  return response.data;
}

export async function GetTodayRegisterTechnicians() {
  const response = await api.get("/getTodayRegisterTechnicians");
  return response.data;
}

export async function VerifyTechnician({ email }) {
  const response = await api.post("/verifyTechnician", { email });
  return response.data;
}

export default api;
