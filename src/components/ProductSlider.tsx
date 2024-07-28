"use client"
import React from 'react';
import {Product} from "@/types";
import {Swiper, SwiperSlide} from "swiper/react";
import ProductCard from "@/components/ProductCard";

const ProductSlider = ({products}: {
    products: Product[];
}) => {
    return (
        <Swiper
            slidesPerView={3}
            onSlideChange={(currentSlide) => {
                console.log(currentSlide);
            }}
            onSwiper={swiper => console.log(swiper)}
        >

            {products.map(product =>
                <SwiperSlide key={product._id}>
                    <ProductCard showCategory={false} product={product}/>
                </SwiperSlide>
            )}

        </Swiper>
    );
};

export default ProductSlider;