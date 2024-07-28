import React from 'react';
import {client} from "@/utils/sanity";
import {notFound} from "next/navigation";
import {Product} from "@/types";
import ProductDetail from "@/app/[products]/[slug]/ProductDetail";

async function ProductPage({params}: {params: {slug: string}}) {

    const productSlug = params.slug;
    const query = `
        *[_type == "product" && slug.current == "${productSlug}"][0] {
              _id,
              title,
              slug,
              type,
              price,
              stock,
              body,
              description,
              images[]{asset->{_id, url}},
              featured_image{asset->{_id, url}},
              category->{title, description},
              variants[]{
                _id,
                _key,
                name,
                price,
                sku,
                stock,
                image{asset->{_id, url}}
              },
              _createdAt
            }
        `;
    const product: Product = await client.fetch(query) ?? {};
    if (!Object.keys(product).length) {
        notFound();
    }

    return (
        <main>
            <ProductDetail product={product}/>
        </main>
    );
}

export default ProductPage;