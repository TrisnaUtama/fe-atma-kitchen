import axios from "axios";
export const getJabatan = async () => {
  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  try {
    const response = await axios.get(
      "http://127.0.0.1:8000/api/v1/role/getAllRole"
    );
    const dataJabatan = response.data;
    return dataJabatan;
  } catch (error) {
    console.log(error.response.data);
  }
};

export default getJabatan;
