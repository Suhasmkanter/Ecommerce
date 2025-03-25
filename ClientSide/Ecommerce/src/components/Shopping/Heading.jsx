import { Home, LogOut, Menu, PersonStandingIcon, ShoppingCart, UserCog } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { shoppingViewHeaderMenuItems } from "../config";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import CartItemsContent from "@/Pages/Shopping/CartItemsContent";
import CartWrapper from "@/Pages/Shopping/CartWrapper";
import { FetchCart } from "@/ReduxToolkit/CartItems";
import { current } from "@reduxjs/toolkit";



function Heading({ CartOpen, setCartOpen }) {
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams()
    function handleNavigate(path) {
        sessionStorage.removeItem('filter')
        if (path.id == 'products') {
            navigate('/shop/listing')
            return

        }

        const currentFilter = {
            Category: [path.id]
        }

        setSearchParams(new URLSearchParams(`?Category=${path.id}`))

        sessionStorage.setItem('filter', JSON.stringify(currentFilter))

        setOpen(false)

    }
    return (<>
        <div className="flex justify-around items-center w-full h-full " >
            <div className="flex h-full  justify-center items-center mr-auto">
                <div className="ml-auto block lg:hidden md:block  sm:block">
                    <SheetItemsforHome handleNavigate={handleNavigate} open={open} setOpen={setOpen} className=''></SheetItemsforHome>
                </div>

                <h1 onClick={() => navigate('/shop')} className="text-[1em] cursor-pointer flex ml-4">   <Home></Home>Ecommerce</h1>
            </div>
            <div className=" hidden lg:flex md:hidden sm:hidden  justify-evenly gap-2 mr-auto"> {
                shoppingViewHeaderMenuItems?.map((element, index) => {
                    return <p onClick={() => handleNavigate(element)} className="text-[20px] cursor-pointer" key={index} >
                        {element.label}
                    </p>
                })
            }

            </div>
            <div>
                <ShoppingcartAndAccount CartOpen={CartOpen} setCartOpen={setCartOpen} />

            </div>


        </div>




    </>);
}
function SheetItemsforHome({ open, setOpen, handleNavigate }) {

    return <Sheet open={open} onOpenChange={setOpen}
    >
        <SheetTrigger asChild>
            <div className='flex mr-auto' >
                <Button variant='outline' className="font-[30px]" size='icon'>
                    <Menu className="font-[30px]"></Menu>
                    <span className="sr-only">ToggleBUtton</span>
                </Button>

            </div>

        </SheetTrigger>
        <SheetContent side="left">
            <SheetHeader>
                <SheetTitle>Hello world</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col" >
                {
                    shoppingViewHeaderMenuItems?.map((element, index) => {
                        return <p onClick={() => handleNavigate(element)} className="text-[20px] cursor-pointer" key={index} >
                            {element.label}
                        </p>
                    })
                }

            </div>
        </SheetContent>
    </Sheet>

}

function ShoppingcartAndAccount({ CartOpen, setCartOpen }) {
    const dispatch = useDispatch()
    const user = useSelector(state => state?.Auth?.user)
    console.log(user)
    const cartitems = useSelector(state => state?.cartFunction)
    console.log(cartitems)
    const navigate = useNavigate()

    return <div className="flex gap-2">
        <Sheet open={CartOpen} onOpenChange={() => {
            setCartOpen(!CartOpen)
        }}>
            <SheetTrigger>
                <Button onClick={() => {
                    setCartOpen(!CartOpen)
                }} >
                    <ShoppingCart></ShoppingCart>
                    <span className="sr-only" > ShoppingCart</span>
                </Button>
            </SheetTrigger>

            <CartWrapper setCartOpen={setCartOpen} cart={cartitems.cartItems}></CartWrapper>
        </Sheet>


        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    <AvatarFallback >
                        {user?.user[0]?.toUpperCase()}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="left" className="bg-white " >
                <DropdownMenuItem>
                    Logged In as {user?.user?.slice(0, 5)}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/shop/account')}>
                    <UserCog></UserCog>
                    Account
                </DropdownMenuItem>
                <DropdownMenuSeparator></DropdownMenuSeparator>
                <DropdownMenuItem>
                    <LogOut></LogOut>
                    LogOut
                </DropdownMenuItem>

            </DropdownMenuContent>
        </DropdownMenu>



    </div>
}



export default Heading;
