import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../../features/common/headerSlice";
import AddPenitip from "../../../features/penitip/components/addPenitipPage";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Add Penitip" }));
  }, []);

  return (
    <>
      <AddPenitip />
    </>
  );
}

export default InternalPage;
