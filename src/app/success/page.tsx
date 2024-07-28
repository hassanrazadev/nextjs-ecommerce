import React from 'react';
import ThankYou from "@/app/success/ThankYou";
import Stripe from "stripe";
import {client} from "@/utils/sanity";
import {User} from "@/types";

type PageProp = {
    searchParams: {
        session_id: string
    }
}

const stripe = new Stripe(process.env.STRIPE_SECRET as string, {
    apiVersion: '2024-06-20',
});

const Success = async ({searchParams}: PageProp) => {

    if (!searchParams.session_id) {
        throw new Error("Server Error: Invalid checkout session.");
    }

    try {
        const checkOutSession = await stripe.checkout.sessions.retrieve(searchParams.session_id,{
            expand: ['line_items.data.price.product', 'line_items'],
        });

        const customer = checkOutSession.customer_details;

        if (customer) {

            console.log('checking user in sanity')
            let user: User = await client.fetch(`*[_type == "user" && email == "${customer.email}"][0]`);
            if (!user && customer.email && customer.name) {
                // create user in sanity
                user = await client.create({
                    _type: 'user',
                    email: customer.email,
                    name: customer.name,
                    address: {
                        city: customer.address?.city || "",
                        country: customer.address?.country || "PK",
                        street: (customer.address?.line1 || "") + (customer.address?.line2 || ""),
                        zip: customer.address?.postal_code || ""
                    }
                });

                console.log(user);
            }
            console.log(user);

            if (user) {
                // create order
            }
        }
        const lineItems: Stripe.LineItem[] = checkOutSession.line_items?.data as unknown as Stripe.LineItem[]

        return (
            <main className={"px-32 py-16"}>
                <ThankYou lineItems={lineItems} />
            </main>
        );
    } catch (e) {
        console.error(e);
        throw new Error("Server Error: Invalid checkout session.")
    }
}


export default Success;