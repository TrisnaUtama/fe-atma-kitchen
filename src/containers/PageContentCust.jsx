import Header from "./HeaderCust";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import SuspenseContent from "./SuspenseContent";
import getRoutes from "../routes/index";

const Page404 = lazy(() => import("../pages/protected/404"));

function PageContent() {
  const mainContentRef = useRef(null);
  const { pageTitle } = useSelector((state) => state.header);
  const [routes, setRoutes] = useState([]);

  // Scroll back to top on new page load

  useEffect(() => {
    const fetchedRoutes = async () => {
      try {
        const fetchedRoutes = await getRoutes();
        setRoutes(fetchedRoutes);
      } catch (error) {
        console.log("error fetching routes : " + error);
      }
    };
    fetchedRoutes();
  }, []);


  // Scroll back to top on new page load
  useEffect(() => {
    mainContentRef.current.scroll({
      top: 0,
      behavior: "smooth",
    });
  }, [pageTitle]);

  return (
    <div className="drawer-content flex flex-col ">
      <Header />
      <main
        className="flex-1 overflow-hidden md:pt-4 pt-4 px-6  bg-base-200"
        ref={mainContentRef}
      >
        {/* <DashboardCustomer /> */}
        <Suspense fallback={<SuspenseContent />}>
          <Routes>
            {routes.map((route, key) => {
              return (
                <Route
                  key={key}
                  exact={true}
                  path={`${route.path}`}
                  element={<route.component />}
                />
              );
            })}
            <Route path="*" element={<Page404 />} />
          </Routes>
        </Suspense>
        <div className="h-16"></div>
      </main>
    </div>
  );
}

export default PageContent;
