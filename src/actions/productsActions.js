import { ALL_PRODUCTS,DELETE_PRODUCT,ADD_PRODUCT,SHOW_PRODUCT,EDIT_PRODUCT } from './types';

import axios from 'axios';

export const allProducts = () => async dispatch => {
    const response = await axios.get(`http://localhost:5000/products`);
    dispatch ({
        type: ALL_PRODUCTS,
        payload: response.data
    })
}

export const showProduct = id => async dispatch => {
    const response = await axios.get(`http://localhost:5000/products/${id}`);
    dispatch ({
        type: SHOW_PRODUCT,
        payload: response.data
    })
}


export const editProduct = product => async dispatch => {
    const response = await axios.put(`http://localhost:5000/products/${product.id}`, product);
    dispatch ({
        type: EDIT_PRODUCT,
        payload: response.data
    })
}

export const deleteProduct = id => async dispatch => {
    await axios.delete(`http://localhost:5000/products/${id}`);
    dispatch ({
        type: DELETE_PRODUCT,
        payload: id
    })
}

export const addProduct = post => async dispatch => {
    const response = await axios.post(`http://localhost:5000/products`, post);
    dispatch ({
        type: ADD_PRODUCT,
        payload: response.data
    })
}