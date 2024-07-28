import {DeliveryUnit} from "@stripe/stripe-js";

export type User = {
    _id: string;
    _type: string;
    _createdAt: string;
    _rev: string;
    email: string;
    name: string;
    address: {
        street: string;
        city: string;
        zip: string;
        country: string;
        _type?: string
    },
    [key: string]: unknown;
};

export type Product = {
    _id: string;
    _updatedAt: string;
    _createdAt: string;
    type: string;
    title: string;
    description: string;
    body: [];
    price: number;
    stock: number;
    category: Category;
    images: Image[];
    featured_image: Image;
    tags: string[];
    slug: Slug;
    variants: Variant[]
};

export type Category = {
    title: string;
    description: string;
};

export type Order = {};

export type Image = {
    asset: {
        _id: string;
        url: string;
    }
}

export type Variant = {
    _id: string;
    _key: string;
    image: Image;
    price: number;
    sku: string;
    stock: number;
    name: string;
}

export type Slug = {
    _type: string;
    current: string;
}

export type ProductPage = {
    _id: string;
    title: string;
    slug: Slug;
    description: string;
    products: Product[];
}

export type CartItem = {
    product: Product;
    variant: Variant | null;
    price: number;
    quantity: number
}

export type ShippingOption = {
    type: "fixed_amount",
    display_name: string,
    amount: number,
    currency: string,
    deliveryEstimateUnit: DeliveryUnit,
    deliveryEstimateMin: number,
    deliveryEstimateMax: number,
}