import axios from "axios";
const deleteHampers = async (id) => {
  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  try {
    const response = await axios.delete(
      `http://127.0.0.1:8000/api/v1/hampers/${id}`
    );
    console.log(response.data);
    window.location.href = "/hampers";
    return response.data;
  } catch (error) {
    console.log(error.response.data);
  }
};

export default deleteHampers;
