import Footer from "@/components/layouts/AuthLayout/Footer";
import Header from "@/components/layouts/AuthLayout/Header";
import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <>
      <Header></Header>
      <Outlet />
      <Footer></Footer>
    </>
  );
}

export default AuthLayout;
