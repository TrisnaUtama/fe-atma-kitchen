import axios from "axios";
const getPenitip = async (id) => {
  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  try {
    const response = await axios.get(
      "http://127.0.0.1:8000/api/v1/penitip/"+id
    );
    console.log(response)
    const dataPenitip = response.data;
    return dataPenitip;
  } catch (error) {
    console.log(error.response.data);
  }
};

export default getPenitip;