import React, { useEffect, useState } from "react";
import { ShoppingBagIcon } from 'lucide-react'
import { ImageDownIcon } from 'lucide-react'
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem } from "@/components/ui/select";
import { SelectTrigger, SelectValue } from "@radix-ui/react-select";
import { useDispatch } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { CreateProductAsyncThunk } from "@/ReduxToolkit/ProductCrud/Index";
function NewProductDetails() {
    const { toast } = useToast()
    let SizeArray = ["X", "S", "M", "XL", "XXL"]
    const dispatch = useDispatch()
    const [toggle, settoggle] = useState({
        "X": false,
        "S": false,
        "M": false,
        "XL": false,
        "XXL": false,

    })
    const [imageUpload, setimageUpload] = useState(null)
    const initialState = {
        Productname: '',
        ProductDescription: '',
        ProductOriginalPrice: '',
        ProductDiscountPrice: '',
        ProductImageUrl: '',
        Gender: 'Men',
        ProductSize: [],
        ProductCategory: 'Men',
        ProductBrand: 'Puma',
        ProductStocks: ''
    }
    const [ProductDetails, setProductDetails] = useState(initialState)
    useEffect(() => {
        async function UploadingtheImagetotheServer() {
            const formdata = new FormData()
            formdata.append('file', imageUpload)
            try {
                const response = await fetch('http://localhost:8001/image/Addproducts', {
                    method: 'POST',
                    body: formdata
                })
                const data = await response.json()
                setProductDetails({
                    ...ProductDetails,
                    ProductImageUrl: data.imageUrl
                })
            }
            catch (error) {
            }
        }
        UploadingtheImagetotheServer()
    }, [imageUpload])
    function HandleDragOver(e) {
        e.preventDefault()
    }
    function HandleDrop(e) {
        e.preventDefault()
        const datafile = e.dataTransfer.files[0]
        setimageUpload(datafile)
    }
    return (<>
        <div>
            <div main>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6
                    grid-rows-[50px,repeat(8,minmax(100px,auto))]">
                    <div className="flex justify-end row-start-1 row-end-2 col-start-2 col-end-7 items-center mr-4 ">
                        <Button onClick={() => {
                            dispatch(CreateProductAsyncThunk(ProductDetails)).then((result) => {
                                result.payload?.success ? toast({
                                    title: "The Product is Successfully Created"
                                }) : toast({
                                    title: "Sorry the Product is Already exists",
                                    variant: 'Destructive'
                                })
                            }).catch((err) => {
                            });
                        }} className='bg-green-600 text-[15px]'>Create Product</Button>
                    </div>

                    <div className="col-start-1 col-end-5 row-start-2 row-span-6 p-4     ">
                        <ShoppingBagIcon className="inline scale-[1.4]" />
                        <h1 className="inline relative ml-2 top-2 text-[2em]">Add New Product</h1>
                        <form className="w-full h-full flex flex-col gap-2 px-2">
                            {/* Product Name  */}
                            <div className="w-full">
                                <label htmlFor="productname" className="text-[1.5em]">Product Name</label>
                                <input onChange={(e) => {
                                    setProductDetails({
                                        ...ProductDetails,
                                        [e.target.name]: e.target.value
                                    })
                                }} value={ProductDetails.Productname} id="productname" name="Productname" type=" text" className="bg-slate-300 rounded-[5px] placeholder:px-2 custom-color w-[100%] h-[40px] pl-1 placeholder:text-[rgba(0, 0, 0, 1.0)]" placeholder="Enter the Product Name" />
                            </div>
                            {/* ProductDescription */}
                            <div className="flex flex-col">
                                <label className="text-[1.5em]" htmlFor='textarea'>Product Description</label>
                                <textarea onChange={(e) => {
                                    setProductDetails({
                                        ...ProductDetails,
                                        [e.target.name]: e.target.value
                                    })
                                }} className="bg-slate-300 placeholder:p-2  custom-color resize-none pl-1 " name="ProductDescription" id="textarea" cols="80" rows="8" placeholder="Description of the product  " ></textarea>
                            </div>
                            {/* product Price and Discountprice */}
                            {/* Pick Availabel size */}
                            <h1 className="text-[1.6em]">Size and Gender</h1>
                            <div className="flex justify-between px-4">
                                <div>
                                    <h1 className="text-[1.5em]">Size</h1>
                                    <h5>Pick Availabel Size</h5>
                                    <div className="flex gap-2 ">
                                        {
                                            SizeArray.map((Element, index) => {
                                                return <Button onClick={(e) => {
                                                    e.preventDefault()
                                                    settoggle({
                                                        ...toggle,
                                                        [e.target.value]: !toggle[Element]
                                                    })
                                                    setProductDetails(prevstate => {
                                                        return {
                                                            ...prevstate,
                                                            ProductSize: [...prevstate.ProductSize, Element]
                                                        }
                                                    })
                                                }
                                                } value={Element} name='ProductSize' key={index} className={`${toggle[Element] ? 'bg-green-600' : 'bg-white'} text-black`}>{Element}</Button>
                                            })
                                        }
                                    </div>
                                </div>
                                <div className="flex flex-col w-fit relative left-[-50px] h-[70px] gap-2">
                                    <h1 className="text-[1.5em]">Gender</h1>
                                    <p >Pick Availabel Gender</p>
                                    <RadioGroup defaultValue="Men" onValueChange={(value) => {
                                        setProductDetails({
                                            ...ProductDetails,
                                            Gender: value

                                        })
                                    }} className='flex'>
                                        <div className="flex gap-1">
                                            <Label htmlFor="Men">Men</Label>
                                            <RadioGroupItem value='Men' id='Men'></RadioGroupItem>
                                        </div>
                                        <div className="flex gap-1">
                                            <Label htmlFor="Women">Female</Label>
                                            <RadioGroupItem value='Female' id='Women'></RadioGroupItem>
                                        </div>
                                        <div className="flex gap-1">
                                            <Label htmlFor="Others">Others</Label>
                                            <RadioGroupItem value='Others' id='Others'></RadioGroupItem>
                                        </div>
                                    </RadioGroup>
                                </div>
                            </div>
                            <h1 className="text-[1.5em]">Pricing and Stocks</h1>
                            <div className="flex gap-1 justify-between px-3 flex-wrap">
                                <div className="flex flex-col">
                                    <label htmlFor="price" className="text-[1.2em]">Price</label>
                                    <input onChange={(e) => {
                                        setProductDetails({
                                            ...ProductDetails,
                                            [e.target.name]: e.target.value

                                        })
                                    }} className="bg-slate-300 custom-color w-[250px] h-[40px] rounded-xl pl-2" type="text" name="ProductOriginalPrice" placeholder="Enter the Price" id="price" />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="discountprice" className="text-[1.2em]">Discount Price</label>
                                    <input
                                        onChange={(e) => {
                                            setProductDetails({
                                                ...ProductDetails,
                                                [e.target.name]: e.target.value

                                            })
                                        }} className="bg-slate-300 custom-color  w-[250px] h-[40px] rounded-xl pl-2" type="text" name="ProductDiscountPrice" placeholder="Enter the DiscountPrice" id="discountprice" />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="Stocks" className="text-[1.2em]">Stocks</label>
                                    <input onChange={(e) => {
                                        setProductDetails({
                                            ...ProductDetails,
                                            [e.target.name]: (e.target.value)
                                        })
                                    }} className="bg-slate-300 custom-color w-[250px] h-[40px] rounded-xl pl-2" type="text" name="ProductStocks" placeholder="Enter the Stocks" id="Stocks" />
                                </div>
                            </div>
                        </form>
                    </div>
                    {/* Upload Image part */}
                    <div className="col-start-5 col-end-7 row-start-2 row-span-6 border-slate-300 flex flex-col justify-start    items-center  ">
                        <h1 className="text-[25px]">Upload Image</h1>
                        <div className="px-4 py-4 mt-2  w-[350px] h-[350px] max-w-[400px] flex flex-col justify-center items-center      ">
                            {
                                imageUpload ? <img src={`${ProductDetails.ProductImageUrl}`} className='w-full h-full  object-contain ' alt='' /> : <label onDragOver={HandleDragOver} onDrop={HandleDrop} className="bg-slate-300 w-[90%] h-full flex justify-center items-center " htmlFor="Uploadimage">
                                    <ImageDownIcon />
                                </label>
                            }
                            <Button className='mt-2' onClick={() => {
                                setimageUpload(null)
                            }}>Remove Photo</Button>
                            <input onChange={(e) => {
                                const files = e.target.files[0]
                                setimageUpload(files)
                            }} type="file" accept="image/*" className="hidden" id="Uploadimage" entc />
                        </div >
                        <div className=" flex gap-2 justify-center
          w-full h-[90px] ">
                            {/* <div className="w-[80px] h-full bg-red-700">
                                <img src="" alt="" />
                            </div>
                            <div className="w-[80px] h-full bg-red-700"></div>
                            <div className="w-[80px] h-full bg-red-700"></div> */}
                        </div>
                        <h1 className="text-[1.2em]">Category</h1>
                        <Select defaultValue="Men" onValueChange={(value) => {
                            setProductDetails({
                                ...ProductDetails,
                                ProductCategory: value
                            })
                        }}>
                            <SelectTrigger className="bg-black w-[250px] text-white p-2 rounded-md">
                                <SelectValue placeholder="Choose the " />
                            </SelectTrigger>
                            <SelectContent className="bg-red-800 text-white border border-gray-600">
                                <SelectItem className="hover:bg-green-900 p-2" value="Men">Men</SelectItem>
                                <SelectItem className="hover:bg-gray-700 p-2" value="Women">Women</SelectItem>
                                <SelectItem className="hover:bg-gray-700 p-2" value="Kids">Kids</SelectItem>
                                <SelectItem className="hover:bg-gray-700 p-2" value="Others">Others</SelectItem>
                            </SelectContent>
                        </Select>
                        <h1 className="text-[1.2em]">Brand</h1>
                        <Select defaultValue="Puma" onValueChange={(value) => {
                            setProductDetails({
                                ...ProductDetails,
                                ProductBrand: value
                            })
                        }}>
                            <SelectTrigger className="bg-black w-[250px] text-white p-2 rounded-md">
                                <SelectValue placeholder="Choose the Category" />
                            </SelectTrigger>
                            <SelectContent className="bg-red-800 text-white border border-gray-600">
                                <SelectItem className="hover:bg-green-900 p-2" value="Puma">Puma</SelectItem>
                                <SelectItem className="hover:bg-gray-700 p-2" value="Adidas">Adidas</SelectItem>
                                <SelectItem className="hover:bg-gray-700 p-2" value="Jockey">Jockey</SelectItem>
                                <SelectItem className="hover:bg-gray-700 p-2" value="Zara">Zara</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>
        </div>
        <style>
            {`.custom-color::placeholder{
    color:rgba(0, 0, 0, 0.671)
}`}
        </style>
    </>);
}
export default NewProductDetails;

