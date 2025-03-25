import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast, useToast } from "@/hooks/use-toast";
import { addToCart, FetchCart } from "@/ReduxToolkit/CartItems";
import { Addreviews, fetchallReviews } from "@/ReduxToolkit/Reviews";
import { Star, StarIcon } from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function ProductDetails({ open, setOpen, productDetails, reviewData }) {
    const { toast } = useToast()
    const dispatch = useDispatch()
    const user = useSelector(state => state?.Auth?.user)
    const [newarray, setarray] = useState([])

    console.log(reviewData)

    const initialState = {
        comment: '',
        userId: user ? user.UserId : 0,
        ProductId: null,
        reviewScore: ''
    }
    const [formdata, setformdata] = useState(initialState)
    console.log(formdata)

    const HandleDispatch = () => {
        dispatch(addToCart({
            Userid: user?.UserId,
            ProductId: productDetails[0]?._id,
            quantity: 1
        })).then((result) => {
            if (result.payload.success) {
                dispatch(FetchCart(user?.UserId)).then((result) => {
                    console.log(result)
                })
            }
        }).catch((err) => {
        });
    }

    function handleOnClick() {
        if (user?.UserId) {
            dispatch(Addreviews({
                comment: formdata.comment,
                productId: productDetails[0]?._id,
                userId: user?.UserId,
                reviewScore: formdata.reviewScore
            })).then((result) => {

                if (!result.payload.success) {

                    toast({
                        title: "You Cant Review the items"
                        , variant: 'destructive'
                    })
                }

                if (result.payload.success) {
                    dispatch(fetchallReviews({ productId: productDetails[0]?._id })).then((data) => {
                    })
                }
            }).catch((err) => {

            });



        }

    }
    function handleit(index) {
        const array = []
        for (let i = 0; i <= index; i++) {
            array.push(1)

        }
        setformdata({
            ...formdata,
            reviewScore: (index + 1) * 20
        })
        setarray(array)

    }
    return (<>
        <div>
            {
                productDetails?.map((item, index) => {
                    return <Dialog key={index} open={open} onOpenChange={setOpen} >
                        <DialogContent className='max-w-[900px] h-[600px] p-5 grid grid-cols-2 border-black border-2  '>
                            <div className="  w-full h-[500px] p-2 overflow-hidden flex ">
                                <img src={item.ImagesUrl} className="w-full h-full object-cover" alt="" />
                            </div>
                            <div className="max-h-[550px] overflow-hidden" >
                                <h2 className="text-2xl">{item?.Productname}</h2>
                                <p className="text-1xl">{item?.ProductDescription}</p>
                                <div className="flex max-w-full justify-between py-2">
                                    <h4>{item?.Saleprice}</h4>
                                    <h4>{item?.Discountprice}</h4>
                                </div>
                                <Button onClick={HandleDispatch} className='w-full mb-2'>Add to Cart</Button>

                                <div>
                                    <div>

                                    </div>

                                </div>
                                <div className="w-full min-h-[230px] flex flex-col gap-3  overflow-scroll ">
                                    {
                                        reviewData?.map((items) => {
                                            return <div className="w-full p-4 flex gap-3 items-center ">
                                                <div>
                                                    <div className="w-[40px] h-[40px]  ">
                                                        <Avatar className="">
                                                            <AvatarFallback >
                                                                S
                                                            </AvatarFallback> </Avatar>
                                                    </div>
                                                </div>
                                                <div>
                                                    <h1>{items.comment}</h1>
                                                    <div className="flex">
                                                        {[1, 2, 3, 4, 5].map((dontknow, index) => {
                                                            return <Star className={`${items.reviewScore / 20 > index ? 'text-yellow-300 fill-yellow-300' : 'text-black bg-white'}`}></Star>
                                                        })}

                                                    </div>

                                                </div>
                                            </div>
                                        })
                                    }


                                </div>
                                <div className="p-3 flex gap-2 flex-col">
                                    <Input onChange={(e) => setformdata({
                                        ...formdata,
                                        [e.target.name]: e.target.value
                                    })} name='comment' placeholder="Write Something" ></Input>
                                    <div className="flex gap-3">
                                        <div>
                                            <p>Give a Rating</p>
                                        </div>
                                        <div className="flex    ">
                                            {[1, 2, 3, 4, 5].map((item, index) => { return < StarIcon className={`${newarray[index] ? 'text-yellow-400 fill-yellow-400' : null}`} onClick={() => handleit(index)} /> })}

                                        </div>

                                    </div>
                                    <Button onClick={handleOnClick} className="w-full">Add Review</Button>

                                </div>

                            </div>
                        </DialogContent>
                    </Dialog>
                })
            }
        </div >
    </>);
}

export default ProductDetails;
