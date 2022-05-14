import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { slide as Menu } from 'react-burger-menu'

function Header() {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const router = useRouter();

    let styles = {
        bmBurgerButton: {
            position: 'relative',
            width: '24px',
            height: '18px',
            left: '0px',
            top: '0px'
        },
        bmBurgerBars: {
            background: "white"
        },
        bmCrossButton: {
            height: '24px',
            width: '24px',
            left: '15px'
        },
        bmCross: {
            background: 'white'
        },
        bmMenuWrap: {
            position: 'fixed',
            height: '100%',
            top: "0px",
            left: "0px"
        },
        bmMenu: {
            backgroundImage: 'url(/images/kobe-menu.webp)',
            backgroundPosition: "85% 50%",
            backgroundSize: "cover",
            padding: '2.5em 1em 0',
            fontSize: '1.15em',
            height: "100%"
        },
        bmItemList: {
            color: 'white',
            padding: '0.8em',
        },
        bmItem: {
            display: 'inline-block'
        },
        bmOverlay: {
            top: "0px",
            filter: "brightness(.5)"
        }
    }
      
    return (
        <div className="md:border-b-4 border-black border-b-0 sticky top-0 z-50 md:relative">
            <header className="bg-black flex flex-row items-center justify-between px-5 py-2">
            <div className="flex md:hidden cursor-pointer bg-black text-white" 
                onClick={() => setIsNavOpen((prev) => !prev)}>
                    <Menu styles={ styles } className="font-header uppercase leading-10 text-right" width={ 290 } pageWrapId={ "page-wrap" } outerContainerId={ "outer-container" }>
                        <Link href='/'>
                            <h1 className={router.pathname == "/" ? "cursor-pointer brightness-50" : "cursor-pointer transition duration-500 hover:brightness-50 hover:ease-in-out"}>Home</h1>
                        </Link>
                        <Link href='/blog'>
                            <h1 className={router.pathname == "/blog" ? "cursor-pointer brightness-50" : "cursor-pointer transition duration-500 hover:brightness-50 hover:ease-in-out"}>Blog</h1>
                        </Link>
                        <Link href='/contact'>
                            <h1 className={router.pathname == "/contact" ? "cursor-pointer brightness-50" : "cursor-pointer transition duration-500 hover:brightness-50 hover:ease-in-out"}>Contact Us</h1>
                        </Link>
                        <Link href='/trivia-questions'>
                            <h1 className={router.pathname == "/trivia-questions" ? "cursor-pointer brightness-50" : "cursor-pointer transition duration-500 hover:brightness-50 hover:ease-in-out"}>Trivia Questions</h1>
                        </Link>
                    </Menu>
                </div>
                <div className="hidden font-header uppercase text-white md:flex flex-row space-x-5">
                    <Link href='/'>
                        <h1 className={router.pathname == "/" ? "cursor-pointer brightness-50" : "cursor-pointer transition duration-500 hover:brightness-50 hover:ease-in-out"}>Home</h1>
                    </Link>
                    <Link href='/blog'>
                        <h1 className={router.pathname == "/blog" ? "cursor-pointer brightness-50" : "cursor-pointer transition duration-500 hover:brightness-50 hover:ease-in-out"}>Blog</h1>
                    </Link>
                    <Link href='/contact'>
                        <h1 className={router.pathname == "/contact" ? "cursor-pointer brightness-50" : "cursor-pointer transition duration-500 hover:brightness-50 hover:ease-in-out"}>Contact Us</h1>
                    </Link>
                </div>
                <div className="w-36 -mb-1.5 max-w-[40%] md:hidden transition duration-500 hover:brightness-50 hover:ease-in-out">
                    <Link href='/'>
                        <a>
                            <Image 
                                className="cursor-pointer"
                                src="/images/logo-white.webp" 
                                alt="Sports Quiz Logo" 
                                height={450}
                                width={1950}
                            />
                        </a>
                    </Link>
                </div>
                <div className="-mb-1.5 max-w-[10%] transition duration-500 hover:brightness-75 hover:ease-in-out">
                    <Link href='/trivia-questions'>
                        <a>
                            <Image 
                                className="cursor-pointer" 
                                src="/images/trivia-question.png" 
                                alt="Trivia Question Sports Quiz Icon" 
                                width={30} height={30}
                            />
                        </a>
                    </Link>
                </div>
            </header>
            <div className="hidden w-96 mx-auto py-10 max-w-[50%] md:flex">
                <Link href='/'>
                    <a>
                        <Image 
                            className="cursor-pointer"
                            src="/images/logo.webp" 
                            alt="Sports Quiz Logo" 
                            height={450}
                            width={1950}
                        />
                    </a>
                </Link>
            </div>
        </div>
    );
}

export default Header;