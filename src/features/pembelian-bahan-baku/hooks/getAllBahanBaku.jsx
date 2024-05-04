import axios from "axios";
const getBahanBaku = async () => {
  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  try {
    const response = await axios.get(
      "http://127.0.0.1:8000/api/v1/bahanbakuMO/getAllBahanBaku"
    );
    const dataPemeblian = response.data;
    console.log(dataPemeblian);
    return dataPemeblian;
  } catch (error) {
    console.log(error.response.data);
  }
};

export default getBahanBaku;
