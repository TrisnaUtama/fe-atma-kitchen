import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../../features/common/headerSlice";
import AddKaryawan from "../../../features/karyawan/components/addKaryawanPage";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Add Karyawan" }));
  }, []);

  return <AddKaryawan />;
}

export default InternalPage;
