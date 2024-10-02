import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <header>
      <div>Header</div>
      <Outlet />
    </header>
  );
}

export default MainLayout;
