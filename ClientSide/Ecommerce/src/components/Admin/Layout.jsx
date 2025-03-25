import Header from "@/Pages/Admin/Header";
import React from "react";
import { Outlet } from "react-router-dom";

function AdminLayout() {
  return (<>
  <div className="w-full h-[100vh] bg-white ">
        <Header></Header>
    <div className="w-full h-[100vh]">
   
    <Outlet></Outlet>
      
  

    </div>
    

  </div>
  </>);
}

export default AdminLayout;
