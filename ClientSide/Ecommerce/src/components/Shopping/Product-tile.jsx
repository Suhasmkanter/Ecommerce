import React, { useEffect } from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, FetchCart } from "@/ReduxToolkit/CartItems";
import { Badge } from "../ui/badge";
function ShoppingViewProductsTile({ product, HandleClick }) {
    const dispatch = useDispatch()
    const user = useSelector(state => state.Auth.user)
    const HandleDispatch = () => {
        dispatch(addToCart({
            Userid: user.UserId,
            ProductId: product._id,
            quantity: quantity
        })).then((result) => {
            dispatch(FetchCart(user?.UserId)).then((result) => {
                console.log(result.payload)
            }).catch((err) => {

            });
        }).catch((err) => {

        });

    }
    const quantity = 1
    return <div>
        <Card className='relative max-w-xs max-h-[600px] p-3 shadow-2xl rounded-lg' >

            <img onClick={() => HandleClick(product._id)} src={product.ImagesUrl} alt="" className="object-cover rounded-lg object-[0px_1px] relative  w-full h-[300px]" />
            <CardContent className={'p-5'}>
                <Badge className={'absolute bg-white top-[20px] left-[20px]'}>
                    {
                        product.Stocks <= 5 ? " 5 Stocks" : null
                    }

                </Badge>
                <h1 className="text-center truncate w-full h-10">{product.Productname}</h1>
                <div className="w-full flex justify-between ">
                    <span>{product.Brand}</span>
                    <span> {product.Category}</span>
                </div>
                <div className="w-full flex justify-between">
                    {<span>{product.Saleprice}</span>}
                    {product.Discountprice > 0 ? <span className="line-through">{product.Discountprice}</span> : null}
                </div>
            </CardContent>
            <CardFooter>
                <Button disabled={product.Stocks <= 0 ? true : false} onClick={HandleDispatch} className='w-full'>Add to Cart</Button>
            </CardFooter>
        </Card>
    </div>;
}
export default ShoppingViewProductsTile;
