import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import InputText from "../../../components/Input/InputText";
import TitleCard from "../../../components/Cards/TitleCard";
import { showNotification } from "../../common/headerSlice";
import useHandlerEditProfile from "../hooks/editProfile";
import { decryptPassword } from "../../../utils/decryptUtils";

import { Link } from "react-router-dom";

const INITIAL_LEAD_OBJ = {
  nama: "",
  no_telpn: "",
  tanggal_lahir: "",
  email: "",
  password: "",
  gender: "",
};

function ProfileSettings() {
  const [errorMessage, setErrorMessage] = useState("");
  const token = localStorage.getItem("token");
  const [user, setUser] = useState(INITIAL_LEAD_OBJ);
  const dispatch = useDispatch();
  const { handlerEditProfile } = useHandlerEditProfile();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/v1/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, [token]);

  const editProfile = async () => {
    try {
      const response = await axios.patch(
        "http://127.0.0.1:8000/api/v1/user/update",
        user,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Check if token is properly retrieved
          },
        }
      );
      dispatch(showNotification({ message: "Profile Updated", status: 1 }));
    } catch (error) {
      console.error(error);
    }
  };

  const saveNewProfile = async (e) => {
    e.preventDefault();
    if (user.nama.trim() === "")
      return setErrorMessage("nama produk tidak boleh kosong!");
    else if (user.no_telpn.trim() === "")
      return setErrorMessage("resep tidak boleh kosong!");
    else if (user.tanggal_lahir.trim() === "")
      return setErrorMessage("deskripsi tidak boleh kosong!");
    else if (user.email.trim() === "")
      return setErrorMessage("email tidak boleh kosong!");
    else if (user.password.trim() === "")
      return setErrorMessage("password tidak boleh kosong!");
    else if (user.gender.trim() === "")
      return setErrorMessage("gender tidak boleh kosong!");

    let newUser = {
      nama: user.nama,
      no_telpn: user.no_telpn,
      tanggal_lahir: user.tanggal_lahir,
      email: user.email,
      password: user.password,
      gender: user.gender,
    };

    console.log(newUser);
    await editProfile(newUser); // Call the editProfile function with the newUser object
    await handlerEditProfile(user, token);
    dispatch(showNotification({ message: "Updated Profile !", status: 1 }));
  };

  const updateFormValue = ({ updateType, value }) => {
    setUser({ ...user, [updateType]: value });
  };

  return (
    <form onSubmit={saveNewProfile}>
      <TitleCard title="Edit Profile" topMargin="mt-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputText
            type="text"
            labelTitle="Name"
            placeholder={user.nama}
            updateFormValue={updateFormValue}
            updateType="nama"
          />
          <InputText
            labelTitle="Email Id"
            placeholder={user.email}
            updateFormValue={updateFormValue}
            updateType="email"
          />
          <InputText
            labelTitle="Nomer Telepon"
            placeholder={user.no_telpn}
            type="number"
            updateFormValue={updateFormValue}
            updateType="no_telpn"
          />
          <InputText
            type="password"
            labelTitle="Password"
            placeholder={user.password.replace(/./g, "*")}
            updateFormValue={updateFormValue}
            updateType="password"
          />

          <InputText
            labelTitle="Tanggal Lahir"
            placeholder={user.tanggal_lahir}
            updateFormValue={updateFormValue}
            updateType="tanggal_lahir"
          />
          <InputText
            labelTitle="Gender"
            placeholder={user.gender}
            updateFormValue={updateFormValue}
            updateType="gender"
          />
        </div>
        <div className="divider"></div>
        <div className="mt-16">
          <button className="btn btn-primary float-right">Update</button>
        </div>
      </TitleCard>
    </form>
  );
}

export default ProfileSettings;
