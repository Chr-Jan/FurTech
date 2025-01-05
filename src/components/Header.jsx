import { useLocation } from "react-router-dom";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import { brainwave } from "../assets";
import { navigation } from "../constants";
import Button from "./Button";
import MenuSvg from "../assets/svg/MenuSvg";
import { HamburgerMenu } from "./design/Header";
import { useState, useEffect } from "react";

const Header = () => {
    // Get the current URL path using React Router
    const pathname = useLocation();

    // State to track whether the mobile navigation menu is open or closed
    const [openNavigation, setOpenNavigation] = useState(false);

    // Effect to handle scroll lock when navigation is opened
    useEffect(() => {
        if (openNavigation) {
            disablePageScroll(); // Prevent scrolling when menu is open
        } else {
            enablePageScroll(); // Enable scrolling when menu is closed
        }

        // Cleanup function to re-enable scrolling when component unmounts
        return () => enablePageScroll();
    }, [openNavigation]); // Runs whenever `openNavigation` changes

    // Toggles the mobile navigation menu visibility
    const toggleNavigation = () => {
        setOpenNavigation(prev => !prev);
    };

    // Function to close the menu when a navigation link is clicked
    const handleClick = () => {
        if (!openNavigation) return;
        enablePageScroll();
        setOpenNavigation(false);
    };

    return (
        // Header container, positioned at the top of the page
        <div className="fixed top-0 left-0 w-full z-50 border-b border-n-6">
            {/* Main header content container */}
            <div className="flex items-center px-5 lg:px-7.5 xl:px-10 max-lg:py-4">

                {/* Logo */}
                <a className="block w-[12] xl:mr-8" href="hero">
                    <img src={brainwave} width={190} height={40} alt="Brainwave" />
                </a>

                {/* Navigation Menu */}
                <nav className={`${openNavigation ? 'flex' : 'hidden'} fixed top-[5rem] left-0 right-0 bottom-0 bg-n-8 lg:static lg:flex lg:mx-auto lg:bg-transparent`}>
                    <div className="relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row">
                        {/* Loop through navigation items and render links */}
                        {navigation.map((item) => (
                            <a
                                key={item.id}
                                href={item.url}
                                onClick={handleClick} // Close menu on link click
                                className={`block relative font-code text-2xl uppercase text-n-1 transition-colors hover:text-color-1 
                                ${item.onlyMobile ? "lg:hidden" : ""} 
                                px-6 py-6 md:py-8 lg:mr-[0.25rem] lg:text-sm lg:font-semibold 
                                ${item.url === pathname.hash ? "z-2 lg:text-n-1" : "lg:text-n-1/15"} 
                                lg:leading-5 lg:hover:text-n-1 xl:px-12`}
                            >
                                {item.title}
                            </a>
                        ))}
                    </div>

                    {/* Mobile navigation menu (Hamburger icon) */}
                    <HamburgerMenu />
                </nav>

                {/* Sign-up and login buttons (visible only on large screens) */}
                <a href="#signup" className="button hidden mr-8 text-n-1/50 transition-colors hover:text-n-1 lg:block">
                    New account
                </a>
                <Button className="hidden lg:flex" href="#login">
                    Sign in
                </Button>

                {/* Toggle Button for Mobile Navigation */}
                <Button className="ml-auto lg:hidden" px="px-3" onClick={toggleNavigation}>
                    <MenuSvg openNavigation={openNavigation} />
                </Button>
            </div>
        </div>
    );
};

export default Header;
