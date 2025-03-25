import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import React, { useEffect, useState } from "react";
import OrderDailog from "./OrderDailog";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersAdmin } from "@/ReduxToolkit/OrderSlice/AdminOrder";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

function Adminorders() {

    const dispatch = useDispatch()
    const [dialogbox, setdialogbox] = useState(false)
    const Orders = useSelector(state => state?.adminOrder?.orders)
    console.log(Orders)
    useEffect(() => {
        dispatch(getAllOrdersAdmin())
    }, [])
    function handledialog() {
        setdialogbox(!dialogbox)
    }
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
                            Orders?.map((item, index) => {
                                return <TableRow>
                                    <TableHead>{item?._id} sdfsa  </TableHead>
                                    <TableHead> {item.orderDate.split('T')[0]} </TableHead>
                                    <TableHead>{item.orderStatus} </TableHead>
                                    <TableHead>{item.totalAmount} </TableHead>

                                    <Dialog open={dialogbox} onOpenChange={setdialogbox}>
                                        <DialogTrigger asChild>
                                            <Button onClick={() => setdialogbox(true)}>Open Dialog</Button>

                                        </DialogTrigger>
                                        <DialogContent>

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
                                        <OrderDailog id={item._id} />
                                    </Dialog>


                                </TableRow>
                            })
                        }


                    </TableHeader>
                </Table>

            </CardContent>
        </Card >
    </div>;
}

export default Adminorders;
