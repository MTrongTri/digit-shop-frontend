import React from "react";
import Header from "../MainLayout/Header";
import Footer from "../Footer";
import { Outlet } from "react-router-dom";
import Container from "@/components/Container";
import UserSideBar from "./components/UserSideBar";

function UserLayout() {
  return (
    <>
      <Header />
      <Container className="flex">
        <div className="flex gap-4 rounded-md md:mt-8">
          <div className="hidden flex-shrink-0 md:block">
            <UserSideBar />
          </div>
          <div className="flex-1">
            <Outlet />
          </div>
        </div>
      </Container>
      <Footer />
    </>
  );
}

export default UserLayout;
