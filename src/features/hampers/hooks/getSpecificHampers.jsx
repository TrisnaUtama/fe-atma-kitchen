import axios from "axios";
const getHampers = async (id) => {
  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  try {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/v1/hampers/${id}`
    );
    console.log(response.data.data);
    return response.data;
  } catch (error) {
    console.log(error.response.data);
  }
};

export default getHampers;
