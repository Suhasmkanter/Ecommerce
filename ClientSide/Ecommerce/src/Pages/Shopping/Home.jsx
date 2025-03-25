import ShoppingViewProductsTile from "@/components/Shopping/Product-tile";
import { Button } from "@/components/ui/button";
import { FetchAllProducts } from "@/ReduxToolkit/ProductCrud/Index";
import { ShoppingproductsAsyncThunk } from "@/ReduxToolkit/Shoppingproduct";
import { LucideIndentIncrease, ShirtIcon, Shirt, WashingMachine, ShoppingBasket, Airplay, Images, Heater, CloudLightning, BabyIcon, WatchIcon, UmbrellaIcon, WashingMachineIcon, ShoppingBasketIcon, AirplayIcon, ImagesIcon, HeaterIcon, Star, LucideShirt, IndentIncrease, ChevronRight, ChevronLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useOutletContext, useSearchParams } from "react-router-dom";
import Footer from "./Footer";
import Testimonials from "./Testimonials";
const categories = [

    { id: 'men', label: "Men", icon: ShirtIcon },
    { id: 'women', label: "Women", icon: CloudLightning },
    { id: 'kids', label: "Kids", icon: BabyIcon },
    { id: 'accessories', label: "Accessories", icon: WatchIcon },
    { id: "footwear", label: "Footwear", icon: UmbrellaIcon }
]
function Home() {
    const dispatch = useDispatch()
    const [counter, setcounter] = useState(0)
    const [searchparams, setsearchparams] = useSearchParams()
    const [fade, setfade] = useState(false)
    const navigate = useNavigate()
    const values = useSelector(state => state?.products)

    const slidingitem = ['/banner-1.webp', '/banner-2.webp', '/banner-3.webp']
    const brand = [
        { id: "nike", label: "Nike", icon: ShirtIcon },
        { id: "adidas", label: "Adidas", icon: WashingMachineIcon },
        { id: "puma", label: "Puma", icon: ShoppingBasketIcon },
        { id: "levi", label: "Levi's", icon: AirplayIcon },
        { id: "zara", label: "Zara", icon: Images },
        { id: "h&m", label: "H&M", icon: Heater },
    ]

    useEffect(() => {
        dispatch(FetchAllProducts(1)).then((result) => {
            console.log(result)
        }).catch((err) => {
        })
    }, [])

    // useEffect(() => {
    //     setfade(false)
    //     const timer = setInterval(() => {
    //         setcounter(((counter + 1) % slidingitem.length))
    //         setfade(true)
    //     }, 5000);
    //     return () => clearInterval(timer)

    // })

    function HandleClick(id) {
        dispatch(fetchSingleProduct(id)).then((result) => {
            if (result.payload.productData) {
                setproductdetailspage(result.payload.productData)
                setDialogbox(!dialogbox)
            }
        }).catch((err) => {
            console.log(err)
        });
    }
    function handleClick(value) {

        switch (value) {
            case 1:
                setcounter(((counter + 1) % slidingitem.length))
                break;
            case -1:
                if (counter == 0) {
                    setcounter(slidingitem.length - 1)
                }
                else {
                    setcounter(((counter - 1) % slidingitem.length))

                }
        }
    }

    function handleIconClick(id, section) {
        console.log(id, section, "hello bro these are the values okay here")
        sessionStorage.removeItem("filter")
        console.log("Hello")
        const value = {
            [section]: [id]
        }
        sessionStorage.setItem('filter', JSON.stringify(value))
        setsearchparams(new URLSearchParams(`?${section}=${id}`))
        navigate(`/shop/listing?${section}=${id}`)
    }
    return <div>
        <div className="max-w-full w-full min-h-[10vh]  relative">
            <div className="w-[768px] md:w-full">
                <img src={slidingitem[counter]} alt='Slidingimage' className={`sm:w-full transition-opacity w-[768px] h-[85vh] object-contain overflow-hidden`} />

            </div>
            <div className="absolute  w-full top-[300px] flex justify-between">
                <Button className='top-[300px]' onClick={() => handleClick(- 1)} ><ChevronLeft /></Button>
                <Button className='' onClick={() => handleClick(1)} ><ChevronRight /></Button>

            </div>

            <div className="mt-[50px] flex flex-col">
                <h3 className="text-center text-3xl m-[10px]">Shop by Category</h3>
                <div className="flex gap-6 items-center flex-wrap justify-center  ">
                    {
                        categories.map((item, index) => {
                            return <div onClick={() => handleIconClick(item.id, "Category")} className="w-[200px] border-black border-2 h-[150px] flex justify-center items-center" key={index}>
                                {<item.icon className="scale-[2] transition-all" />}
                            </div>
                        })
                    }

                </div>
            </div>


        </div>
        <div className="m-[30px]">
            <div className="w-full"><h1 className="text-center text-3xl">Trending Products</h1>  </div>
            <div className="gap-1 grid grid-cols-1 md:grid-cols-[repeat(3,minmax(250px,350px))] lg:grid-cols-[repeat(4,minmax(300px,400px))] m-[30px]  p-5">
                {
                    values?.products.map((element, index) => {
                        return <ShoppingViewProductsTile key={index} HandleClick={HandleClick} product={element}></ShoppingViewProductsTile>
                    })
                }


            </div>

        </div>
        <div className="p-5 w-full ">
            <h1 className="text-center text-3xl">Testimonials</h1>
            <Testimonials />

        </div>
        <Footer />




    </div >;
}

export default Home;
