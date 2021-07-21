import React, { Suspense } from "react";
import Routes from "../routes/routes";
import NavBar from "./NavBar";

export default function Layout() {
  return (
    <>
      <NavBar />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes />
      </Suspense>
    </>
  );
}
