import React, { useEffect, useState } from "react";
import { Button } from "./components/ui/button";
import Layout from "./components/Auth/Layout";
import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import AdminLayout from "./components/Admin/Layout";
import Dashboard from "./Pages/Admin/Dashboard";
import Products from "./Pages/Admin/Products";
import CheckAuth from "./components/common/check-Auth";
import ShoppingLayout from "./components/Shopping/ShoppingLayout";
import Index from "./components/404page";
import { useDispatch, useSelector } from "react-redux";
import { Authmiddleware } from "./ReduxToolkit/Auth-slice/Index";
import NewProductDetails from "./Pages/Admin/NewProductDetails";
import Editproduct from "./Pages/Admin/EditProducts";
import Home from "./Pages/Shopping/Home";
import Listing from "./Pages/Shopping/Listing";
import Account from "./Pages/Shopping/Account";
import Checkout from "./Pages/Shopping/Checkout";
import Adminorders from "./Pages/Admin/Adminorders";
import Paypalreturnpage from "./Pages/Shopping/paypalreturnpage";
import SearchParamsChecking from "./Pages/Shopping/SearchParamsChecking";
import Search from "./Pages/Shopping/Search";

function App() {
    const dispatch = useDispatch()
    const Auth = useSelector(state => state.Auth)
    const isAuthenticated = Auth?.isAuthenticated
    const Loading = Auth?.isLoading


    useEffect(() => {
        dispatch(Authmiddleware())
    }, [])
    return <Routes>
        {/* Login Page */}
        <Route path="/" element={<Layout></Layout>}>
            <Route index element={<Login></Login>}></Route>
            <Route path='Register' element={<Register></Register>}></Route>


        </Route>


        {/* Shopping Page */}
        <Route element={<CheckAuth ></CheckAuth>}>

            <Route path="/shop" element={
                <ShoppingLayout></ShoppingLayout>
            }>
                <Route index element={<Home></Home>}></Route>
                <Route path="listing" element={<Listing></Listing>}></Route>
                <Route path="account" element={<Account />}></Route>
                <Route path='checkout' element={<Checkout></Checkout>}></Route>
                <Route path="paypal_returnpage" element={<Paypalreturnpage />}></Route>
                <Route path="query" element={<SearchParamsChecking />}></Route>

                <Route path="search" element={<Search />}></Route>

            </Route>
        </Route>




        {/* Admin Page */}
        <Route element={<CheckAuth Authenticated={isAuthenticated}></CheckAuth>}>
            <Route path="/Admin" element={<AdminLayout></AdminLayout>}>
                <Route path="Dashboard" element={<Dashboard></Dashboard>}></Route>
                <Route path="Product" element={<Products></Products>}></Route>
                <Route path="AddProduct" element={<NewProductDetails></NewProductDetails>}></Route>
                <Route path='Editproduct' element={<Editproduct></Editproduct>}></Route>
                <Route path="Orders" element={<Adminorders />}></Route>
            </Route>
        </Route>



        <Route path="*" element={<Index></Index>}></Route>


    </Routes>



        ;
}

export default App;
