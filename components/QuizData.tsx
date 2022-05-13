function type(value : number, index : number) {
    if (index === 0) {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    } else if (index === 1) {
        return value + "%"
    } else {
        return value
    }
}

export default function QuizData({ values, textColor } : any) {
    const under = ["plays", "avg. score", "# of Qs"]

    console.log(values)

    return (
        <div className="flex flex-row mx-auto p-5 text-center">
            <div className="flex flex-col mx-auto font-body" key={0}>
                <h1 className={textColor ? "text-white" : "text-black"}>
                    {type(values[0], 0)}
                </h1>
                <h1 className="text-gray-300">{under[0]}</h1>
            </div>
            {values[1] !== 0 && values[1] && <div className="flex flex-col mx-auto font-body" key={1}>
                <h1 className={textColor ? "text-white" : "text-black"}>
                    {type(values[1], 1)}
                </h1>
                <h1 className="text-gray-300">{under[1]}</h1>
            </div>}
            <div className="flex flex-col mx-auto font-body" key={2}>
                <h1 className={textColor ? "text-white" : "text-black"}>
                    {type(values[2], 2)}
                </h1>
                <h1 className="text-gray-300">{under[2]}</h1>
            </div>
        </div>
    )
}