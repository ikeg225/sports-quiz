interface Props {
    url: any;
    title: any;
}

export default function ReadMore({ url, title }: Props) {
    const re = /https?:\/\/([\w\.\-\–\—]+)/
    return (
        <div className="bg-black rounded flex xsm:flex-row flex-col py-5 xsm:px-10 px-5 my-5 content-center items-center xsm:gap-x-1 gap-y-5 xsm:text-left text-center">
            <div className="flex flex-col font-body xsm:w-8/12">
                <h1 className="text-white">
                    {title}
                </h1>
                <h1 className="text-gray-300">
                    {url.match(re)[1]}
                </h1>
            </div>
            <div className="xsm:w-4/12 xsm:text-right text-center">
                <a target="_blank" rel="noopener noreferrer" href={url}>
                    <button className="bg-white p-3 uppercase font-header">
                        Read More
                    </button>
                </a>
            </div>
        </div>
    )
}