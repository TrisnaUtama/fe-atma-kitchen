import axios from "axios";
const getBahanBaku = async (id) => {
  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  try {
    const response = await axios.get(
      "http://127.0.0.1:8000/api/v1/bahanbaku/"+id
    );
    console.log(response)
    const dataBahanBaku = response.data;
    return dataBahanBaku;
  } catch (error) {
    console.log(error.response.data);
  }
};

export default getBahanBaku;