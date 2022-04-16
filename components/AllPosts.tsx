import Link from 'next/link'
import { Post } from '../typings'
import { urlFor } from '../sanity.js'
import Image from 'next/image'
import QuizData from './QuizData'

interface Props {
    posts: [Post];
    quizInfo: any;
}

export default function AllPosts({posts, quizInfo} : Props) {
    return (
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-x-5 lg:gap-y-20 gap-y-10">
            {posts.map((post) => (
                <Link key={post._id} href={`/basketball/${post.slug.current}`}>
                    <div className="ease-in duration-300 cursor-pointer bg-white hover:drop-shadow-lg">
                        <Image 
                            src={urlFor(post.mainImage).url()}
                            alt={post.title}
                            height={675}
                            width={1200}
                        />
                        <h1 className="font-header uppercase text-center text-xl">
                            {post.title}
                        </h1>
                        <QuizData values={quizInfo[post.id]} textColor={false}/>
                    </div>
                </Link>
            ))}
        </div>
    )
}