import { Facebook, Instagram, MessageCircle, X } from "lucide-react";
import React from "react";

function Footer() {
    return <div className="p-[10px] flex">

        <div className="bg-black  w-full h-[400px]   p-[20px]">
            <div className="flex gap-[90px] ml-[10px] mt-[30px] ">

                <div className="text-white flex flex-col gap-2
                 ">
                    <h1 className="text-3xl">Ecommerce</h1>
                    <p className="w-[260px]">

                        logo
                        Gravida massa volutpat aenean odio. Amet, turpis erat nullam fringilla
                        elementum diam in. Nisi, purus vitae, ultrices nunc. Sit ac sit suscipit hendrerit.
                    </p>
                    <h1>Visits Sites</h1>
                    <a className="flex gap-4
                    " href="" > <Instagram></Instagram>
                        <Facebook />
                        <X></X>
                    </a>
                </div>
                <div className="flex w-[200px] hidden md:flex lg:flex gap-5 flex-col text-white ">
                    <h1> Contacts </h1>
                    <p>  Baghy custom Site Designs</p>
                    <p> 600, Boltacusta avenue apt.</p>
                    <p> Mesa,California</p>
                    <p> info@customdesign.com </p>
                    <p> (+91) 12-3456-7890</p>

                </div>
                <div className=" w-[200px] hidden md:flex lg:flex  flex-col gap-5 text-white">
                    <h1> MY Contacts </h1>
                    <p>  About Us</p>
                    <p>Delivery  Information</p>
                    <p> Privacy Policy</p>
                    <p> Terms & Conditions </p>
                    <p> Returns</p>


                </div>
                <div className="flex flex-col hidden md:flex lg:flex text-white gap-5">
                    <h1>Information</h1>
                    <p>  About Us</p>
                    <p>Delivery  Information</p>
                    <p> Privacy Policy</p>
                    <p> Terms & Conditions </p>
                    <p> Returns</p>

                </div>
                <div className="flex flex-col hidden md:flex lg:flex text-white gap-5">
                    <h1>Extras</h1>
                    <p>  About Us</p>
                    <p>Delivery  Information</p>
                    <p> Privacy Policy</p>
                    <p> Terms & Conditions </p>
                    <p> Returns</p>

                </div>





            </div>


        </div>
    </div>;
}

export default Footer;
