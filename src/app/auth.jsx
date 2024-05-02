import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function useLoginHandler() {
  const [token, setToken] = useState();
  const [validation, setValidation] = useState();
  const [userLogin, setUserLogin] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const loginHandler = useCallback(
    async (formData) => {
      const { email, password } = formData;
      const formDataObj = new FormData();

      formDataObj.append("email", email);
      formDataObj.append("password", password);

      try {
        const response = await axios.post(
          `http://127.0.0.1:8000/api/v1/auth/login`,
          formDataObj
        );

        const userData = response.data.data;
        const accessToken = response.data.access_token;
        let userType;
        setUserLogin(userData);
        setToken(accessToken);
        localStorage.setItem("token", accessToken);

        if (userData.id_saldo != null) {
          userData.id_role = false;
        } else {
          userData.id_saldo = false;
        }

        if (userData.id_saldo !== null && userData.id_role === false) {
          userType = "customer";
          localStorage.setItem("userType", userType);
          navigate("/dashboardCustomer");
        } else if (userData.id_role === 3 && userData.id_saldo === false) {
          userType = "mo";
          localStorage.setItem("userType", userType);
          window.location.href = "/dashboard";
        } else if (userData.id_role === 2 && userData.id_saldo === false) {
          userType = "admin";
          localStorage.setItem("userType", userType);
          navigate("/dashboard");
        } else {
          userType = "owner";
          localStorage.setItem("userType", userType);
          navigate("/dashboard");
        }
      } catch (error) {
        if (error.response && error.response.data) {
          setValidation(error.response.data);
          console.log(error.response.data);
        }
      }
    },
    [navigate]
  );

  return { loginHandler, token, validation, userLogin };
}