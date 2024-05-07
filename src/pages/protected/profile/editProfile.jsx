import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../../features/common/headerSlice";
import EditProfile from "../../../features/customers/components/editProfilePage";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Edit Profile" }));
  }, []);

  return (
    <>
      <EditProfile />
    </>
  );
}

export default InternalPage;
