import React, { useContext, useRef, useState } from "react";
import { filterOptions } from "../config";
import { CircleCheckBig } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { GlobalContext } from "@/Context/MainContext";
function Filterproducts({ HandleFilters, filters }) {
    return (<>
        <div className="w-full h-full p-4">
            {
                Object.keys(filterOptions).map((MainOptions, index) => {
                    return <div key={`main-${index}`} className="mt-2">
                        <h3 className="text-[20px] ">{MainOptions}</h3>
                        <div className="flex flex-col gap-0 ">
                            {
                                filterOptions[MainOptions].map((Items, index1) => {
                                    return <div key={index1} className="flex gap-1">

                                        <Checkbox
                                            checked={
                                                filters && Object.keys(filters).length > 0 && filters[MainOptions] && filters[MainOptions].includes(Items.id)
                                            }

                                            onCheckedChange={() => { HandleFilters(MainOptions, Items.id) }}
                                        ></Checkbox>
                                        <h4>{Items.label}</h4>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                })
            }
        </div>
    </>);
}
export default Filterproducts;
