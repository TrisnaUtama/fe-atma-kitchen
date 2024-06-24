import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../../features/common/headerSlice";
import EditPembelian from "../../../features/pembelian-bahan-baku/components/editPemebelianPage";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Edit Pembelian" }));
  }, []);

  return (
    <>
      <EditPembelian />
    </>
  );
}

export default InternalPage;
