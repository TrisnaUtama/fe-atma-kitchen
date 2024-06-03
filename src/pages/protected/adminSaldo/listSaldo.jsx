import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../../features/common/headerSlice";
import ListSaldo from "../../../features/adminSaldo/index";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "List Penarikan Saldo" }));
  }, []);

  return (
    <>
      <ListSaldo />
    </>
  );
}

export default InternalPage;
