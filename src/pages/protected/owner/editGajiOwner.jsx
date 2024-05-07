import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../../features/common/headerSlice";
import EditGaji from "../../../features/owner/components/editGaji";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Edit Gaji" }));
  }, []);

  return <EditGaji />;
}

export default InternalPage;
