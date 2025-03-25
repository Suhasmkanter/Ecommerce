import { Button } from "@/components/ui/button";
import { FetchAllProducts } from "@/ReduxToolkit/ProductCrud/Index";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SortAsc, SortDesc } from 'lucide-react'
import MainContext, { GlobalContext } from "@/Context/MainContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function Products() {
  const mainvalue = {
    discount: false,
    price: false,
    stocks: false,
    setdirection: true
  }
  const [products, setproducts] = useState([])
  const [open, setopen] = useState(false)
  const [values, setvalues] = useState(mainvalue)


  const { id, setid } = useContext(GlobalContext)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(FetchAllProducts(1)).then((result) => {
      if (result) {
        console.log(result)
        setproducts(result.payload?.products)
      }
    }).catch((err) => {
    });
  }, [])
  function MyHandlingLogicforEdit(ele) {
    localStorage.setItem('Product', JSON.stringify(ele))
    setid(ele)
    navigate('/Admin/Editproduct')
  }
  useEffect(() => {
    function filtersoption(array, values) {
      return array?.sort((a, b) => {
        let direction = values.setdirection ? 1 : -1;
        if (values.discount !== false) {
          if (a.Discountprice - b.Discountprice < 0) {
            return -1 * direction
          } else {
            return 1 * direction
          }
        }
        if (values.stocks !== false) {
          if (a.Stocks - b.Stocks < 0) {
            return -1 * direction
          } else {
            return 1 * direction
          }
        }
        if (values.price !== false) {
          if (a.Saleprice - b.Saleprice < 0) {
            return -1 * direction
          } else {
            return 1 * direction
          }
        }
        return 1
      })

    }

    let sortedlists = filtersoption(products, values)
    setproducts(sortedlists)
  }, [open])
  console.log(products)
  return (<>
    <div className="w-full h-[100vh] ">

      <div>
        <div className="w-full h-fit flex justify-end px-2 py-2">
          <SortAsc className="w-[60px]" onClick={() => {
            dispatch(FetchAllProducts(1)).then((result) => {
              if (result?.payload?.success) {
                setproducts(result.payload.products)
              }
            }).catch((err) => {

            });
          }} />


          <SortDesc className="w-[60px]" onClick={() => {
            console.log("The descending sort order")
            dispatch(FetchAllProducts(-1)).then((result) => {
              console.log(result, "result for the descending you fool")
              if (result?.payload?.success) {
                setproducts(result.payload.products)
              }
            }).catch((err) => {

            });
          }} />
          <div onBlur={(e) => {
            e.stopPropagation()
            setopen(false)
          }} style={{ display: open ? "flex" : "none" }} className="absolute items-start   flex-col top-[100px] bg-white w-[150px] h-[150px]">
            <form >
              <div className="flex justify-between items-center w-full gap-3">
                <Label htmlFor="stocks">Stocks</Label>
                <Input type="checkbox" name='stocks' id='stocks' className='w-[20px]' onClick={(e) => {
                  e.stopPropagation()
                  let { checked } = e.target
                  setvalues({
                    ...values,
                    [e.target.name]: checked
                  })
                }} />
              </div>
              <div className=" w-full flex justify-between items-center gap-3">
                <Label htmlFor="price">Price</Label>
                <Input type="checkbox" id='price' name="price" className='w-[20px]' onClick={(e) => {
                  e.stopPropagation()
                  let { checked } = e.target
                  setvalues({
                    ...values,
                    [e.target.name]: checked
                  })
                }} />
              </div>
              <div className="flex justify-between items-center w-full gap-3">
                <Label htmlFor="discount">DiscountPrice</Label>
                <Input type="checkbox" name="discount" id="discount" className='w-[20px]' onClick={(e) => {
                  e.stopPropagation()

                  let { checked } = e.target
                    (checked)
                  setvalues({
                    ...values,
                    [e.target.name]: checked
                  })
                }} />
              </div>
            </form>

          </div>


          <Button onClick={() => { navigate('/Admin/AddProduct') }}>New Product</Button>
        </div>
        <div className="max-w-full h-[100vh] px-4">
          <table className="table-fixed w-full border border-collapse border-black">
            <tbody>
              <tr className="h-16">
                <td className="border border-black w-[200px]"><h1 className="text-center">
                  ProductName
                </h1></td>
                <td className="border border-black w-[90px]"><h1 className="text-center">
                  Brand
                </h1></td>
                <td className="border border-black w-[90px]"><h1 className="text-center">
                  Category
                </h1></td>
                <td className="border border-black w-[90px]"><h1 className="text-center">
                  Price
                </h1></td>
                <td className="border border-black w-[90px]"><h1 className="text-center">
                  DiscountPrice
                </h1></td>
                <td className="border border-black w-[90px]"><h1 className="text-center">
                  Stocks
                </h1></td>
                <td className="border border-black w-[90px] text-center">
                  Edit
                </td>
              </tr>
              {
                products?.map((Element, index) => {
                  return <tr key={index}>
                    <td className=" flex gap-2  justify-start items-center h-[80px]  text-center border  border-black max-w-[10px">
                      <div className="flex items-center justify-center gap-10">
                        <img className="ml-10 w-[50px] h-[50px] rounded-lg max-w-[10px] sm:max-w-[50px]  md:max-w-[100px]  object-cover " src={Element.ImagesUrl} alt="" />
                        <h1 className="text-ellipsis overflow-hidden whitespace-wrap max-w-full h-full">
                          {Element.Productname}
                        </h1>

                      </div>
                    </td>
                    <td className="text-center border border-black w-[10px] h-full">{Element.Brand}</td>
                    <td className="text-center border border-black w-[70px]">{Element.Category}</td>
                    <td className="text-center border border-black w-[70px]">{Element.Saleprice}</td>
                    <td className="text-center border border-black w-[70px]">{Element.Discountprice}</td>
                    <td className="text-center border border-black w-[70px]">{Element.Stocks}</td>
                    <td className="text-center border border-black w-[70px]" > <Button onClick={() => {
                      MyHandlingLogicforEdit(Element)
                    }}>Edit</Button> </td>
                  </tr>
                })
              }


            </tbody>
          </table>




        </div>

      </div>




    </div>
  </>)
}

export default Products;
