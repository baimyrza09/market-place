import React, { useReducer } from 'react';
import {JSON_API} from '../helpers/constants'
import axios from "axios";

export const adminContext = React.createContext()

const INIT_STATE = {
    products: [],
    productToEdit: null,
}

const reducer = (state = INIT_STATE, action) =>{
    switch (action.type){
        case "GET_PRODUCTS_DATA":
            return {...state, products: action.payload}
        case "EDIT_PRODUCT":
            return {...state, productToEdit: action.payload}
        default: 
            return state;
    }
}

const AdminContext = ({children}) => {
    const [state, dispatch] = useReducer (reducer, INIT_STATE)

    const getProductsData = async () => {
        let {data} = await axios(`${JSON_API}/products`)
        dispatch({
            type: "GET_PRODUCTS_DATA",
            payload:data
        })
    }

    async function addNewProduct(newProduct){
        await axios.post(`${JSON_API}/products`, newProduct)
        getProductsData()
    }

    const editProduct = async (id) =>{
        let {data} = await axios(`${JSON_API}/products/${id}`)
        dispatch({
            type: "EDIT_PRODUCT",
            payload: data
        })
    }

    const deleteProduct = async (id) =>{
        await axios.delete(`${JSON_API}/products/${id}`)
        getProductsData()
    }

    const saveProduct = async (newProudct, history) => {
        axios.patch(`${JSON_API}/products/${newProudct.id}`, newProudct)
        history.push('/admin')
    }

    return (
        <adminContext.Provider
        value={{
            products: state.products,
            productToEdit: state.productToEdit,
            getProductsData,
            addNewProduct,
            deleteProduct,
            editProduct,
            saveProduct
        }}
        >
            {children}
        </adminContext.Provider>
    );
};

export default AdminContext;