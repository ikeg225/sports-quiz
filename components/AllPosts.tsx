import Link from 'next/link'
import Image from 'next/image'
import client from './Client'
import QuizData from './QuizData'
import getAvg from './GetAverage'
import { Post } from '../typings'
import { urlFor } from '../sanity.js'
import { useState, useEffect } from 'react'

interface Props {
    posts: [Post];
    quizInfo: any;
    search: string;
    sort: string;
}

export default function AllPosts({posts, quizInfo, search, sort} : Props) {
    const [searchResults, setSearchResults] = useState([])

    useEffect(() => {
        let quizJSON : any = []
        posts.map((quiz) => {
            quizJSON.push({
                'id': quiz.id,
                'title': quiz.title,
                'created': new Date(quiz.publishedAt).getTime(),
                'plays': quizInfo[quiz.id].plays,
                'avgScore': parseFloat(getAvg(quizInfo[quiz.id].scores).toFixed(2)),
                'numQuestions': quizInfo[quiz.id].scores.length - 1,
                'quizType': quiz.quiztype,
                'slug': quiz.slug.current,
                'mainImage': quiz.mainImage
            })
        })

        client.collections('quizzes').documents().import(quizJSON.map((x : any) => JSON.stringify(x)).join('\n'));
    }, []);    

    useEffect(() => {
        let searchParameters = {
            'q'         : `${search}`,
            'query_by'  : 'title',
            'sort_by'   : `${sort}:desc`,
            'per_page'  : 20
        }
        
        client.collections('quizzes')
            .documents()
            .search(searchParameters)
            .then(function (searchResults) {
            setSearchResults(searchResults.hits as [])
        })      
    }, [search, sort]); 

    return (
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-x-5 lg:gap-y-20 gap-y-10">
            {searchResults && searchResults.map((post : any) => (
                <Link key={post.document.id} href={`/basketball/${post.document.slug}`}>
                    <div className="ease-in-out duration-100 cursor-pointer bg-white hover:drop-shadow-lg">
                        <Image 
                            src={urlFor(post.document.mainImage).url()}
                            alt={post.title}
                            height={675}
                            width={1200}
                        />
                        <h1 className="font-header uppercase text-center text-xl">
                            {post.document.title}
                        </h1>
                        <QuizData values={[post.document.plays, post.document.avgScore, post.document.numQuestions]} textColor={false}/>
                    </div>
                </Link>
            ))}
        </div>
    )
}