import QuizData from './QuizData'
import getAvg from './GetAverage'

export default function StartQuiz({ url, values } : any) {
    const under = ["plays", "avg. score", "# of Qs"]

    return (
        <div className="bg-black text-center rounded">
            <a href={"https://quizzes.sportsquiz.org/?search=" + url}>
                <button className="bg-white p-3 m-3 uppercase font-header">
                    Start Quiz
                </button>
            </a>
            <QuizData values={[values.plays, parseFloat(getAvg(values.scores).toFixed(2)), values.scores.length - 1]} textColor={true}/>
        </div>
    )
}