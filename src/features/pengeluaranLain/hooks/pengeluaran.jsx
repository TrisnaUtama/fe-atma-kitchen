import axios from "axios";
const getPengeluaran = async (id) => {
  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  try {
    const response = await axios.get(
      "http://127.0.0.1:8000/api/v1/pengeluaranLain/"+id
    );
    console.log(response)
    const dataPengeluaran = response.data;
    return dataPengeluaran;
  } catch (error) {
    console.log(error.response.data);
  }
};

export default getPengeluaran;