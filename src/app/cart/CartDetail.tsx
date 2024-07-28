"use client"
import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import Image from "next/image";
import {removeFromCart, updateQuantity} from "@/redux/features/cart/cartSlice";
import {useDispatch} from "react-redux";
import CheckoutSession from "@/components/CheckoutSession";

function CartDetail() {

    const cartItems = useSelector((state: RootState) => state.cart.items);
    const dispatch = useDispatch();

    const [isClient, setIsClient] = useState(false);

    // Set client-side rendering flag
    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null; // Prevent rendering on the server
    }

    if (!cartItems.length) {
        return (
            <div className={"text-5xl text-center flex flex-col items-center gap-4"}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                     stroke="currentColor" className="size-6 w-36 h-36">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"/>
                </svg>
                <h2>Your cart is empty</h2>
            </div>
        )
    }

    return (
        <div className={"grid grid-cols-4 tracking-wider"}>
            <div className={"cart-information flex flex-col gap-8 col-span-3 pt-6"}>
                {cartItems.map((item, index) => (
                    <div key={index} className={"grid grid-cols-4"}>
                        <div className={"info"}>
                            <Image src={item.product.featured_image.asset.url}
                                   alt={item.product.title}
                                   width={100} height={100}
                                   className={"w-full rounded-lg"}
                            />
                        </div>
                        <div className={"info col-span-3 flex flex-col gap-3 px-8 tracking-wider"}>
                            <div className={"flex justify-between"}>
                                <div className={"text-2xl font-light"}>{item.product.title}</div>
                                <button
                                    onClick={() => {dispatch(removeFromCart({
                                        variantKey: item.variant ? item.variant._key : '',
                                        productId: item.product._id
                                    }))}}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/>
                                    </svg>
                                </button>
                            </div>

                            {item.variant &&
                                <div className={"text-lg font-semibold text-gray-500"}>{item.variant.name}</div>
                            }
                            <div className={"text-lg font-semibold text-gray-500"}>{item.product.category.title}</div>
                            <div className={"text-lg font-semibold"}>Delivery Estimation</div>
                            <div className={"text-lg font-semibold text-yellow-500"}>5 Working Days</div>

                            <div className={"flex justify-between"}>
                                <span className={"text-xl font-semibold"}>${item.price}</span>
                                <div className={"flex gap-2 items-center"}>
                                    <button className={"rounded-full w-10 h-10 text-center border border-gray-200"}
                                            onClick={() => {
                                                dispatch(updateQuantity({
                                                    action: "-",
                                                    variantKey: item.variant ? item.variant._key : '',
                                                    productId: item.product._id
                                                }))
                                            }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             strokeWidth={1.5} stroke="currentColor" className="size-6 mx-auto">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14"/>
                                        </svg>
                                    </button>
                                    <span className={"quantity text-lg w-6 text-center"}>{item.quantity}</span>
                                    <button className={"rounded-full w-10 h-10 text-center border border-gray-200"}
                                            onClick={() => {
                                                dispatch(updateQuantity({
                                                    action: "+",
                                                    variantKey: item.variant ? item.variant._key : '',
                                                    productId: item.product._id
                                                }))
                                            }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             strokeWidth={1.5} stroke="currentColor" className="size-6 mx-auto">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M12 4.5v15m7.5-7.5h-15"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className={"order-summary flex flex-col gap-6 bg-gray-50 p-6"}>
                <div className={"text-xl font-semibold"}>Order Summary</div>
                <div className={"flex justify-between"}>
                    <span>Quantity</span>
                    <span>{cartItems.reduce((total, item) => total + item.quantity, 0)} Products</span>
                </div>
                <div className={"flex justify-between"}>
                    <span>Sub Total</span>
                    <span>${cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}</span>
                </div>
                <CheckoutSession />
            </div>
        </div>
    );
}

export default CartDetail;