import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../../features/common/headerSlice";
import Karyawan from "../../../features/karyawan/index";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Karyawan" }));
  }, []);

  return <Karyawan />;
}

export default InternalPage;
