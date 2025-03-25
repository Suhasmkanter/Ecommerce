import Home from "@/Pages/Shopping/Home";
import Listing from "@/Pages/Shopping/Listing";
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Heading from "./Heading";
import { useDispatch, useSelector } from "react-redux";

function ShoppingLayout() {
  const [CartOpen, setCartOpen] = useState(false)


  return <div className="relative max-w-full">
    <div>
      <div style={{ boxShadow: 'rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px' }} className="relative w-full box-shadow:;  h-[70px]">
        <Heading
          CartOpen={CartOpen} setCartOpen={setCartOpen}></Heading>
      </div>
    </div>

    <div className="w-full h-[100vh] ">
      <Outlet></Outlet>

    </div>



  </div>;
}

export default ShoppingLayout;
