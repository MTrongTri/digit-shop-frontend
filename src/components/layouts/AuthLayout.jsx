import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <header>
      Authlayout
      <Outlet />
    </header>
  );
}

export default AuthLayout;
