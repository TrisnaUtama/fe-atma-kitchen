import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../../features/common/headerSlice";
import DetailLaporan from "../../../features/laporanPenitip/component/detailLaporan";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "List Penitip" }));
  }, []);

  return (
    <>
      <DetailLaporan />
    </>
  );
}

export default InternalPage;
