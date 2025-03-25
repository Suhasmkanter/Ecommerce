import { fetchTestimonials } from "@/ReduxToolkit/Testimonials";
import React, { useEffect, useRef } from "react";

const arrayofimages = [{
    imageUrl: '/account.jpg',
    occupation: 'PHP Developer',
    descripton: "It iLorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum quam a perferendis veritatis? Aspernatur debitis perferendis vel, ducimus, cumque aliquam dignissimos mollitia soluta doloribus modi dolorum nobis magni ipsa quisquam?"
}, '/banner-1.webp']
function Testimonials() {
    useEffect(() => {
        fetchTestimonials()
    }, [])
    function handleOnclick() {
    }
    return <div className="flex w-full flex-col items-center p-[40px]">


        <div onClick={handleOnclick} className="w-[40%]  h-[40vh] flex flex-row   relative  gap-10     ">
            {
                [1].map((item) => {
                    return <div className=" flex flex-col p-5 md:w-full md:h-full min-h-[150px] overflow-hidden w-[5340px] items-center  bg-black rounded-[20px]">
                        <div className="md:w-[100px] md:h-[100px] w-[50px] h-[50px]  bg-black">
                            <img style={{ borderRadius: '50%', width: '100px', height: '100px', objectFit: 'cover' }} src="/smileface.avif" alt="" />
                        </div>
                        <div className="p-4 min-h-[40px] text-white">
                            <p className="text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem voluptatum sunt ex dicta est, quod odit earum laborum facilis
                                voluptatem omnis mollitia laudantium! Explicabo, qui! Fuga, impedit expedita. Commodi, mollitia!</p>
                        </div>

                    </div>
                })
            }

        </div>
    </div >;
}

export default Testimonials;
