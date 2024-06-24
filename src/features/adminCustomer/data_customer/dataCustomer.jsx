import axios from "axios";

export async function searchCustomer(query) {
  try {
    const token = localStorage.getItem("token");
    console.log(query);
    console.log(token);

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const response = await axios.get(
      `http://127.0.0.1:8000/api/v1/cariData?query=${query}`,
      {
        method: "GET",
      }
    );
    const data = await response.data.data;
    console.log(data);
    return data;
  } catch (error) {
    return error;
  }
}

export async function getDataCustomer(id) {
  try {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const response = await axios.get(
      `http://127.0.0.1:8000/api/v1/getHistory/${id}`,
      {
        method: "GET",
      }
    );
    const data = await response.data.data;
    console.group(data);
    return data;
  } catch (error) {
    return error;
  }
}
