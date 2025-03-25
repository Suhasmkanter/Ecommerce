import Form from "@/components/common/Form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { UpdatetheAdminUser } from "@/ReduxToolkit/OrderSlice/AdminOrder";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
const data = [{
    label: "Order Status",
    name: "Status",
    componentType: 'select',
    options: [
        { id: "Confirmed", label: "Confirmed" },
        { id: "Pending", label: "Pending" },
        { id: "Success", label: "Success" },
        { id: "Accesso  ries", label: "Accessories" },



    ],
    placeholder: "Choose the Order status"
}]

function OrderDailog({ id }) {
    const dispatch = useDispatch()
    const initialstate = {
        Status: ''
    }
    const [formdata, setformdata] = useState(initialstate)

    function handleOnStatus() {
        if (id && formdata.Status) {
            dispatch(UpdatetheAdminUser({ id, status: formdata.Status }))

        }
    }
    console.log(formdata)
    return <DialogContent>
        <div className="grid" >
            <div className="grid">
                <div className="h-[40px] flex justify-between items-center">
                    <Label>Orders</Label>
                    <Label>Values</Label>
                </div>
                <div className="h-[40px] flex justify-between items-center">
                    <Label>OrdersID</Label>
                </div>
                <div className="h-[40px] flex justify-between items-center">
                    <Label>OrdersDate</Label>
                </div>
                <div className="h-[40px] flex justify-between items-center">
                    <Label>OrdersPrice</Label>
                </div>

            </div>
            <Separator />
            <div className="grid mt-4">
                <div className="flex flex-col justify-between">
                    <h1>Order Details</h1>
                    <div className="flex flex-row justify-between">
                        <Label>Product One</Label>
                        <Label>200 DOllarrs</Label>
                    </div>

                </div>

            </div>
            <div className="grid mb-4">
                <div className="flex flex-col">
                    <h1>Shipping Info</h1>
                    <h2>John Doe</h2>
                    <h2>Address</h2>
                    <h2>City</h2>
                    <h2>Pincode</h2>
                    <h2>Notes</h2>
                </div>
            </div>
            <div className="flex gap-5">
                {data?.map((item) => <Form FormControlsinputrender={data} setformdata={setformdata} formdata={formdata}  ></Form>)}


            </div>
            <Button onClick={handleOnStatus}>Edit the Status </Button>
        </div>
    </DialogContent>

}

export default OrderDailog;
