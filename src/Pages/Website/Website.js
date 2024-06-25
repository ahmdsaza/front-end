import React from "react";
import TheNavBar from "../../Components/Website/NavBar/TheNavBar";
import { Outlet } from "react-router-dom";
import Footer from "../../Components/Website/Footer/Footer";

export default function Website() {
  return (
    <>
      <TheNavBar />
      <Outlet />
      <Footer />
    </>
  );
}
