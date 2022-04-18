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

    return (
        <div className="flex flex-row mx-auto p-5 text-center">
            {[0, 1, 2].map((value : number) => (
                <div className="flex flex-col mx-auto font-body" key={value}>
                    <h1 className={textColor ? "text-white" : "text-black"}>
                        {type(values[value], value)}
                    </h1>
                    <h1 className="text-gray-300">{under[value]}</h1>
                </div>
            ))}
        </div>
    )
}