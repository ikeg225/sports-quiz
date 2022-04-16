import QuizData from './QuizData'

export default function StartQuiz({ url, values } : any) {
    const under = ["plays", "avg. score", "# of Qs"]

    return (
        <div className="bg-black text-center rounded">
            <a href={"https://quizzes.sportsquiz.org/?search=" + url}>
                <button className="bg-white p-3 m-3 uppercase font-header">
                    Start Quiz
                </button>
            </a>
            <QuizData values={values} textColor={true}/>
        </div>
    )
}