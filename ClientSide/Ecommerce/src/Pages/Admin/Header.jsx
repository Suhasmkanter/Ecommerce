import { FishOff, LogOutIcon } from "lucide-react";
import { X } from 'lucide-react'
import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { User2Icon } from 'lucide-react'
function Header() {
  const navigate = useNavigate()
  const [toggle, settoggle] = useState(false)
  function showsidebox() {
    settoggle(!toggle)
  }
  return (<>

    <div className="w-full h-[60px] bg-black text-white flex">
      <aside className={`${toggle ? 'flex' : 'hidden'} w-[200px] md:hidden p-3 absolute h-[100vh] bg-white flex-col   justify-evenly items-end z-30 `}>
        <X onClick={showsidebox} className="w-[40px] h-[40px] text-black" />
        <div className="w-full h-full font-semibold text-xl mt-[20px] text-black
         sm:flex gap-3 flex flex-col justify-baseline items-center " >
          <h4 className=" dashboard w-[full] h-[40px]" >Dashboard</h4>
          <h4 className=" product w-[full] h-[40px]" >Product</h4>
          <h4 className=" others w-[full] h-[40px]" >Others</h4>
        </div>

      </aside>
      <div className="w-full h-[full] flex justify-center items-center px-4">
        <div onClick={showsidebox} className="flex md:hidden sm:hidden flex-col gap-1 left-[-200px]  sm:relative z-20">
          <span className="block rounded-lg w-6 h-1 bg-white"></span>
          <span className="block rounded-lg  w-6 h-1 bg-white"></span>
          <span className="block rounded-lg  w-6 h-1 bg-white"></span>
        </div>
        <h1 className="text-2xl font-semibold sm:flex hidden   mr-auto">Admin</h1>
        <div className="font-semibold text-xl
        m-auto lg:m-auto sm:flex gap-3 hidden" >
          <h4 className=" dashboard  cursor-pointer" onClick={() => { navigate('Dashboard') }} >Dashboard</h4>
          <h4 className=" product cursor-pointer" onClick={() => { navigate('Product') }} >Product</h4>
          <h4 className=" others cursor-pointer" onClick={() => { navigate('Orders') }} >Orders</h4>
        </div>
        <h4 className="ml-auto text-[20px]"><LogOutIcon></LogOutIcon></h4>


      </div>




    </div>


  </>);
}

export default Header;
