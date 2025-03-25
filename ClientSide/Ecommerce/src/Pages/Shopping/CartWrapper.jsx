import { SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import React, { useEffect } from "react";
import CartItemsContent from "./CartItemsContent";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { fetchAddress } from "@/ReduxToolkit/Address";

function CartWrapper({ cart, setCartOpen }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(state => state.Auth?.user)
    console.log(cart, "cart items ")
    function handleClick() {
        setCartOpen(false)
        navigate('/shop/checkout')
        dispatch(fetchAddress())

    }

    return <SheetContent className='w-1/2'>
        <SheetHeader><SheetTitle>Your Cart</SheetTitle></SheetHeader>
        <div >
            {cart?.map((element, index) => {
                return <CartItemsContent cartitems={element} key={index}> </CartItemsContent>
            })}
            <Button onClick={handleClick} className='w-full'  > <Link to={'/shop/checkout'}>Checkout</Link></Button>

        </div>
    </SheetContent>
}

export default CartWrapper;
