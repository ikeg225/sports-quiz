import Link from 'next/link'
import { Post } from '../typings'
import { urlFor } from '../sanity.js'
import { useState, useEffect } from 'react'

interface Props {
    posts: [Post];
}

const getShuffledArr = (arr : number[]) => {
    const newArr = arr.slice()
    for (let i = newArr.length - 1; i > 0; i--) {
        const rand = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
    }
    return newArr
};

export default function PostGrid({ posts }: Props) {
    const [post, setPost] = useState([0])

    useEffect(() => {
        let list: number[] = [];
        for (let i = 0; i < posts.length; i++) {
            list.push(i);
        }
        setPost(getShuffledArr(list))
    }, [])

    return (
        <div>
            <div className={`md:grid hidden gap-1 grid-cols-3 pb-1`}>
                {post.slice(0, 3).map((post) => (
                    <Link key={posts[post]._id} href={`/basketball/${posts[post].slug.current}`}>
                        <div className={`font-header text-white relative cursor-pointer uppercase`} >
                            <div className={`h-80 mw-auto transition duration-1000 hover:brightness-50 hover:ease-in-out`} style={{
                                backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0)),url(${urlFor(posts[post].mainImage).url()})`,
                                backgroundSize: "cover",
                                backgroundPosition: "50% 50%",
                            }}></div>
                            <h1 className="absolute right-0 bottom-0 left-0 m-7">{posts[post].title}</h1>
                        </div>
                    </Link>
                ))}
            </div>

            <div className={`md:grid hidden gap-1 grid-cols-4 pb-1`} >
                {post.slice(3, 7).map((post) => (
                    <Link key={posts[post]._id} href={`/basketball/${posts[post].slug.current}`}>
                        <div className={`font-header text-white relative cursor-pointer uppercase`} >
                            <div className={`h-64 mw-auto transition duration-1000 hover:brightness-50 hover:ease-in-out`} style={{
                                backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0)),url(${urlFor(posts[post].mainImage).url()})`,
                                backgroundSize: "cover",
                                backgroundPosition: "50% 50%",
                            }}></div>
                            <h1 className="absolute right-0 bottom-0 left-0 m-7">{posts[post].title}</h1>
                        </div>
                    </Link>
                ))}
            </div>
            
            <div className="grid md:hidden grid-cols-1">
                {post.slice(0, 1).map((post) => (
                    <Link key={posts[post]._id} href={`/basketball/${posts[post].slug.current}`}>
                        <div className="font-header text-white relative cursor-pointer uppercase">
                            <div className="h-80 mw-auto transition duration-1000 hover:brightness-50 hover:ease-in-out" style={{
                                backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0)),url(${urlFor(posts[post].mainImage).url()})`,
                                backgroundSize: "cover",
                                backgroundPosition: "50% 50%",
                            }}></div>
                            <h1 className="absolute right-0 bottom-0 left-0 m-7">{posts[post].title}</h1>
                        </div>
                    </Link>
                ))}
            </div>

            <div className="flex md:hidden flex-column overflow-x-scroll flex-nowrap">
                {post.slice(2, 7).map((post) => (
                    <Link key={posts[post]._id} href={`/basketball/${posts[post].slug.current}`}>
                        <div className="font-header text-white relative cursor-pointer uppercase w-80">
                            <div className="h-52 w-80 transition duration-1000 hover:brightness-50 hover:ease-in-out" style={{
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