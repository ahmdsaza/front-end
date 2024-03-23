import React from "react";
import TheNavBar from "../../Components/Website/NavBar/TheNavBar";
import { Outlet } from "react-router-dom";

export default function Website() {
  return (
    <>
      <TheNavBar />
      <Outlet />
    </>
  );
}
