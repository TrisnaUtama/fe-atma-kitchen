import { useCallback, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

export default function useRegisterCustomer() {
  const [registrationError, setRegistrationError] = useState();
  const navigate = useNavigate();

  const registerCustomer = useCallback(async (formData) => {
    const { nama, no_telpn, tanggal_lahir, email, password } = formData;

    // Validasi untuk memastikan tidak ada field yang kosong
    if (!nama || !no_telpn || !tanggal_lahir || !email || !password) {
      setRegistrationError("Semua field harus diisi.");
      return;
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/v1/auth/register",
        formData
      );
      const userData = response.data.data;
      console.log(userData);
      // Jika registrasi berhasil, reset pesan error
      setRegistrationError(null);
      // Lakukan navigasi atau tindakan lain setelah registrasi
      navigate("/");
    } catch (error) {
      if (error.response && error.response.data) {
        // Jika ada respons dari server, atur pesan error sesuai respons
        setRegistrationError(
          error.response.data.message || "Email sudah terdaftar."
        );
      } else {
        // Jika tidak ada respons dari server, atur pesan error umum
        setRegistrationError("Terjadi kesalahan saat melakukan registrasi.");
      }
    }
  }, []);

  return { registerCustomer, registrationError };
}
