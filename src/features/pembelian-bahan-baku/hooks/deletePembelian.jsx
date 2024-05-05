import axios from "axios";
const deletePembelian = async (id) => {
  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  try {
    const response = await axios.delete(
      `http://127.0.0.1:8000/api/v1/pembelianBahanBaku/${id}`
    );
    window.location.href = "/pembelianBahanBaku";
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error.response.data);
  }
};

export default deletePembelian;
