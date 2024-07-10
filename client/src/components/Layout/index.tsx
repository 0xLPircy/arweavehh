import { Outlet } from "react-router-dom";
import ScrollToTop from "./ScrollTop";

const Layout = () => (
  <>
    <ScrollToTop />
    <Outlet />
  </>
);

export default Layout;
