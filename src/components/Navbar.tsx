"use client";
import {useState} from 'react';
import Link from 'next/link';
import {
    Menubar,
    MenubarMenu,
    MenubarTrigger,
} from '@/components/ui/menubar';

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList
} from '@/components/ui/navigation-menu'

import {CartItem, ProductPage} from "@/types";

import {MenuIcon, SearchIcon, ShoppingCartIcon, XIcon} from "lucide-react";
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";

const Navbar = ({productPages = []} : {
    productPages: ProductPage[];
}) => {

    const [isOpen, setIsOpen] = useState(false);
    const cartItems: CartItem[] = useSelector((state: RootState) => state.cart.items);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-white">
            <div className="mx-auto px-32 py-8 sm:px-6 lg:px-32">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className="text-xl font-bold text-gray-900">
                            Dine Mart
                        </Link>
                    </div>
                    <div className="hidden md:block">
                        <NavigationMenu>
                            <NavigationMenuList className="flex gap-12 items-baseline space-x-4">

                                {productPages.map((page) => (
                                    <NavigationMenuItem key={page._id}>
                                        <Link href={"/" + page.slug.current}>{page.title}</Link>
                                    </NavigationMenuItem>
                                ))}
                                <NavigationMenuItem>
                                    <Link href="/products">All Products</Link>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>

                    <div className={"search-bar w-[30%]"}>
                        <div className="flex items-center justify-center border rounded-lg px-[5px]">
                            <SearchIcon className={"text-muted-foreground w-4 h-4"} />
                            <input type="search" placeholder="What are you looking for" className={"text-sm p-[5px] w-full"} />
                        </div>
                    </div>

                    <div className={"shopping-cart cursor-pointer transition-all duration-200 hover:scale-110"}>
                        <div className="bg-secondary relative p-2 rounded-full">
                            <Link href={"/cart"}>
                                <span
                                    className={"absolute top-[-5px] right-0 w-5 h-5 flex items-center justify-center rounded-full bg-destructive text-white text-sm"}>
                                    {cartItems.reduce((total, item) => total + item.quantity, 0)}
                                </span>
                                <ShoppingCartIcon/>
                            </Link>
                        </div>
                    </div>

                    <div className="md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="text-gray-900 hover:text-gray-700 focus:outline-none"
                        >
                        {isOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>
            <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
                <Menubar className={"flex flex-col h-screen md:h-auto"}>
                    <MenubarMenu>
                        <MenubarTrigger>
                            <Link href="/" className="text-gray-900 hover:text-gray-700 block px-3 py-2 rounded-md text-base font-medium">
                                Home
                            </Link>
                        </MenubarTrigger>
                    </MenubarMenu>
                    <MenubarMenu>
                        <MenubarTrigger>
                            <Link href="/about" className="text-gray-900 hover:text-gray-700 block px-3 py-2 rounded-md text-base font-medium">
                                About
                            </Link>
                        </MenubarTrigger>
                    </MenubarMenu>
                    <MenubarMenu>
                        <MenubarTrigger>
                            <Link href="/services" className="text-gray-900 hover:text-gray-700 block px-3 py-2 rounded-md text-base font-medium">
                                Services
                            </Link>
                        </MenubarTrigger>
                    </MenubarMenu>
                    <MenubarMenu>
                        <MenubarTrigger>
                            <Link href="/contact" className="text-gray-900 hover:text-gray-700 block px-3 py-2 rounded-md text-base font-medium">
                                Contact
                            </Link>
                        </MenubarTrigger>
                    </MenubarMenu>
                </Menubar>
            </div>
        </nav>
    );
};

export default Navbar;
