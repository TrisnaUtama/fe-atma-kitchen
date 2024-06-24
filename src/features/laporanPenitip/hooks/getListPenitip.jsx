import axios from "axios";

export async function getListPenitip(id) {
    try {
        const token = localStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const response = await axios.get(`http://127.0.0.1:8000/api/v1/penitip/laporanPenitip/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error; 
    }
}