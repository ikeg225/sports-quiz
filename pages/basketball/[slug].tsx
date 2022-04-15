import { sanityClient, urlFor } from "../../sanity"
import Head from 'next/head'
import Header from "../../components/Header"
import { Post } from '../../typings'
import { GetStaticProps } from "next"
import Image from 'next/image'
import PortableText from "react-portable-text"
import StartQuiz from "../../components/StartQuiz"
import Footer from '../../components/Footer'
import { getData } from '../api/mongo'
import SideBar from '../../components/SideBar'

interface Props {
    post: Post;
    quizInfo: any;
}

const average = (array : number[], length : number) => array.reduce((a, b) => a + b) / length;
const getAvg = (array : number[]) => {
  let newArr : number[] = []
  let summ = 0
  array.forEach((x, i) => {
    summ += x
    newArr.push(x * i)
  })
  return (average(newArr, summ) / (array.length - 1)) * 100
}

function Post({ post, quizInfo }: Props) {
    let id = post.id
    let plays = quizInfo[id]["plays"]
    let avgScore = getAvg(quizInfo[id]["scores"]).toFixed(2)
    let lenQuiz = quizInfo[id]["scores"].length - 1

    return (
        <div className="max-w-7xl mx-auto h-full">
            <div className="md:mx-5 h-full" id="outer-container">
                <Head>
                <title>Sports Quiz</title>
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
                    <div className="w-full md:w-8/12">
                        <Image 
                            className="cursor-pointer"
                            src={urlFor(post.mainImage).url()}
                            alt={post.title}
                            height={675}
                            width={1200}
                        />
                        <div className="m-5 md:m-0">
                            <h1 className="text-2xl my-5 font-header uppercase text-center md:text-left">
                                {post.title}
                            </h1>
                            <StartQuiz url={id} values={[plays, avgScore, lenQuiz]} />
                            <PortableText 
                                className=""
                                dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
                                projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
                                content={post.body}
                                serializers={{
                                    h2: (props: any) => (
                                        <h1 className="text-xl my-3 font-header uppercase" {...props} />
                                    ),
                                    li: ({ children } : any) => (
                                        <li className="lml-4 ist-disc">{children}</li>
                                    ),
                                    link: ({ href, children }: any) => (
                                        <a href={href} className="text-blue-500">
                                            {children}
                                        </a>
                                    )
                                }}
                            />
                        </div>
                    </div>
                    <div>
                        <SideBar />
                    </div>
                </main>
                <Footer />
            </div>
        </div>
    )
}

export default Post;

export const getStaticPaths = async () => {
    const query = `*[_type == "post"] {
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

    const post = await sanityClient.fetch(query, {
        slug: params?.slug
    })

    if (!post) {
        return {
            notFound: true
        }
    }

    const quizInfo = await getData()

    return {
        props: {
            post,
            quizInfo
        },
        revalidate: 60
    }
}