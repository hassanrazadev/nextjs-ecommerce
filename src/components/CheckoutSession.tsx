"use client"
import React, {useState} from 'react';
import {loadStripe} from '@stripe/stripe-js';
import { useSelector } from 'react-redux';
import {CartState} from "@/redux/features/cart/cartSlice";
import {Button} from "@/components/ui/button";

type PageProp = {}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY as string);

function CheckoutSession(props: PageProp) {

    const cartItems = useSelector((state: { cart: CartState }) => state.cart.items);
    const [processing, setProcessing] = useState(false);

    const handleCheckout = async () => {

        setProcessing(true);
        const stripe = await stripePromise;

        const response = await fetch('/api/checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ cartItems }),
        });

        const session = await response.json();

        if (!session.id) {
            console.error("Something wrong with stripe", session);
        } else {
            // Redirect to Stripe Checkout
            const result = await stripe!.redirectToCheckout({
                sessionId: session.id,
            });

            if (result.error) {
                console.error(result.error.message);
            }
        }
        setProcessing(false);
    };


    return (
        <Button disabled={processing} className={"rounded-none"} onClick={handleCheckout}>
            {processing && <span className={"flex w-full justify-between"}>
                Redirecting <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor"
                                 strokeWidth="2" fill="none" strokeLinecap="round"
                                 strokeLinejoin="round" className="animate-spin">
                <line x1="12" y1="2" x2="12" y2="6"></line>
                <line x1="12" y1="18" x2="12" y2="22"></line>
                <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
                <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
                <line x1="2" y1="12" x2="6" y2="12"></line>
                <line x1="18" y1="12" x2="22" y2="12"></line>
                <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
                <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
            </svg>
            </span>}
            {!processing && "Process to Checkout"}
        </Button>
    );
}

export default CheckoutSession;