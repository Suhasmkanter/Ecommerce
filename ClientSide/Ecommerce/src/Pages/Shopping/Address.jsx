import Form from "@/components/common/Form";
import React, { useEffect, useState } from "react";
import { addressFormControls } from '../../components/config/index'
import { useDispatch, useSelector } from "react-redux";
import { addAddress, fetchAddress } from "@/ReduxToolkit/Address";
import { useSearchParams } from "react-router-dom";
import Addresscard from "./Addresscard";
import Shoppingorders from "./Orders";
import CartWrapper from "./CartWrapper";
import { FetchCart } from "@/ReduxToolkit/CartItems";
import CartItemsContent from "./CartItemsContent";
import { Button } from "@/components/ui/button";
import { createNewOrder } from "@/ReduxToolkit/OrderSlice";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table } from "lucide-react";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Checkout from "./Checkout";
function Address() {
    const { toast } = useToast()
    const dispatch = useDispatch()
    const [addresslist, setaddresslist] = useState([])
    const [indexvalue, setindexvalue] = useState({})
    const [disabled, setdisabled] = useState(false)
    const { approvalUrl } = useSelector(state => state.shoppingOrders)
    const [theStartOfPayment, setTheStartOfPayment] = useState(false)
    const [transferaddress, settransferaddress] = useState({})
    const cartitems = useSelector(state => state?.cartFunction)
    const user = useSelector(state => state.Auth)

    console.log(cartitems)
    console.log(indexvalue, 'It dont know it will work or not ')
    useEffect(() => {
        dispatch(fetchAddress(user?.user?.UserId)).then((result) => {
            if (result.payload) {
                setaddresslist(result.payload.data)
            }
        }).catch((err) => {

        });
    }, [])


    const initialvalues = {
        userId: user?.user?.UserId,
        pincode: '',
        city: '',
        phone: '',
        notes: '',
        address: ''
    }
    const [formdata, setformdata] = useState(initialvalues)
    console.log(formdata);
    useEffect(() => {
        dispatch(FetchCart(localStorage.getItem('Userid'))).then((result) => {
            console.log()
        }).catch((err) => {

        });
    }, [])
    function OnSubmitevent() {
        if (user?.user?.UserId) {
            console.log(user.user.UserId);
            dispatch(addAddress({ ...formdata, userId: user.user.UserId })).then((result) => {
                if (result.payload.success) {
                    setformdata(initialvalues)
                }
            }).catch((err) => {
                console.log(err);
            })
        }
    }
    function handleEditAddress() { }

    function handleDeleteAddress(addressid) {
        dispatch(deleteAddrerss({ userId: user?.user?.UserId, addressId: addressid })).then((result) => {
            if (result.payload.success) {
                dispatch(fetchAddress()).then((result) => {
                    console.log(result.payload);
                })
            }
        }).catch((err) => {

        });
    }
    console.log(cartitems, "cartitems bro here")
    function handlePaypalCheckout() {
        if (!transferaddress || Object.keys(transferaddress).length === 0) {
            toast({
                title: "Sorry the Address is not selected",
                variant: 'destructive'
            })
            return
        }
        if (cartitems?.cartItems.length == 0) {
            toast({
                title: "There is no item to checkout okay ",
                variant: 'destructive'
            })
        }
        let orders = {
            userId: user?.user?.UserId,
            cartId: cartitems?.cartId,
            cartItems: cartitems?.cartItems?.map((items) => ({
                productId: items.ProductId,
                title: items.title,
                image: items.image,
                price: items.price,
                salePrice: items.Discountprice,
                quantity: items.quantity
            })),
            addressInfo: transferaddress,
            orderStatus: 'pending',
            paymentMethod: 'paypal',
            paymentStatus: 'pending',
            totalAmount: cartitems?.cartItems?.reduce((acc, item) => {
                acc += item.quantity * item.price
                return acc
            }, 0),
            orderDate: new Date(),
            orderUpdateDate: new Date(),
            paymentId: '',
            payerId: ""
        }

        console.log(orders)
        dispatch(createNewOrder(orders)).then((result) => {
            if (result.payload.success) {
                setTheStartOfPayment(true)
            }
        }).catch((err) => {
            setTheStartOfPayment(false)
        });
    }
    useEffect(() => {
        console.log(indexvalue)
        settransferaddress({ ...addresslist[indexvalue] })
    }, [indexvalue])
    if (approvalUrl) {
        window.location.href = approvalUrl
    }
    console.log(transferaddress);
    return <div>
        <Tabs defaultValue="orders" className="w-full">
            <TabsList className="grid w-[400px] grid-cols-2">
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="checkout">CheckOut</TabsTrigger>
            </TabsList>
            <TabsContent value="orders">
                <Card className='w-full'>
                    <Shoppingorders />

                </Card>
            </TabsContent>
            <TabsContent value="checkout">
                <Card className='w-full'>
                    <Checkout indexvalue={indexvalue} setindexvalue={setindexvalue} handlePaypalCheckout={handlePaypalCheckout} OnSubmitevent={OnSubmitevent} formdata={formdata} setformdata={setformdata} />
                </Card>
            </TabsContent>
        </Tabs>
    </div >;
}

export default Address;
