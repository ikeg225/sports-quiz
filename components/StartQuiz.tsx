function type(value : number, index : number) {
    if (index === 0) {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    } else if (index === 1) {
        return value + "%"
    } else {
        return value
    }
}

export default function StartQuiz({ url, values } : any) {
    const under = ["plays", "avg. score", "# of Qs"]

    return (
        <div className="bg-black text-center rounded">
            <a href={"https://quizzes.sportsquiz.org/?search=" + url}>
                <button className="bg-white p-3 m-3 uppercase font-header">
                    Start Quiz
                </button>
            </a>
            <div className="flex flex-row mx-auto p-5">
                {[0, 1, 2].map((value : number) => (
                    <div className="flex flex-col mx-auto font-body" key={value}>
                        <h1 className="text-white">
                            {type(values[value], value)}
                        </h1>
                        <h1 className="text-gray-300">{under[value]}</h1>
                    </div>
                ))}
            </div>
        </div>
    )
}