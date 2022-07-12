import Head from 'next/head'
import Image from 'next/image'
import PortableText from "react-portable-text"
import Header from "../../components/Header"
import SideBar from '../../components/SideBar'
import StartQuiz from "../../components/StartQuiz"
import Footer from '../../components/Footer'
import { Post } from '../../typings'
import { getData, articleExists, getArticle } from '../api/mongo'
import { GetStaticProps } from "next"
import { sanityClient, urlFor } from "../../sanity"

import StringJSX from "../../components/StringJSX"

interface Props {
    post: Post;
    blog: any;
    posts: any;
    quizInfo: any;
    slug: any;
    qanda: any;
}

function Post({ post, blog, posts, quizInfo, slug, qanda }: Props) {
    const qandaExists = Object.keys(qanda).length !== 0
    const maincontent = qanda["content"]
    return (
        <div className="max-w-7xl mx-auto">
            <div className="md:mx-5">
                <Head>
                <title>{post ? post.title : (qandaExists ? qanda.title : blog.name)}</title>
                <link rel="icon" href="/images/favicon.ico" />
                <link
                    rel="preload"
                    href="/fonts/Oswald-Bold.ttf"
                    as="font"
                    crossOrigin=""
                />
                <meta name="title" key="title" content={post ? post.title : (qandaExists ? qanda.title : blog.name)} />
                <meta name="description" key="description" content={post ? post.meta : (blog ? blog.meta : "")} />
                <meta property="og:url" content={`sportsquiz.org/basketball/${slug}`} />
                <meta property="og:type" content="website" />
                <meta property="og:title" content={post ? post.title : (qandaExists ? qanda.title : blog.name)} />
                <meta name="twitter:card" content="summary" />
                <meta property="og:description" content={post ? post.meta : (blog ? blog.meta : "")} />
                <meta property="og:image" content={qandaExists ? "/images/Sports-Quiz-Preview.webp" : urlFor(post ? post.mainImage : blog.image).url()} />
                <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8988173996455041" crossOrigin="anonymous"></script>
                {qandaExists && <script type="application/ld+json">{qanda.schema}</script>}
                </Head>
                <Header />
                <main className="flex flex-row md:mt-10 flex-wrap">
                    <div className="w-full md:w-7/12">
                        {!qandaExists && <div className="text-[0px]">
                            <Image 
                                src={urlFor(post ? post.mainImage : blog.image).url()}
                                alt={post ? post.title : (qandaExists ? qanda.title : blog.name)}
                                height={675}
                                width={1200}
                            />
                        </div>}
                        <div className="m-5 md:m-0">
                            {!qandaExists && <h1 className="text-2xl my-5 font-header uppercase text-center md:text-left">
                                {post ? post.title : blog.name}
                            </h1>}
                            {post && <StartQuiz url={post.id} values={quizInfo[post.id]} outbound={post.outbound} quizType={post.quiztype}/>}
                            {!qandaExists && <PortableText 
                                className=""
                                dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
                                projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
                                content={post ? post.body : blog.body}
                                serializers={{
                                    h2: (props: any) => (
                                        <h1 className="text-xl my-3 font-header uppercase" {...props} />
                                    ),
                                    h3: (props: any) => (
                                        <h1 className="text-lg my-3 font-header uppercase" {...props} />
                                    ),
                                    li: ({ children } : any) => (
                                        <li className="list-disc ml-4">{children}</li>
                                    ),
                                    link: ({ href, children }: any) => (
                                        <a href={href} className="text-gray-400">
                                            {children}
                                        </a>
                                    )
                                }}
                            />}
                            {qandaExists && maincontent.map((content: String) => (
                                <StringJSX content={content}/>
                            ))}
                        </div>
                    </div>
                    <div className="w-full md:w-5/12 mx-5 md:m-0">
                        <SideBar posts={posts} />
                    </div>
                </main>
                <Footer />
            </div>
        </div>
    )
}

export default Post;

export const getStaticPaths = async () => {
    const query = `*[_type == "post" || _type == "blog"] {
        _id,
        slug{
        current
      }
      }`;

      const posts = await sanityClient.fetch(query);
      const paths = posts.map((post: Post) => ({
          params: {
              slug: post.slug.current
          }
      }));

      return {
          paths,
          fallback: 'blocking',
      }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const slug = params?.slug

    const query = `*[_type == "post" && slug.current == $slug][0] {
        _id,
        id,
        outbound,
        quiztype,
        slug{
        current
      },
        mainImage,
        title,
      body,
      meta
      }`

    let post = await sanityClient.fetch(query, {
        slug: slug
    })

    if (!post) {
        post = false
    }

    const query_posts = `*[_type == "post"] {
        _id,
        title,
        mainImage,
        slug
      }`;
    
    const posts = await sanityClient.fetch(query_posts);

    const queryBlog = `*[_type == "blog" && slug.current == $slug][0] {
        _id,
        slug{
        current
      },
        image,
        name,
      body,
      meta
      }`

    let blog = await sanityClient.fetch(queryBlog, {
        slug: slug
    })

    if (!blog) {
        blog = false
    }

    const quizInfo = await getData()

    let qanda = {}
    const exists = await articleExists(slug)
    if (exists) {
        qanda = await getArticle(slug)
    }

    return {
        props: {
            post,
            blog,
            posts,
            quizInfo,
            slug,
            qanda
        },
        revalidate: 60
    }
}