import Link from 'next/link'
interface Props {
    url: any;
    title: any;
    summary: any;
}

export default function InternalPromo({ url, title, summary }: Props) {
    return (
        <Link href={`/basketball/${url}`}>
            <a href={`/basketball/${url}`}>
                <div className="bg-white rounded flex flex-col shadow-internal py-5 px-5 gap-3 my-5">
                    <div className="flex flex-row items-center gap-3">
                        <img src="/images/logoshort.webp" width="25rem" height="25rem" className="rounded-l-lg"/>
                        <h1 className="text-black">
                            {title}
                        </h1>
                    </div>
                    {summary && <div className="font-body">
                        <h1 className="text-gray-400">
                            {summary}
                        </h1>
                    </div>}
                </div>
            </a>
        </Link>
    )
}