import Form from "@/components/common/Form";
import React, { useState } from "react";
import CartItemsContent from "./CartItemsContent";
import { useSelector } from "react-redux";
import { addressFormControls } from "@/components/config";
import Addresscard from "./Addresscard";
import { Button } from "@/components/ui/button";

function Checkout({ indexvalue, setindexvalue, handlePaypalCheckout, OnSubmitevent, formdata, setformdata }) {
    const array = useSelector(state => state?.cartFunction?.cartItems)
    const state = useSelector(state => state?.addressFunction)
    console.log(state);
    return <div>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 ">
            <div className="w-full p-5">
                <div className="grid grid-cols-3 gap-3">
                    {state?.addressarray?.map((item, index) => {
                        return <Addresscard setindexvalue={setindexvalue} indexvalue={indexvalue} indexes={index} address={item.address} pincode={item.pincode} city={item.city} phone={item.phone} />
                    })}
                </div>
                <div className="w-full mt-10 p-[30px]">
                    <h1>Add Address Info</h1>
                    <Form widthparameter={"full"} Submitevent={OnSubmitevent} FormControlsinputrender={addressFormControls} Buttontext={"add"} formdata={formdata} setformdata={setformdata} />

                </div>
            </div>
            <div className="w-full p-[40px]">
                {array.map(items => <CartItemsContent cartitems={items} />)}
                <Button onClick={handlePaypalCheckout} className="w-full" >Checkout With Paypal</Button>
            </div>


        </div>
    </div>;
}



export default Checkout;
