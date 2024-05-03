import { useCallback, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

export default function useRegisterCustomer() {
    const [registrationError, setRegistrationError] = useState();
    const navigate = useNavigate();


    const registerCustomer = useCallback(async (formData) => {
        const { nama, no_telpn,tanggal_lahir ,email, password } = formData;
        const formDataObj = new FormData();

        formDataObj.append("email", email);
        formDataObj.append("password", password);
        formDataObj.append("nama", nama);
        formDataObj.append("no_telpn", no_telpn);
        formDataObj.append("tanggal_lahir", tanggal_lahir);
        
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/v1/auth/register", formData);
            // const userData = response.data.data;
            // console.log(userData);
            navigate('/');
            // window.location.href = "/";
      } catch (error) {
        if (error.response && error.response.data) {
          setRegistrationError(error.response.data);
        }
      }
    }, []);

    return { registerCustomer, registrationError };
  }