import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { getQuestions } from './api/mongo'
import { useState, useEffect } from 'react'

export default function TriviaQuestions({ quizInfo } : any) {
    const [randomQuestion, setRandomQuestion] = useState({
        correct: "",
        desc: "",
        id: -1,
        image: "",
        options: [],
        title: ""
    })
    const [selected, setSelected] = useState("")
    const [none, setNone] = useState(true)
    const [exp, setExp] = useState(false)   
    const [newQ, setNewQ] = useState(0)  

    useEffect(() => {
        setRandomQuestion(quizInfo[Math.floor(Math.random()*quizInfo.length)])
    }, [newQ])

    function selectedOption(event : any) {
        setSelected(event.target.value)
        setNone(false)
    }

    function percentage() {
        let totalSum = 0
        for (let i = 0; i < randomQuestion.options.length; i++) {
            totalSum = totalSum + randomQuestion.options[i][1]
        }

        let percentageOptions : any = {}
        for (let i = 0; i < randomQuestion.options.length; i++) {
            percentageOptions[randomQuestion.options[i][0]] = Math.round((randomQuestion.options[i][1] / totalSum) * 100)
        }
        return percentageOptions
    }
    const perc = exp ? percentage() : [];

    function buttonClass(option : any) {
        if (exp) {
            if (option === randomQuestion.correct) {
                return "selected active correct"
            } else if (option === selected) {
                return "selected wrong"
            } else {
                return "selected unselected"
            }
        } else {
            if (option === selected) {
                return "selected active"
            }
        }
        return "selected"
    }

    function submitAnswer(event : any) {
        event.preventDefault()
        setNone(false)
        setExp(true)
    }

    function nextQuestion() {
        setExp(false)
        setSelected("")
        setNone(true)
        setNewQ(1 - newQ)
    }

    return (
        <div className="max-w-7xl mx-auto">
            <div className="md:mx-5">
                <Head>
                <title>Trivia Questions</title>
                <link rel="icon" href="/images/favicon.ico" />
                <link
                    rel="preload"
                    href="/fonts/Oswald-Bold.ttf"
                    as="font"
                    crossOrigin=""
                    />
                <meta name="title" key="title" content="Sports Quiz - Trivia Questions" />
                <meta name="description" key="description" content="Sports Quiz. The trivia questions page has a new sports related question every page reload! Come on in and test your knowledge!" />
                <meta property="og:url" content="sportsquiz.org/trivia-questions" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Sports Quiz - Trivia Questions" />
                <meta name="twitter:card" content="summary" />
                <meta property="og:description" content="Sports Quiz. The trivia questions page has a new sports related question every page reload! Come on in and test your knowledge!" />
                <meta property="og:image" content={"/images/Sports-Quiz-Preview.webp"} />
                </Head>
                <Header />
                <main className="flex flex-col items-center">
                    <h1 className="text-2xl md:text-3xl font-header text-center p-5 uppercase">
                        Trivia Questions
                    </h1>
                    <div className={exp ? "bg-black text-center w-10/12 md:w-2/3 rounded-lg pb-10" : "bg-black text-center w-10/12 md:w-2/3 rounded-lg"}>
                        <h1 className="text-2xl font-body text-white py-10 px-5 md:px-10">
                            {randomQuestion.title}
                        </h1>
                        <form onSubmit={submitAnswer}>
                            <div className="question font-body">
                                <div className="options">
                                    {randomQuestion.options.map(option => 
                                        <label key={randomQuestion.title + option[0]} className={buttonClass(option[0])} style={{width: perc[option[0]] + "%"}}>
                                            <input type="radio" name="question" value={option[0]}
                                            onClick={selectedOption} disabled={exp ? true : false}/> 
                                            {option[0]}
                                        </label>
                                    )}
                                </div>
                            </div>
                            <button className={none ? "next" : (exp ? "none" : "next active")} type="submit">Submit</button>
                        </form>
                        <div className="nextQuestion">
                            <button className={exp ? "next active" : "none"} onClick={nextQuestion}>Next</button>
                        </div>
                        {randomQuestion.desc.length !== 0 && <div className={exp ? "explain active" : "explain"}>
                            <h2 className="explainHeader text-white p-5">Explanation:</h2>
                            <h2 className="explainContent text-white text-left px-5 md:px-10" dangerouslySetInnerHTML={{ __html:  randomQuestion.desc }} />
                        </div>}
                    </div>
                </main>
                <Footer />
            </div>
        </div>
    )
}

export const getServerSideProps = async () => {  
    const quizInfo = await getQuestions()
  
    return {
      props: {
        quizInfo
      },
    };
  };