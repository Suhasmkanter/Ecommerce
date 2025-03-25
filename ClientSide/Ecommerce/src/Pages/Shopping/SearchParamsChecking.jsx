import React from "react";
import { useSearchParams } from "react-router-dom";

function SearchParamsChecking() {


    const [searchParams, setSearchParams] = useSearchParams();

    // Get the current category from the query params
    const category = searchParams.get("category") || "None";

    // Function to update query params
    const updateCategory = (newCategory) => {
        setSearchParams({ category: newCategory });
    };

    return (
        <div className="w-full" style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Query Params Example</h1>
            <p>Selected Category: <strong>{category}</strong></p>
            <div className="w-full justify-center flex gap-4">
                <button onClick={() => updateCategory("electronics")}>Electronics</button>
                <button onClick={() => updateCategory("fashion")}>Fashion</button>
                <button onClick={() => updateCategory("home")}>Home</button>
                <button onClick={() => setSearchParams({})}>Reset</button>
            </div>

        </div>
    );
}



export default SearchParamsChecking;
