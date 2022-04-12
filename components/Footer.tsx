import Link from 'next/link'

export default function Footer() {

    return (
        <div className="text-gray-400 flex md:flex-row flex-col md:place-content-between items-center text-center mt-10 pt-3 md:pt-0 pb-3 border-t-2">
            <p>© Sports Quiz {new Date().getFullYear()}</p>
            <div className="flex md:flex-row flex-col md:gap-5">
                <Link href='/terms-and-conditions'>
                    <p className="cursor-pointer">Terms and Conditions</p>
                </Link>
                <Link href='/privacy-policy'>
                    <p className="cursor-pointer">Privacy Policy</p>
                </Link>
            </div>
        </div>
    )
}