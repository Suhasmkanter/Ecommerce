import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import React from "react";

function Addresscard({ indexes, indexvalue, setindexvalue, addressid, address, pincode, city, phone, notes, handleDeleteAddress, handleEditAddress }) {
    function handleOnclick(index) {
        setindexvalue({
            [index]: !indexvalue[index]
        })

    }
    return <div onClick={() => handleOnclick(indexes)} className={`  p-[10px] justify-center items-start   h-full flex flex-col  gap-1   ${indexvalue && indexvalue[indexes] == true ? 'border-black border-2 ' : null}`}>
        <div className={`flex flex-col justify-center items-start min-w-[75px]`}>
            <h3  >Address : {address}</h3>
            <h3 > Pincode :{pincode}</h3>
            <h3 >City : {city}</h3>
            <h3  >Phone : {phone}</h3>
            <h3  >Notes : {notes}</h3>

        </div>


        <div className="  w-full   flex justify-between ">
            <Button onClick={handleEditAddress}>Edit</Button>
            <Button onClick={() => handleDeleteAddress(addressid)}> Delete</Button>

        </div>


    </div>;
}

export default Addresscard;
