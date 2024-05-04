import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../../features/common/headerSlice";
import Pengeluaran from "../../../features/pengeluaranLain/index";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Pengeluaran" }));
  }, []);

  return (
    <>
      <Pengeluaran />
    </>
  );
}

export default InternalPage;
