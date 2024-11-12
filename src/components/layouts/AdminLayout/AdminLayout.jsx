import Header from "@/components/layouts/AdminLayout/Header";
import Sidebar from "@/components/layouts/AdminLayout/Sidebar";
import { Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 px-8 py-6">
          <Header />
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default AdminLayout;
