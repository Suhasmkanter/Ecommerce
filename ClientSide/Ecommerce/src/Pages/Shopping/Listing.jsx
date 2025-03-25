import { sortOptions } from "@/components/config";
import Filterproducts from "@/components/Shopping/filterproducts";
import ShoppingViewProductsTile from "@/components/Shopping/Product-tile";
import { DropdownMenuRadioGroup, DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuRadioItem } from "@/components/ui/dropdown-menu";
import { GlobalContext } from "@/Context/MainContext";
import { fetchSingleProduct, ShoppingproductsAsyncThunk } from "@/ReduxToolkit/Shoppingproduct";
import { ArrowUpDown, Check, Flag, Flashlight, SortDescIcon } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAsyncError, useLocation, useSearchParams } from "react-router-dom";
import ProductDetails from "./ProductDetails";
import { FetchCart } from "@/ReduxToolkit/CartItems";
import { fetchallReviews } from "@/ReduxToolkit/Reviews";
function Listing() {
    const values = useSelector(state => state?.ShoppingProducts)

    const [dialogbox, setDialogbox] = useState(false)
    const [searchparams, setsearchparams] = useSearchParams()
    const category = searchparams.get('Category')
    const [productsdetails, setproductdetailspage] = useState(null)
    const [handlefilter, sethandlefilter] = useState({})
    const [sort, setsort] = useState('')
    const [reviewData, setReviewData] = useState()
    const user = useSelector(state => state?.Auth?.user)
    console.log(user)

    const dispatch = useDispatch()
    useEffect(() => {
        if (user?.UserId) {
            dispatch(FetchCart(user.UserId)).then((result) => {
                console.log(result.payload)
            })

        }

    }, [])
    useEffect(() => {
        const storedFilters = sessionStorage.getItem('filter'); // Get from storage
        if (storedFilters) {
            try {
                sethandlefilter(JSON.parse(storedFilters)); // Set state with parsed data
            } catch (error) {
                console.error("Error parsing JSON from localStorage:", error);
            }
        }
    }, [category]);



    function makeparams() {
        if (handlefilter && Object.keys(handlefilter).length > 0) {
            let queryparams = []

            const values = Object.keys(handlefilter).map((items, index) => {


                let value = handlefilter[items].join(',')
                queryparams.push(`${items}=${encodeURIComponent(value)}`)

            })
            return queryparams.join('&')
        }
        return ''
    }


    useEffect(() => {
        dispatch(ShoppingproductsAsyncThunk({ queryvalues: searchparams, sort })).then((result) => {
        }).catch((err) => {
        })
    }, [searchparams, sort, dialogbox])

    function HandleFilters(mainoptions, item) {
        const handlevalue = { ...handlefilter }
        if (handlevalue[mainoptions] && handlevalue[mainoptions].length <= 0) {
            delete handlevalue[mainoptions]
        }
        if (!handlevalue[mainoptions]) {
            handlevalue[mainoptions] = []
        }
        if (!handlevalue[mainoptions].includes(item)) {
            handlevalue[mainoptions].push(item)
        } else {
            const indexvalue = handlevalue[mainoptions].indexOf(item)
            const poppedvalues = handlevalue[mainoptions].splice(indexvalue, 1)
        }
        sethandlefilter(handlevalue)
        sessionStorage.setItem('filter', JSON.stringify(handlevalue))
    }
    useEffect(() => {
        let searchparmsvalue = makeparams()
        setsearchparams(searchparmsvalue);

    }, [handlefilter])

    function handleSort(value) {
        setsort(value)
    }
    async function HandleClick(id) {
        try {
            let data = await dispatch(fetchSingleProduct(id)).unwrap()

            if (!data?.productData) {
                console.log("There is no ProductData is their")
                return
            }

            setproductdetailspage(data?.productData)
            setDialogbox((prev) => !prev)
        } catch (error) {
        }
    }
    useEffect(() => {
        if (productsdetails && productsdetails.length > 0) {
            dispatch(fetchallReviews({ productId: productsdetails[0]?._id })).then((data) => {
                if (data?.payload?.success) {
                    setReviewData(data.payload.reviewData)
                }
            })
        }

    }, [productsdetails])
    return (<>
        <div className="flex   w-full h-[100vh]">
            <aside className=" w-[300px] h-[100vh]  ">
                <Filterproducts filters={handlefilter}
                    HandleFilters={HandleFilters}></Filterproducts>
            </aside>
            <div className=" w-full h-[100vh] bg-white">
                <div className="flex gap-2 px-2 py-4">
                    <h1>Products</h1>
                    <h2 className="ml-auto">Products: {values?.products.length}</h2>
                    <div className="px-4">
                        <DropdownMenu>
                            <DropdownMenuTrigger className="flex">
                                <ArrowUpDown></ArrowUpDown> Sort By
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align='end' side="left">
                                <DropdownMenuRadioGroup onValueChange={handleSort}>
                                    {
                                        sortOptions.map((items, index) => {
                                            return <DropdownMenuRadioItem key={index} value={items.id} className='bg-white' id={items.id}>
                                                {items.label}
                                                <DropdownMenuSeparator></DropdownMenuSeparator>
                                            </DropdownMenuRadioItem>
                                        })
                                    }
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
                <div className=" gap-1 grid grid-cols-1 md:grid-cols-[repeat(3,minmax(250px,350px))] lg:grid-cols-[repeat(4,minmax(300px,400px))] ">
                    {
                        values?.products?.map((element, index) => {
                            return <ShoppingViewProductsTile key={index} HandleClick={HandleClick} product={element}></ShoppingViewProductsTile>
                        })
                    }

                </div>
            </div>
        </div>
        <ProductDetails reviewData={reviewData} HandleClick={HandleClick} open={dialogbox} setOpen={setDialogbox} productDetails={productsdetails}></ProductDetails>

    </>)
}
export default Listing;

