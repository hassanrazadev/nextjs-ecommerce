import React from 'react';
import {client} from "@/utils/sanity";
import {Product, ProductPage} from "@/types";
import ProductCard from "@/components/ProductCard";
import {notFound} from "next/navigation";

export const revalidate = 120;

async function Products({ params }: { params: { products: string } }) {

    const productsSlug = params.products;
    let products: Product[] = [];

    if (productsSlug === "products") {
        const query = `
        *[_type == "product"] {
              _id,
              title,
              slug,
              type,
              price,
              featured_image{asset->{_id, url}},
              category->{title, description},
              _createdAt
            }
        `;
        products = await client.fetch(query);
    }

    async function getProductPage() {
        const query = `*[_type == "productPage" && slug.current == "${productsSlug}"][0]{
                title,
                description,
                slug,
                products[]->{
                  _id,
                  title,
                  slug,
                  type,
                  price,
                  featured_image{asset->{_id, url}},
                  category->{title, description}
                }
              }`;
        return await client.fetch(query)
    }

    let productPage: ProductPage;
    if (!products.length) {
        productPage = await getProductPage() ?? {};
        if (!Object.keys(productPage).length) {
            notFound()
        }

        products = productPage.products ?? [];
    }

    if (!products.length) {
        return <div className={"text-center py-16"}>No Products Found</div>;
    }

    return (
        <main>
            <div className={"products-container px-32"}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-10">
                    {products.map(product => (
                        <div key={product._id}>
                            <ProductCard product={product}/>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}

export default Products;