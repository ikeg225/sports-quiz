import ReactPlayer from 'react-player/youtube'
import ReadMore from "./ReadMore"
import InternalPromo from "./InternalPromo"
import ToTable from "./ToTable"

export default function StringJSX({ content } : any) {
    if (content.includes("<ReactPlayer")) {
        const found = content.match(/<ReactPlayer url='([\w\/:.?=]+)' width='100%' \/>/)
        return <ReactPlayer url={found[1]} width='100%' style={{marginBottom: "30px"}}/>
    }
    else if (content.includes("<InternalPromo")) {
        const found = content.match(/<InternalPromo url='((.|\n)*?)' title='((.|\n)*?)' summary='((.|\n)*?)' \/>/)
        return <InternalPromo url={found[1]} title={found[3]} summary={found[5]} />
    }
    else if (content.includes("<ReadMore")) {
        const found = content.match(/<ReadMore url='(.*?)' title='(.*?)' \/>/)
        return <ReadMore url={found[1]} title={found[2]} />
    }
    else if (content.includes("<ToTable")) {
        const found = content.match(/<ToTable rows=(\[.*?\]) \/>/)
        return <ToTable rows={found[1]} />
    }
    else if (content.includes("<h1>")) {
        const found = content.match(/<h1>((.|\n)*?)<\/h1>/)
        return <h1 className="text-2xl my-5 font-header uppercase text-center md:text-left" dangerouslySetInnerHTML={{__html: found[1]}} />
    }
    else if (content.includes("<h2>")) {
        const found = content.match(/<h2>((.|\n)*?)<\/h2>/)
        return <h2 className="text-xl my-3 font-header uppercase" dangerouslySetInnerHTML={{__html: found[1]}} />
    }
    else if (content.includes("<h3>")) {
        const found = content.match(/<h3>((.|\n)*?)<\/h3>/)
        return <h3 className="text-lg my-3 font-header uppercase text-stone-400" dangerouslySetInnerHTML={{__html: found[1]}} />
    }
    else if (content.includes("<p>")) {
        const found = content.match(/<p>((.|\n)*?)<\/p>/g)
        return found.map((ptag : any) => (
            <p dangerouslySetInnerHTML={{__html: ptag.match(/<p>((.|\n)*?)<\/p>/)[1]}} />
        ))
    }
    else if (content.includes("<ol>")) {
        const found = content.match(/<ol>((.|\n)*?)<\/ol>/)
        return <ol className="list-decimal ml-6 font-body" dangerouslySetInnerHTML={{__html: found[1]}} />
    }
    else if (content.includes("<ul>")) {
        const found = content.match(/<ul>((.|\n)*?)<\/ul>/)
        return <ul className="list-disc ml-4 font-body" dangerouslySetInnerHTML={{__html: found[1]}} />
    }
    else {
        return (
            <div></div>
        )
    }
}