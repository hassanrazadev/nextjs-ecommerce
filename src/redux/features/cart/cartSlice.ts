import { PayloadAction, current, createSlice } from '@reduxjs/toolkit';
import {CartItem} from "@/types";

export interface CartState {
    items: CartItem[]
}

const initialState: CartState = {
    items: []
}

const saveCartToLocalStorage = (cart: CartItem[]) => {
    try {
        const serializedCart = JSON.stringify(cart);
        localStorage.setItem('cartItems', serializedCart);
    } catch (e) {
        console.warn('Failed to save cart to local storage', e);
    }
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setItems: (state, action: PayloadAction<CartItem[]>) => {
            state.items = action.payload
        },
        addToCart: (state: CartState, action: PayloadAction<CartItem>) => {
            const cartItem = action.payload;
            const productId = cartItem.product._id;
            const variantKey = cartItem.variant ? cartItem.variant._key : null;

            const existingCartItem = state.items.find((value, index) => (
                value.product._id === productId && value.variant?._key === variantKey
            ));

            if (existingCartItem) {
                existingCartItem.quantity += cartItem.quantity;
            } else {
                state.items.push(action.payload);
            }
            saveCartToLocalStorage(state.items)
        },
        removeFromCart: (state: CartState, action: PayloadAction<{productId: string, variantKey: string}>) => {
            state.items = state.items.filter(item => !(item.product._id === action.payload.productId && item.variant?._key === action.payload.variantKey));
            saveCartToLocalStorage(state.items)
        },
        clearCart: (state: CartState) => {
            state.items = initialState.items;
            localStorage.removeItem('cartItems');
        },
        updateQuantity: (state: CartState, action: PayloadAction<{productId: string, variantKey: string, action: "+" | "-"}>) => {
            const cartItem = state.items.find(value => value.product._id == action.payload.productId && value.variant?._key === action.payload.variantKey);
            if (cartItem) {

                const maxQuantity: number = cartItem.variant ? cartItem.variant.stock : cartItem.product.stock;
                const minQuantity: number = 1;

                cartItem.quantity = action.payload.action === "+" ?
                    (cartItem.quantity < maxQuantity ? cartItem.quantity += 1 : cartItem.quantity) :
                    (cartItem.quantity > minQuantity ? cartItem.quantity -= 1 : cartItem.quantity);
            }
            saveCartToLocalStorage(state.items)
        }
    }
});

export const {addToCart, removeFromCart, clearCart, updateQuantity,setItems} = cartSlice.actions;
export default cartSlice.reducer;