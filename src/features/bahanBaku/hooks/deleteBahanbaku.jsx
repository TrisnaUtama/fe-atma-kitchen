import axios from "axios";
const deleteBahanbaku = async (id) => {
  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  try {
    const response = await axios.delete(
      `http://127.0.0.1:8000/api/v1/bahanbaku/${id}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error.response.data);
  }
};

export default deleteBahanbaku;