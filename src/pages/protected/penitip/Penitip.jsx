import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../../features/common/headerSlice";
import Penitip from "../../../features/penitip/index";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Penitip" }));
  }, []);

  return (
    <>
      <Penitip />
    </>
  );
}

export default InternalPage;
