import React, { useEffect, useState } from "react";
import Address from "./Address";
import Addresscard from "./Addresscard";
import { useDispatch, useSelector } from "react-redux";
import { deleteAddrerss, fetchAddress } from "@/ReduxToolkit/Address";

function Account() {
    const user = useSelector(state => state.Auth)
    const dispatch = useDispatch()

    return <div>

        <div className="w-full h-[250px] object-cover">
            <img src={'/account.jpg'} alt="" className="w-full h-full" />

        </div>
        <Address />
    </div>;
}

export default Account;
