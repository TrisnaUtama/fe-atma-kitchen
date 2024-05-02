import axios from "axios";
const getPenitip = async () => {
  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  try {
    const response = await axios.get(
      "http://127.0.0.1:8000/api/v1/penitipAdmin/getAllPenitip"
    );
    const dataResep = response.data;
    console.log(dataResep);
    return dataResep;
  } catch (error) {
    console.log(error.response.data);
  }
};

export default getPenitip;
