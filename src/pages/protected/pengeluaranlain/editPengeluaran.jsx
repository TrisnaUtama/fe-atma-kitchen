import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../../features/common/headerSlice";
import EditPengeluaranPage from "../../../features/pengeluaranLain/components/editPengeluaranPage";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Edit Pengeluaran" }));
  }, []);

  return (
    <>
      <EditPengeluaranPage />
    </>
  );
}

export default InternalPage;