import React, { useEffect, useContext } from 'react';
import { productsContext } from "../../contexts/ProudctsContext";

const TotalSum = () => {
    const {makeOrder, totalSum} = useContext(productsContext)

    useEffect(()=>{
        makeOrder()
    },[])
    return (
        <div>
            <h1>{totalSum}</h1>
        </div>
    );
};

export default TotalSum;