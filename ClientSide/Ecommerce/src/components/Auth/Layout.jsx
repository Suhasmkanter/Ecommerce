import React from "react";
import { Outlet } from "react-router-dom";

function Layout() {
  return (<>
  <div className="max-w-full flex h-[100vh] bg-black px-4 py-4"> 

    <div className="flex justify-around w-full h-[100%] bg-white gap-3 px-2 py-2">
       <div className="tracking-tighter box-border w-1/2 h-full bg-black border-2 border-black flex justify-center items-center">
           
            <h1 className="text-4xl font-semibold text-center text-white">Hello Guys Welcome To the Ecommerce Website</h1>

       </div>

       <div className="box-border w-1/2 h-full bg-white border-2 ">
           
           <div className="w-full h-full flex justify-center items-center">
            <Outlet></Outlet>

           </div>
           



           </div>

    </div>
   
   
    </div>
  
  
  
  </>)
}

export default Layout;
