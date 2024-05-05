import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../../features/common/headerSlice";
import EditKaryawanPage from "../../../features/karyawan/components/editKaryawanPage";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Edit Karyawan" }));
  }, []);

  return <EditKaryawanPage />;
}

export default InternalPage;
