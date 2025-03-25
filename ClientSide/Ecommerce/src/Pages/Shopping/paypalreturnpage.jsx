import { captureNewOrder } from "@/ReduxToolkit/OrderSlice";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

function Paypalreturnpage() {
    const location = useLocation()
    const dispatch = useDispatch()
    const searchvalues = new URLSearchParams(location.search)
    const payerId = searchvalues.get('PayerID')
    const paymentId = searchvalues.get('paymentId')
    useEffect(() => {
        if (payerId && paymentId) {
            let orderId = sessionStorage.getItem('currentId')
            console.log(orderId)
            dispatch(captureNewOrder({ payerId, paymentId, orderId })).then((result) => {

            }).catch((err) => {

            });

        }
    })

    return <div>Paypalreturnpage</div>;
}

export default Paypalreturnpage;
