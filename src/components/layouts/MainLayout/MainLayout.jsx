import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/MainLayout/Header";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default MainLayout;
