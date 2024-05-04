import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../../features/common/headerSlice";
import AddPengeluaran from "../../../features/pengeluaranLain/components/addPengeluaranPage";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Add Bahan Baku" }));
  }, []);

  return (
    <>
      <AddPengeluaran />
    </>
  );
}

export default InternalPage;
