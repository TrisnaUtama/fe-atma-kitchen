// useHandlerEditProfile.js
import axios from "axios";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useHandlerEditProfile() {
  const [validation, setValidation] = useState();
  const navigate = useNavigate();

  const handlerEditProfile = useCallback(async (formData, token) => {
    try {
      const response = await axios.patch(
        "http://127.0.0.1:8000/api/v1/user/update",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        // If update is successful, redirect user to the profile page
        navigate("/settingProfile");
      }
    } catch (error) {
      // Handle validation errors or other errors
      if (error.response) {
        // Handle errors from server response
        setValidation(error.response.data);
        console.log(error.response.data);
      } else {
        // Handle other errors
        console.error(error);
      }
    }
  }, []);

  return { handlerEditProfile, validation };
}
