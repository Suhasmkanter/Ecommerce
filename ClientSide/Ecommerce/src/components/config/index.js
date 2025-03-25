import { BabyIcon, CloudLightning, ShirtIcon, UmbrellaIcon, WatchIcon } from "lucide-react";

export const RegisterFormControls = [{
    name: 'username',
    label: 'Username',
    type: 'text',
    componentType: 'input',
    placeholder: 'Enter your Username',
    id: 'username'
},
{
    name: 'password',
    label: 'Password',
    type: 'password',
    componentType: 'input',
    placeholder: 'Enter your Password',
    id: 'password'
},
{
    name: 'email',
    label: 'Email',
    type: 'email',
    componentType: 'input',
    placeholder: 'Enter your Email',
    id: 'email'
},

];

export const LoginFormControls = [

    {
        name: 'password',
        label: 'Password',
        type: 'password',
        componentType: 'input',
        placeholder: 'Enter your Password',
        id: 'password'
    },
    {
        name: 'email',
        label: 'Email',
        type: 'email',
        componentType: 'input',
        placeholder: 'Enter your Email',
        id: 'email'
    },

];



export const shoppingViewHeaderMenuItems = [{
    id: "home",
    label: "Home",
    path: "/shop",
},
{
    id: "products",
    label: "Products",
    path: "/shop/listing",
},
{
    id: "men",
    label: "Men",
    path: "/shop/listing",
},
{
    id: "women",
    label: "Women",
    path: "/shop/listing",
},
{
    id: "kids",
    label: "Kids",
    path: "/shop/listing",
},
{
    id: "footwear",
    label: "Footwear",
    path: "/shop/listing",
},
{
    id: "accessories",
    label: "Accessories",
    path: "/shop/listing",
},
{
    id: "search",
    label: "Search",
    path: "/shop/search",
},
];


export const filterOptions = {
    Category: [
        { id: "men", label: "Men" },
        { id: "women", label: "Women" },
        { id: "kids", label: "Kids" },
        { id: "accessories", label: "Accessories" },
        { id: "footwear", label: "Footwear" },
        { id: "others", label: "Others" },

    ],
    Brand: [
        { id: "nike", label: "Nike" },
        { id: "adidas", label: "Adidas" },
        { id: "puma", label: "Puma" },
        { id: "levi", label: "Levi's" },
        { id: "zara", label: "Zara" },
        { id: "h&m", label: "H&M" },
        { id: "Jockey", label: "Jockey" },
    ],
};

export const sortOptions = [
    { id: "price-lowtohigh", label: "Price: Low to High" },
    { id: "price-hightolow", label: "Price: High to Low" },
    { id: "title-atoz", label: "Title: A to Z" },
    { id: "title-ztoa", label: "Title: Z to A" },
]



const categories = [

    { id: 'men', label: "Men", icon: ShirtIcon },
    { id: 'women', label: "Women", icon: CloudLightning },
    { id: 'kids', label: "Kids", icon: BabyIcon },
    { id: 'accessories', label: "Accessories", icon: WatchIcon },
    { id: "footwear", label: "Footwear", icon: UmbrellaIcon }
]



export const addressFormControls = [{
    label: "Address",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Enter your address",
},
{
    label: "City",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Enter your city",
},
{
    label: "Pincode",
    name: "pincode",
    componentType: "input",
    type: "text",
    placeholder: "Enter your pincode",
},
{
    label: "Phone",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Enter your phone number",
},
{
    label: "Notes",
    name: "notes",
    componentType: "textarea",
    placeholder: "Enter any additional notes",
},
];