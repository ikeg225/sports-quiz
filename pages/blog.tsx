import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import Header from '../components/Header'
import Footer from '../components/Footer'
import SideBar from '../components/SideBar'
import { urlFor } from '../sanity.js'
import { sanityClient } from '../sanity.js'

export default function Blog({ blogs, posts } : any) {
    return (
        <div className="max-w-7xl mx-auto">
            <div className="md:mx-5">
                <Head>
                <title>Blog</title>
                <link rel="icon" href="/images/favicon.ico" />
                <link
                    rel="preload"
                    href="/fonts/Oswald-Bold.ttf"
                    as="font"
                    crossOrigin=""
                    />
                </Head>
                <Header />
                <main>
                    <div className="flex flex-row pt-5 m-5 md:m-0">
                        <div className="flex flex-col gap-10 lg:w-8/12">
                            {blogs.map((blog : any)=> (
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

export const getServerSideProps = async () => {
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

    return {
        props: {
        blogs,
        posts
        },
    };
};