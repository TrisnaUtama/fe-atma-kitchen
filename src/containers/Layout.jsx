import PageContentCust from "./PageContentCust";
import PageContent from "./PageContent";
import LeftSidebar from "./LeftSidebar";
import { useSelector, useDispatch } from "react-redux";
import RightSidebar from "./RightSidebar";
import { useEffect } from "react";
import { removeNotificationMessage } from "../features/common/headerSlice";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import ModalLayout from "./ModalLayout";

function Layout() {
  const dispatch = useDispatch();
  const { newNotificationMessage, newNotificationStatus } = useSelector(
    (state) => state.header
  );

  useEffect(() => {
    if (newNotificationMessage !== "") {
      if (newNotificationStatus === 1)
        NotificationManager.success(newNotificationMessage, "Success");
      if (newNotificationStatus === 0)
        NotificationManager.error(newNotificationMessage, "Error");
      dispatch(removeNotificationMessage());
    }
  }, [newNotificationMessage]);

  const userType = localStorage.getItem("userType");
  console.log(userType);

  return (
    <>
      {userType === "customer" ? (
        <div className="drawer  lg:drawer-open">
          <PageContentCust />
        </div>
      ) : (
        <>
          <div className="drawer  lg:drawer-open">
            <input
              id="left-sidebar-drawer"
              type="checkbox"
              className="drawer-toggle"
            />
            <PageContent />
            <LeftSidebar />
          </div>
          <RightSidebar />
          <NotificationContainer />
          <ModalLayout />
        </>
      )}
    </>
  );
}

export default Layout;
