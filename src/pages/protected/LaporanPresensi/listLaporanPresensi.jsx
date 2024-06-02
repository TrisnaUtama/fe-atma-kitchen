import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../../features/common/headerSlice";
import DetailLaporanPresensi from "../../../features/LaporanPresensi/component/Presensi";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Data Presensi" }));
  }, []);

  return (
    <>
      <DetailLaporanPresensi />
    </>
  );
}

export default InternalPage;
