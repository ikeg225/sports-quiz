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
                <div className="bg-white rounded flex flex-row gap-5 shadow-lg pr-10 items-center">
                    <div>
                        <img src="/images/logoshort.webp" width="75rem" height="75rem" className="rounded-l-lg"/>
                    </div>
                    <div className="flex flex-col font-body">
                        <h1 className="text-black">
                            {title}
                        </h1>
                        <h1 className="text-gray-400">
                            {summary}
                        </h1>
                    </div>
                </div>
            </a>
        </Link>
    )
}