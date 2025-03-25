import Form from "@/components/common/Form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectTrigger } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getAllOrders } from "@/ReduxToolkit/OrderSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function Shoppingorders() {
    const user = useSelector(state => state?.Auth?.user)
    const [allOrders, setallOrders] = useState([])
    const [openchange, setopenchange] = useState(false)
    const dispatch = useDispatch()
    useEffect(() => {
        if (user?.UserId) {
            dispatch(getAllOrders(user?.UserId)).then((result) => {
                if (result.payload.success) {
                    setallOrders(result.payload.data)
                }
            }).catch((err) => {

            });
        }

    }, [])
    console.log(allOrders, "allOrders Bro")
    return <div>
        <Card>
            <CardHeader>
                <CardTitle>
                    Orders
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>OrderId </TableHead>
                            <TableHead>OrderDate </TableHead>
                            <TableHead>OrderStatus </TableHead>
                            <TableHead>OrderPrice </TableHead>

                        </TableRow>
                        {
                            allOrders.map((item, index) => {
                                return <TableRow>
                                    <TableHead>{item?._id}  </TableHead>
                                    <TableHead> {item.orderDate.split('T')[0]} </TableHead>
                                    <TableHead>{item.orderStatus} </TableHead>
                                    <TableHead>{item.totalAmount} </TableHead>


                                    <Dialog open={openchange} onOpenChange={setopenchange}>

                                        <DialogTrigger asChild>
                                            <Button onClick={() => setopenchange(true)}>Open Dialog</Button>

                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogTitle>

                                            </DialogTitle>
                                            <div className="grid" >
                                                <div className="grid">
                                                    <div className="h-[40px] flex justify-between items-center">
                                                        <Label>OrderID</Label>
                                                        <Label>{item?._id}</Label>
                                                    </div>
                                                    <div className="h-[40px] flex justify-between items-center">
                                                        <p>OrderDate</p>
                                                        <Label>{item?.orderDate.split('T')[0]}</Label>
                                                    </div>
                                                    <div className="h-[40px] flex justify-between items-center">
                                                        <p>OrderPrice</p>
                                                        <Label>{item?.totalAmount}</Label>
                                                    </div>
                                                    <div className="h-[40px] flex justify-between items-center">
                                                        <Label>OrderStatus</Label>
                                                        <Label>{item?.orderStatus}</Label>
                                                    </div>

                                                </div>
                                                <Separator />
                                                <div className="grid mt-2">
                                                    <div className="flex flex-col justify-between">
                                                        <h1 className="font-medium">Order Details</h1>

                                                        {
                                                            item?.cartItems.map((individual) => {
                                                                return <div className="flex mt-1 flex-row justify-between">  <span>Title: {individual.title}</span>
                                                                    <span>Quantity: {individual.quantity}</span>
                                                                    <span>Price :${individual.price}</span>
                                                                </div>
                                                            })
                                                        }



                                                    </div>


                                                    <Separator />

                                                    <div className="grid mt-5">
                                                        <div className="flex flex-col">
                                                            <h1>Shipping Info</h1>
                                                            <h2>John Doe</h2>
                                                            <h2>Address</h2>
                                                            <h2>City</h2>
                                                            <h2>Pincode</h2>
                                                            <h2>Notes</h2>
                                                        </div>
                                                    </div>
                                                </div>


                                            </div>



                                        </DialogContent>
                                    </Dialog>


                                </TableRow>
                            })
                        }

                    </TableHeader>
                </Table>

            </CardContent>
        </Card >
    </div >;
}

export default Shoppingorders;
