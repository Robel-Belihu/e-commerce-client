import React from "react";
import Menu from "./Menu";
import "../styles.css";

const Layout = ({ title = "Title", description = "Description", children }) => (
  <div className="flex flex-col flex-wrap w-full">
    <Menu />
    <div className="flex flex-col justify-center items-center">{children}</div>
  </div>
);

export default Layout;
