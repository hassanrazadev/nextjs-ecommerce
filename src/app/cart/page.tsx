import React from 'react';
import CartDetail from "@/app/cart/CartDetail";

function Cart() {

    return (
        <main className={"px-32 py-16"}>
            <div className={"px-12"}>
                <h3 className={"text-2xl font-bold tracking-wider"}>Shopping Cart</h3>
                <CartDetail/>
            </div>
        </main>
    );
}

export default Cart;