import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../../features/common/headerSlice";
import EditGajiKaryawan from "../../../features/owner/index";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Edit Gaji" }));
  }, []);

  return <EditGajiKaryawan />;
}

export default InternalPage;
