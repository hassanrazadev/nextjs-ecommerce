"use client";
import React, {useState} from 'react';
import {CartItem, Product, Variant} from "@/types";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {ShoppingCartIcon} from "lucide-react";
import {PortableText} from '@portabletext/react'
import {BlockComponents} from "@/components/SanityBlock";
import {useDispatch} from "react-redux";
import {addToCart} from "@/redux/features/cart/cartSlice";
import {useToast} from "@/components/ui/use-toast";

function ProductDetail({product}: {product: Product}) {

    const { toast } = useToast()

    const [cartData, setCartData] = useState<CartItem>({
        product: product,
        variant: product.variants.length ? product.variants[0] : null,
        price: product.variants.length ? product.variants[0].price : product.price,
        quantity: 1
    });
    const [mainImage, setMainImage] = useState<string>(product.images[0].asset.url);

    const dispatch = useDispatch();

    /**
     * Update selected variant in cart
     * @param variant
     */
    const setVariant = (variant: Variant) => {
        setCartData(prevState => ({
            ...prevState,
            variant: variant,
            price: variant.price
        }))
    }

    /**
     * Update quantity in cart
     * @param action
     */
    const updateQuantity = (action : "+" | "-") => {
        const quantity = cartData.quantity;
        let stock = cartData.variant ? cartData.variant.stock : product.stock;
        let newQuantity = quantity;

        if (action === "+" && quantity < stock) {
            newQuantity = quantity + 1;
        }

        if (action === "-" && quantity > 0) {
            newQuantity = quantity - 1;
        }

        setCartData(prevState => ({
            ...prevState,
            quantity: newQuantity
        }))
    }


    const addProductToCart = () => {
        dispatch(addToCart(cartData))
        toast({
            title: "Added to Cart",
            description: `Product ${cartData.product.title + (cartData.variant ? (" - " + cartData.variant.name + " - ") : "")} added to cart`,
            autoFocus: true,
            role: "alert"
        })
    }

    return (
        <div className={"px-32 py-16 product-detail"}>
            <div className={"flex flex-wrap"}>
                <div className={"w-full md:w-1/12 flex flex-row md:flex-col gap-4"}>
                    {product.images.map(image => (
                        <Image src={image.asset.url} alt={product.title}
                               key={image.asset._id} width={100}
                               height={100}
                               className={"hover:cursor-pointer"}
                               onMouseEnter={() => {setMainImage(image.asset.url)}}
                        />
                    ))}
                </div>
                <div className={"w-full md:w-7/12 px-8"}>
                    <Image src={mainImage} alt={product.title} width={100} height={100}
                           className={"w-full"}/>
                </div>
                <div className={"w-full md:w-4/12 pt-16"}>
                    <h2 className={"text-2xl tracking-widest"}>{product.title}</h2>
                    <p className={"text-gray-400 text-xl font-semibold"}>{product.category.title}</p>
                    <div className={"mt-6 tracking-widest"}>
                        <div className={"uppercase font-semibold"}>SELECT SIZE</div>
                        <div className={"variants flex gap-4 mt-4"}>
                            {product.variants.map(variant => (
                                <button
                                    className={"font-semibold text-gray-600 hover:shadow-gray-900 hover:shadow-2xl rounded-full w-10 h-10 text-center hover:border hover:border-gray-200 " +
                                        (cartData.variant && cartData.variant._key == variant._key ? "shadow-gray-900 shadow-2xl border border-gray-200" : "")}
                                    key={variant._key}
                                    onClick={() => {setVariant(variant)}}
                                >{variant.name}</button>
                            ))}
                        </div>
                        <div className={"quantity-container flex gap-4 mt-6 items-center"}>
                            <div className={"font-semibold"}>
                                Quantity:
                            </div>
                            <div className={"flex gap-4 items-center"}>
                                <button className={"rounded-full w-10 h-10 text-center border border-gray-200"}
                                        onClick={() => {updateQuantity("-")}}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth={1.5} stroke="currentColor" className="size-6 mx-auto">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14"/>
                                    </svg>
                                </button>
                                <span className={"quantity text-lg w-6 text-center"}>{cartData.quantity}</span>
                                <button className={"rounded-full w-10 h-10 text-center border border-gray-200"}
                                        onClick={() => {updateQuantity("+")}}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth={1.5} stroke="currentColor" className="size-6 mx-auto">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M12 4.5v15m7.5-7.5h-15"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className={"cart-and-price flex gap-4 mt-8 items-center"}>
                            <Button className={"rounded-none flex gap-2 px-6 tracking-widest"} onClick={addProductToCart}>
                                <ShoppingCartIcon/> <span>Add to Cart</span>
                            </Button>
                            <span className={"price text-2xl font-semibold"}>${cartData.price}</span>
                        </div>
                    </div>
                </div>
            </div>

            <section className={"product information bg-white mt-12 p-16"}>
                <div className={"relative tracking-wider"}>
                    <div className={"text-[7rem] font-bold text-gray-100"}>
                        Overview
                    </div>
                    <div className={"absolute top-[45%] text-2xl font-bold"}>
                        Product Information
                    </div>
                </div>

                <div className={"border-b border-b-gray-700 p-1"}></div>

                <div className={"flex flex-col justify-between gap-4 mt-12 tracking-widest text-gray-700"}>

                    <div className={"product-detail grid grid-cols-3 gap-12"}>
                        <div className={"uppercase font-semibold"}>Product Details</div>
                        <div className={"col-span-2 font-light"}>{product.description}</div>
                    </div>

                    <div className={"product-care grid grid-cols-3 gap-12"}>
                        <div className={"uppercase font-semibold"}>Product Care</div>
                        <div className={"col-span-2 font-light"}>
                            <PortableText value={product.body} components={BlockComponents} />
                        </div>
                    </div>

                </div>

            </section>
        </div>
    );
}

export default ProductDetail;