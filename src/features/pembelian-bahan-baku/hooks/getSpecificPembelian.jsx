import axios from "axios";
const getProduct = async (id) => {
  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  try {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/v1/pembelianBahanBaku/${id}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error.response.data);
  }
};

export default getProduct;


