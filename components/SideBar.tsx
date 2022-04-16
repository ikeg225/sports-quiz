import { Post } from '../typings'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { urlFor } from '../sanity.js'

interface Props {
    posts: [Post];
    title: string;
}

const getShuffledArr = (arr : number[]) => {
    const newArr = arr.slice()
    for (let i = newArr.length - 1; i > 0; i--) {
        const rand = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
    }
    return newArr
};

export default function SideBar({ posts, title }: Props) {
    const [post, setPost] = useState([0])

    useEffect(() => {
        let list: number[] = [];
        for (let i = 0; i < posts.length; i++) {
            list.push(i);
        }
        setPost(getShuffledArr(list))
    }, [])

    return (
        <div className="md:pl-10 md:sticky top-5">
            <h1 className="text-2xl mb-5 font-header uppercase">
                {title}
            </h1>
            <div className={`flex flex-col pb-1 w-full gap-2`}>
                {post.slice(0, 3).map((post) => (
                    <Link key={posts[post]._id} href={`/basketball/${posts[post].slug.current}`}>
                        <div className={`font-header text-white relative cursor-pointer uppercase`} >
                            <div className={`h-56 mw-auto transition duration-1000 hover:brightness-50 hover:ease-in-out`} style={{
                                backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0)),url(${urlFor(posts[post].mainImage).url()})`,
                                backgroundSize: "cover",
                                backgroundPosition: "50% 50%",
                            }}></div>
                            <h1 className="absolute right-0 bottom-0 left-0 m-7">{posts[post].title}</h1>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}