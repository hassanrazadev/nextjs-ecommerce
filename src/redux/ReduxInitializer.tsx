"use client"
import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import {setItems} from "@/redux/features/cart/cartSlice"

function ReduxInitializer({children}: {children: React.ReactNode}) {
    const dispatch = useDispatch();

    useEffect(() => {
        if (typeof window !== "undefined") {
            const cartItemsFromLocalStorage = localStorage.getItem('cartItems');
            if (cartItemsFromLocalStorage) {
                dispatch(setItems(JSON.parse(cartItemsFromLocalStorage)))
            }
        }
    }, [dispatch])

    return children;
}

export default ReduxInitializer;