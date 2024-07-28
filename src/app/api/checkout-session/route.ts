import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import {CartItem, ShippingOption} from "@/types";

import {client} from "@/utils/sanity";

const stripe = new Stripe(process.env.STRIPE_SECRET as string, {
    apiVersion: '2024-06-20',
});

export async function POST(req: NextRequest) {
    const { cartItems } = await req.json();

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = cartItems.map((item: CartItem) => ({
        price_data: {
            currency: 'usd',
            product_data: {
                name: item.product.title,
                description: item.variant ? item.variant.name : '',
                images: item.product.images.map(value => value.asset.url),
                metadata: {
                    product_id: item.product._id,
                    variant_key: item.variant?._key
                }
            },
            unit_amount_decimal: item.price * 100,
        },
        quantity: item.quantity,
        adjustable_quantity: {
            enabled: true,
            minimum: 1,
            maximum: 99
        }
    }));

    const QUERY = `*[_type == "shippingOption"]`;
    const shippingOptions: ShippingOption[] =  await client.fetch(QUERY) ?? [];

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${req.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${req.headers.get('origin')}/cart`,
            shipping_options: shippingOptions.map(option => (
                {
                    shipping_rate_data: {
                        type: option.type,
                        display_name: option.display_name,
                        fixed_amount: {
                            amount: option.amount,
                            currency: option.currency
                        },
                        delivery_estimate: {
                            minimum: {
                                unit: option.deliveryEstimateUnit,
                                value: option.deliveryEstimateMin,
                            },
                            maximum: {
                                unit: option.deliveryEstimateUnit,
                                value: option.deliveryEstimateMax,
                            }
                        }
                    }
                }
            )),
        });

        return NextResponse.json({ id: session.id });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}