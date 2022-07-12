import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import Header from '../components/Header'
import Footer from '../components/Footer'
import SideBar from '../components/SideBar'
import { urlFor } from '../sanity.js'
import { sanityClient } from '../sanity.js'
import { getTenRandom } from './api/mongo'

export default function Basketball({ blogs, posts, qanda } : any) {
    console.log(qanda)
    return (
        <div className="max-w-7xl mx-auto">
            <div className="md:mx-5">
                <Head>
                <title>Basketball</title>
                <link rel="icon" href="/images/favicon.ico" />
                <link
                    rel="preload"
                    href="/fonts/Oswald-Bold.ttf"
                    as="font"
                    crossOrigin=""
                    />
                <meta name="title" key="title" content="Sports Quiz - Basketball" />
                <meta name="description" key="description" content="Sports Quiz. Come on in and test your sports knowledge with our trivia quizzes or play fun and interactive personality quizzes!" />
                <meta property="og:url" content="sportsquiz.org/basketball" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Sports Quiz - Basketball" />
                <meta name="twitter:card" content="summary" />
                <meta property="og:description" content="Sports Quiz. Come on in and test your sports knowledge with our trivia quizzes or play fun and interactive personality quizzes!" />
                <meta property="og:image" content={"/images/Sports-Quiz-Preview.webp"} />
                </Head>
                <Header />
                <main>
                    <div className="flex flex-row pt-5 m-5 md:m-0">
                        <div className="flex flex-col lg:w-8/12">
                            <div className="flex flex-col gap-10">
                                {blogs.map((blog : any) => (
                                    <Link key={blog.name} href={`/basketball/${blog.slug.current}`}>
                                        <div className="flex flex-col md:flex-row ease-in-out duration-100 cursor-pointer bg-white hover:drop-shadow-lg items-center">
                                            <div className="md:max-w-xs text-[0px]">
                                                <Image
                                                    src={urlFor(blog.image).url()}
                                                    width={1200}
                                                    height={675}
                                                />
                                            </div>
                                            <div className="p-5 md:p-0 md:pl-5">
                                                <h1 className="font-header text-black uppercase text-xl">
                                                    {blog.name}
                                                </h1>
                                                <p>{blog.body[0].children[0].text.substring(0,125)}...</p>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                            <div className="grid grid-cols-2 gap-x-10 gap-y-5 mt-14">
                                {Object.keys(qanda).map((article : any) => (
                                    <div className="ease-in-out duration-100 cursor-pointer bg-white border-r-4 border-white hover:border-black">
                                        <Link href={`basketball/${article}`}>
                                            <a href={`basketball/${article}`}>
                                                <div className="flex flex-col pr-5">
                                                    <h1 className="font-header text-black uppercase text-xl">
                                                        {qanda[article][0]}
                                                    </h1>
                                                    <p>
                                                        {qanda[article][1]}
                                                    </p>
                                                </div>
                                            </a>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="hidden lg:block lg:w-4/12">
                            <SideBar posts={posts} />
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        </div>
    )
}

export const getStaticProps = async () => {
    const query = `*[_type == "blog"] {
        name,
        image,
        slug,
        body
      }`;

      const queryQuiz = `*[_type == "post"] {
        title,
        mainImage,
        slug
      }`;

    const blogs = await sanityClient.fetch(query);
    const posts = await sanityClient.fetch(queryQuiz);

    const qanda = await getTenRandom()
    return {
        props: {
        blogs,
        posts,
        qanda
        },
        revalidate: 500,
    };
};