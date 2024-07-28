import {client} from "@/utils/sanity"
import {Product} from "@/types";
import {Button} from "@/components/ui/button";
import {ShoppingCartIcon} from "lucide-react";
import Image from "next/image";
import headerImage from "../../public/header.webp";
import event1 from "../../public/event1.webp";

import 'swiper/css';
import ProductSlider from "@/components/ProductSlider";

export const revalidate = 120;

async function Home() {

    async function getProducts() {
        const CONTENT_QUERY = `*[_type == "product"] {
              _id,
              title,
              slug,
              type,
              price,
              featured_image{asset->{_id, url}},
              category->{title, description},
              _createdAt
            }[0..10]`;
        return await client.fetch(CONTENT_QUERY);
    }

    const products: Product[] = await getProducts() ?? [];


    return (
        <main className="">
            <header className={"px-32 py-16 flex gap-16 justify-between"}>
                <div className="flex items-start flex-col justify-between pt-12 pb-8 w-full md:w-1/2">
                    <div className="flex flex-col gap-10 items-start">
                        <span className={"text-[blue] bg-[#e1edff] font-bold rounded px-6 py-2"}>
                            Sale 70%
                        </span>
                        <h1 className={"text-6xl font-bold"}>An Industrial Take on Streetwear</h1>
                        <p className={"text-muted-foreground w-[70%]"}>Anyone can beat you but no one can beat your
                            outfit as long as you wear Dine outfits.</p>
                        <Button className={"rounded-none text-lg flex gap-2 px-6 py-8"}>
                            <ShoppingCartIcon/> Start Shopping
                        </Button>
                    </div>
                    <div className={"grid grid-cols-4 gap-4 w-full"}>
                        <Image src={"/featured1.webp"} alt="" width={100} height={100}/>
                        <Image src={"/featured1.webp"} alt="" width={100} height={100}/>
                        <Image src={"/featured1.webp"} alt="" width={100} height={100}/>
                        <Image src={"/featured1.webp"} alt="" width={100} height={100}/>
                    </div>
                </div>
                <div>
                    <div className={"relative"}>
                        <div className={"rounded-full bg-[#ffece3] w-[600px] h-[600px] absolute z-[-1] top-10 "}></div>
                        <Image src={headerImage} alt={"header"} className={"w-[650px] h-[650px]"} height={650}
                               width={650}/>
                    </div>
                </div>
            </header>

            <section className={"promotion-section px-32 py-16"}>
                <div className={"flex flex-col justify-between items-center gap-4 mb-8"}>
                    <small className={"uppercase text-[#0062f5] font-bold tracking-widest"}>promotion</small>
                    <h2 className={"text-4xl font-bold"}>Our Promotions Events</h2>
                </div>
                <div className={"flex justify-between gap-8"}>
                    <div className={" w-[53%] flex flex-col gap-4"}>
                        <div className={"banner-card px-8 flex justify-between items-center bg-[#d6d6d8]"}>
                            <div className={"tracking-wider"}>
                                <h3 className={"uppercase text-3xl font-bold"}>get up to 60%</h3>
                                <p className={""}>For the summer season</p>
                            </div>
                            <Image src={event1} alt={""}/>
                        </div>

                        <div className={"banner-card px-8 pt-12 pb-8 bg-gray-800"}>
                            <div className={"tracking-wider flex flex-col gap-2 text-white items-center"}>
                                <h3 className={"uppercase text-4xl font-bold mb-4"}>GET 30% Off</h3>
                                <p className={"uppercase"}>USE PROMO CODE</p>
                                <Button
                                    className={"bg-gray-700 tracking-[.25em] text-lg px-16 font-bold uppercase hover:bg-gray-700"}>DINEWEEKENDSALE</Button>
                            </div>
                        </div>
                    </div>
                    <div className={" w-[47%] flex justify-between gap-4"}>
                        <div className={"bg-orange-100 pt-6 w-1/2 flex flex-col justify-between"}>
                            <div className={"px-4"}>
                                <p>Flex Sweatshirt</p>
                                <p>
                                    <span className={"line-through"}>$100.00</span>
                                    <span className={"ms-3 font-semibold"}>$75.00</span>
                                </p>
                            </div>
                            <Image src={"/event2.webp"} alt={""} className={"w-full"} width={100} height={100}/>
                        </div>
                        <div className={"bg-gray-200 pt-6 w-1/2 flex flex-col justify-between"}>
                            <div className={"px-4"}>
                                <p>Flex Push Button Bomber</p>
                                <p>
                                    <span className={"line-through"}>$225.00</span>
                                    <span className={"ms-3 font-semibold"}>$190.00</span>
                                </p>
                            </div>
                            <Image src={"/event3.webp"} alt={""} className={"w-full"} width={100} height={100}/>
                        </div>
                    </div>
                </div>
            </section>

            <section className={"products-section px-32 py-16"}>
                <div className={"flex flex-col justify-between items-center gap-4 mb-8"}>
                    <small className={"uppercase text-[#0062f5] font-bold tracking-widest"}>products</small>
                    <h2 className={"text-4xl font-bold"}>Check What We Have</h2>
                </div>

                <div className={"mb-8"}>

                    <ProductSlider products={products} />
                </div>
            </section>

            <section className={"px-32 py-16"}>
                <div className={"flex justify-end items-center gap-4 mb-12"}>
                    <div className={"w-5/12"}>
                        <h3 className={"text-4xl font-bold"}>Unique and Authentic Vintage Designer Jewellery</h3>
                    </div>
                </div>

                <div className={"grid grid-cols-2 gap-12 place-items-center tracking-wider"}>
                    <div className={"flex gap-24"}>
                        <div className={"flex flex-col gap-16"}>
                            <div>
                                <p className={"font-bold text-lg mb-4"}>Using Good Quality Materials</p>
                                <p className={"font-light"}>Lorem ipsum dolor sit amt, consectetur adipiscing elit.</p>
                            </div>
                            <div>
                                <p className={"font-bold text-lg mb-4"}>Using Good Quality Materials</p>
                                <p className={"font-light"}>Lorem ipsum dolor sit amt, consectetur adipiscing elit.</p>
                            </div>
                        </div>
                        <div className={"flex flex-col gap-16"}>
                            <div>
                                <p className={"font-bold text-lg mb-4"}>Using Good Quality Materials</p>
                                <p className={"font-light"}>Lorem ipsum dolor sit amt, consectetur adipiscing elit.</p>
                            </div>
                            <div>
                                <p className={"font-bold text-lg mb-4"}>Using Good Quality Materials</p>
                                <p className={"font-light"}>Lorem ipsum dolor sit amt, consectetur adipiscing elit.</p>
                            </div>
                        </div>
                    </div>
                    <div className={"grid grid-cols-2 place-items-center gap-12"}>
                        <div className={"bg-gray-300"}>
                            <Image src={"/event3.webp"} alt={""} width={100} height={100}/>
                        </div>
                        <div>
                            <p className={"font-light mb-8"}>
                                This piece is ethically crafted in our small family-owned workshop in Peru with unmatched attention to detail and care. The Natural color is the actual natural color of the fiber, undyed and 100% traceable.
                            </p>

                            <Button className={"rounded-none"}>
                                See All Products
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

        </main>
    );
}
export default Home;