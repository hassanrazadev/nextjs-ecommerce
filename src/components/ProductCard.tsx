import React from 'react';
import Image from "next/image";
import {Product} from "@/types";
import Link from "next/link";

type ProductCardProps = {
    product: Product;
    showCategory?: boolean
}

function ProductCard({product, showCategory = true}: ProductCardProps) {
    return (
        <div className="w-full hover:scale-110 cursor-pointer transform duration-500 p-6">
            <Link href={"products/" + product.slug.current}>
                <Image src={product.featured_image.asset.url} alt={product.title} className={"w-full"} width={100} height={100}/>
                <p className={"mt-4 font-semibold"}>{product.title}</p>
                <p className={"mt-2 text-gray-400 mb-2 font-semibold " + (showCategory ? "" : "hidden")}>{product.category.title}</p>
                <p className={"font-semibold text-xl"}>${product.price}</p>
            </Link>
        </div>
    );
}

export default ProductCard;