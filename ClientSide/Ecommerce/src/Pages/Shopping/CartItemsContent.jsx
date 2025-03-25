import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { DeletetoCart, updateToCart } from "@/ReduxToolkit/CartItems";
import { Minus, Plus, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function CartItemsContent({ cartitems }) {
    const user = useSelector(state => state.Auth?.user)
    const [quantity, setquantity] = useState(cartitems?.quantity)
    const dispatch = useDispatch()
    function handleDelete() {
        dispatch(DeletetoCart({ Userid: localStorage.getItem("Userid"), ProductId: cartitems.ProductId }))
    }
    useEffect(() => {
        dispatch(updateToCart({ Userid: user?.UserId, ProductId: cartitems.ProductId, quantity: quantity }))
    }, [quantity])
    return (<>
        <div className="w-full h-[80px] flex justify-start items-center mb-3">
            <div className=" w-[140px] flex justify-center h-full rounded-md">
                <img className='w-[85px] h-full rounded-md object-contain' src={cartitems.image} alt="" />
            </div>
            <div className=" w-full h-full flex flex-col justify-start items-start">
                <h3 className="text-center text-1xl">{cartitems?.title}</h3>
                <div className="flex gap- justify-between w-full ">
                    <div className="flex border-black justify-center items-center gap-3 ">
                        <button onClick={() => setquantity(prev => prev + 1)}  >
                            <Plus ></Plus>
                        </button>
                        <h2 className="text-2xl  ">{quantity}</h2>
                        <button onClick={() => setquantity(prev => prev + -1)} >
                            <Minus className=" "></Minus>
                        </button>
                    </div>

                    <div className="flex flex-col gap-1 justify-center items-center">
                        <Label  >
                            {`$${quantity * cartitems.price}`}
                        </Label>

                        <button>
                            <Trash onClick={handleDelete}></Trash>

                        </button>
                    </div>
                </div>
            </div>
        </div></>);
}

export default CartItemsContent;
