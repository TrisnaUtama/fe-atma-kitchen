import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../../features/common/headerSlice";
import EditPage from "../../../features/resep/components/editResepPage";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Edit Resep" }));
  }, []);

  return (
    <>
      <EditPage />
    </>
  );
}

export default InternalPage;
