import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TitleCard from "../../../components/Cards/TitleCard";
import { showNotification } from "../../common/headerSlice";
import InputText from "../../../components/Input/InputText";
import axios from "axios";
import { Link } from "react-router-dom";

function ProfileSettings() {
  const token = localStorage.getItem("token");
  const [trans, setTrans] = useState([]);
  const [user, setUser] = useState([]);
  // const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduk = async () => {
      console.log(token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/v1/user");
        const fetchedProduk = response.data;
        console.log(fetchedProduk);
        setUser(fetchedProduk);
        setTrans(fetchedProduk);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduk();
  }, []);

  const dispatch = useDispatch();

  // Call API to update profile settings changes
  const editProfile = () => {
    dispatch(showNotification({ message: "Profile Updated", status: 1 }));
  };

  const updateFormValue = ({ updateType, value }) => {
    console.log(updateType);
  };

  const [isDisabled, setDisabled] = useState(false);

  return (
    <>
      <TitleCard title="Profile Settings" topMargin="mt-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            className="input input-bordered w-full max-w-xs"
            disabled
            type="text"
            placeholder={user.nama}
            style={{ backgroundColor: "" }}
          />
          <input
            className="input input-bordered w-full max-w-xs"
            disabled
            type="text"
            placeholder={user.email}
            // updateFormValue={updateFormValue}
          />
          <input
            className="input input-bordered w-full max-w-xs"
            disabled
            type="text"
            placeholder={user.no_telpn}
            // updateFormValue={updateFormValue}
          />
          <input
            className="input input-bordered w-full max-w-xs"
            disabled
            type="text"
            placeholder={user.tanggal_lahir}
            // updateFormValue={updateFormValue}
          />
          <input
            className="input input-bordered w-full max-w-xs"
            disabled
            type="text"
            placeholder={user.gender}
            // updateFormValue={updateFormValue}
          />
        </div>
        <div className="divider"></div>

        <div className="mt-16">
          <Link to="/updateProfile">
            <button className="btn btn-primary float-right">Edit</button>
          </Link>
        </div>
      </TitleCard>
    </>
  );
}

export default ProfileSettings;
