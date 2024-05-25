import axios from "axios";

export async function getAllproduct() {
  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  try {
    const response = await axios.get(
      "http://127.0.0.1:8000/api/v1/limit-customer/getToday"
    );
    const data = response.data;
    return data;
  } catch (e) {
    console.log(e.response.data);
  }
}
