import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Daily() {
    return (
        <div className="max-w-7xl mx-auto">
            <div className="md:mx-5">
                <Head>
                <title>Daily Question</title>
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
                    <h1>Daily</h1>
                </main>
                <Footer />
            </div>
        </div>
    )
}