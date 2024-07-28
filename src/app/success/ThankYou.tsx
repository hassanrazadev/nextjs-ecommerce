"use client"

import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {removeFromCart} from "@/redux/features/cart/cartSlice";
import Stripe from "stripe";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import Confetti from "react-confetti-boom";

type PageProp = {
    lineItems: Stripe.LineItem[],
}

function ThankYou({lineItems} : PageProp) {

    const dispatch = useDispatch();

    useEffect(() => {
        lineItems.map((lineItem: Stripe.LineItem) => {

            const product: Stripe.Product = lineItem.price?.product as Stripe.Product

            dispatch(removeFromCart({
                productId: product.metadata.product_id,
                variantKey: product.metadata.variant_key,
            }));
        })
    },[dispatch, lineItems]);

    return (
        <>
            <Confetti
                mode="boom"
                particleCount={500}
                spreadDeg={60}
            />
            <div className={"rounded-lg p-16 bg-gray-200 flex justify-center items-center flex-col gap-4"}>
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" height="80"
                     width="80"
                     xmlns="http://www.w3.org/2000/svg" className={"text-green-700"}>
                    <path fillRule="evenodd"
                          d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5v-.5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0zm-.646 5.354a.5.5 0 0 0-.708-.708L7.5 10.793 6.354 9.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z">
                    </path>
                </svg>

                <p className={"text-4xl font-bold"}>Thank you for your order!</p>
                <p>Check your email inbox for the receipt</p>

                <p className={"my-2"}>If you have any questions, please email <a className={"text-destructive"}
                                                                                 href={"mailto:dinemarket@example.com"}>dinemarket@example.com</a>
                </p>

                <Link href={"/"}>
                    <Button className={"px-8 py-6 text-xl"}>Continue Shopping</Button>
                </Link>
            </div>
        </>
    );
}

export default ThankYou;