import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../../features/common/headerSlice";
import ListPenitip from "../../../features/laporanPenitip/component/listDataPenitipPage";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "List Penitip" }));
  }, []);

  return (
    <>
      <ListPenitip />
    </>
  );
}

export default InternalPage;
