import Head from 'next/head'
import Image from 'next/image'
import PortableText from "react-portable-text"
import Header from "../../components/Header"
import SideBar from '../../components/SideBar'
import StartQuiz from "../../components/StartQuiz"
import Footer from '../../components/Footer'
import { Post } from '../../typings'
import { getData } from '../api/mongo'
import { GetStaticProps } from "next"
import { sanityClient, urlFor } from "../../sanity"
import { mainModule } from 'process'

interface Props {
    post: Post;
    blog: any;
    posts: any;
    quizInfo: any;
}

function Post({ post, blog, posts, quizInfo }: Props) {
    return (
        <div className="max-w-7xl mx-auto h-full">
            <div className="md:mx-5 h-full" id="outer-container">
                <Head>
                <title>{post ? post.title : blog.name}</title>
                <link rel="icon" href="/favicon.ico" />
                <link
                    rel="preload"
                    href="/fonts/Oswald-Bold.ttf"
                    as="font"
                    crossOrigin=""
                    />
                </Head>
                <Header />
                <main id="page-wrap" className="flex flex-row md:mt-10 flex-wrap">
                    <div className="w-full md:w-7/12">
                        <div className="text-[0px]">
                            <Image 
                                src={urlFor(post ? post.mainImage : blog.image).url()}
                                alt={post ? post.title : blog.name}
                                height={675}
                                width={1200}
                            />
                        </div>
                        <div className="m-5 md:m-0">
                            <h1 className="text-2xl my-5 font-header uppercase text-center md:text-left">
                                {post ? post.title : blog.name}
                            </h1>
                            {post && <StartQuiz url={post.id} values={quizInfo[post.id]} />}
                            <PortableText 
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
                            />
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
    const query = `*[_type == "post" && slug.current == $slug][0] {
        _id,
        id,
        slug{
        current
      },
        mainImage,
        title,
      body
      }`

    let post = await sanityClient.fetch(query, {
        slug: params?.slug
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
      body
      }`

    let blog = await sanityClient.fetch(queryBlog, {
        slug: params?.slug
    })

    if (!blog) {
        blog = false
    }

    const quizInfo = await getData()

    return {
        props: {
            post,
            blog,
            posts,
            quizInfo
        },
        revalidate: 60
    }
}