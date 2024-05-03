import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../../features/common/headerSlice";
import EditPenitipPage from "../../../features/penitip/components/editPenitipPage";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Edit Penitip" }));
  }, []);

  return (
    <>
      <EditPenitipPage />
    </>
  );
}

export default InternalPage;