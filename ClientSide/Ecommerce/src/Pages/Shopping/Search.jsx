import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Fetchitems } from "@/ReduxToolkit/SearchItems";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import ProductDetails from "./ProductDetails";
import CartItemsContent from "./CartItemsContent";
import ShoppingViewProductsTile from "@/components/Shopping/Product-tile";
import { fetchSingleProduct } from "@/ReduxToolkit/Shoppingproduct";

function Search() {
    const [searchquery, setsearchquery] = useState()
    const [searchparams, setsearchparams] = useSearchParams()
    const [productsdetails, setproductdetailspage] = useState([])
    const dispatch = useDispatch()
    const [listofitems, setlistofitems] = useState([])
    const [dialogbox, setdialogbox] = useState(false)
    console.log(searchquery)
    useEffect(() => {
        if (searchquery) {
            setsearchparams(new URLSearchParams(`?keyword=${searchquery}`))
            dispatch(Fetchitems(searchquery)).then((result) => {
                if (result.payload.success) {
                    console.log(result.payload)
                    setlistofitems(result.payload.items)

                }
            }).catch((err) => {

            });
        }

    }, [searchquery])
    function handleClick(id) {
        dispatch(fetchSingleProduct(id)).then((result) => {
            if (result.payload.productData) {
                console.log(result.payload)
                setproductdetailspage(result.payload.productData)
                setdialogbox(!dialogbox)
            }
        }).catch((err) => {
        });
    }

    return <div>
        <div className="w-full h-[100px] flex justify-center gap-5 p-10">
            <Input className="w-[70%]" placeholder="Enter Something" type="text" onChange={(e) => setsearchquery(e.target.value)} />

        </div>

        <div className="w-full h-[100vh] p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
            {
                listofitems.map((items) => {
                    return <ShoppingViewProductsTile HandleClick={handleClick} product={items} />
                })
            }

        </div>
        <ProductDetails HandleClick={handleClick} productDetails={productsdetails} open={dialogbox} setOpen={setdialogbox} ></ProductDetails>

    </div>;
}

export default Search;
