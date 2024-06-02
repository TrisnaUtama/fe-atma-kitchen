import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const token = localStorage.getItem("token");

export async function processOrder(selectedRows) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  try {
    const response = await axios.post(
      `http://127.0.0.1:8000/api/v1/pemesanan-to-proses/process-orders`,
      {
        selectedOrderIds: selectedRows,
      }
    );
    return response.data;
  } catch (error) {
    if (
      error.response.status === 400 &&
      error.response.data.insufficient_stock
    ) {
      const insufficientStock = error.response.data.insufficient_stock;
      const messages = insufficientStock.map(
        (stock) =>
          `${stock.ingredient}: Insufficient stock. Required quantity: ${stock.required_quantity}, Available stock: ${stock.available_stock}`
      );
      messages.forEach((message) => toast.error(message));
    } else {
      console.error("Error processing order:", error.response.data);
      throw error;
    }
    throw error;
  }
}
