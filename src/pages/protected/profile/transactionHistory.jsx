import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../../features/common/headerSlice";
import ProfileSettings from "../../../features/customers/transcations/index";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Settings" }));
  }, []);

  return <ProfileSettings />;
}

export default InternalPage;
