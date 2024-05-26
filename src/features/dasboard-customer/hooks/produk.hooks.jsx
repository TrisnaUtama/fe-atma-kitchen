import axios from "axios";

export async function getAllproduct() {
  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  try {
    const response = await axios.get(
      "http://127.0.0.1:8000/api/v1/limit-customer/getToday"
    );
    const data = response.data;
    return data;
  } catch (e) {
    console.log(e.response.data);
  }
}

export async function getSpecificProduct(id) {
  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  try {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/v1/produk-customer/${id}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error.response.data);
  }
}

export async function getSpecificHampers(id) {
  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  try {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/v1/produk-customer/hampers/${id}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error.response.data);
  }
}

export async function addPemesanan(data) {
  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  try {
    const response = await axios.post(
      `http://127.0.0.1:8000/api/v1/pemesanan/`,
      data
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error.response.data);
    throw error;
  }
}

export async function addNewAlamat(data) {
  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  try {
    const response = await axios.post(
      `http://127.0.0.1:8000/api/v1/alamat/`,
      data
    );
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.error(error.response.data);
    throw error;
  }
}

export async function getAlamatById(id) {
  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  try {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/v1/alamat/${id}`
    );
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.error(error.response.data);
    throw error;
  }
}

export async function getUser() {
  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/v1/user`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error.response.data);
    throw error;
  }
}

export async function getTotal(id) {
  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  try {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/v1/pemesanan/getTotal/${id}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error.response.data);
    throw error;
  }
}
