import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react';

function Header() {
    const [isNavOpen, setIsNavOpen] = useState(false);

    console.log(isNavOpen)

    return (
        <div className="md:border-b-4 border-black border-b-0">
            <header className="bg-black flex flex-row items-center justify-between px-5 py-2">
                <div className="hidden font-header uppercase text-white md:flex flex-row space-x-5">
                    <Link href='/'>
                        <h1 className="cursor-pointer">Home</h1>
                    </Link>
                    <Link href='/blog'>
                        <h1 className="cursor-pointer">Blog</h1>
                    </Link>
                    <Link href='/contact'>
                        <h1 className="cursor-pointer">Contact Us</h1>
                    </Link>
                </div>
                <div className="flex md:hidden cursor-pointer" onClick={() => setIsNavOpen((prev) => !prev)}>
                    <div className="space-y-1">
                        <span className="block w-6 h-0.5 bg-white"></span>
                        <span className="block w-6 h-0.5 bg-white"></span>
                        <span className="block w-4 h-0.5 bg-white"></span>
                    </div>
                </div>
                <div className="w-36 -mb-1.5 max-w-[40%] md:hidden">
                    <Image 
                        src="/images/logo-white.webp" 
                        alt="Sports Quiz Logo" 
                        height={450}
                        width={1950}
                    />
                </div>
                <div className="-mb-1.5 max-w-[10%]">
                    <Image 
                            className="cursor-pointer" 
                            src="/images/daily-icon.png" 
                            alt="Daily Sports Quiz Icon" 
                            width={30} height={30}
                    />
                </div>
            </header>
            <div className="hidden w-96 mx-auto py-10 max-w-[50%] md:flex">
                <Image 
                    src="/images/logo.webp" 
                    alt="Sports Quiz Logo" 
                    height={450}
                    width={1950}
                />
            </div>
        </div>
    );
}

export default Header;