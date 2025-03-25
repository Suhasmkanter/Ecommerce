import { createContext, useState } from "react";
import React from "react";

// Create a context with null as the default value
export const GlobalContext = createContext(null);

function MainContext({ children }) {
    // Example state variable 'one' with a setter function 'setOne'
    const [id, setid] = useState({});
    const [Checkboxes, setCheckboxes] = useState([])


    return (
        <GlobalContext.Provider value={{ id, setid, Checkboxes, setCheckboxes }}>
            {children}
        </GlobalContext.Provider>
    );
}

export default MainContext;
