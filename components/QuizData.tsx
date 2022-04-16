function type(value : number, index : number) {
    if (index === 0) {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    } else if (index === 1) {
        return value + "%"
    } else {
        return value
    }
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

export default function QuizData({ values, textColor } : any) {
    const under = ["plays", "avg. score", "# of Qs"]
    const quizInfo = [values["plays"], getAvg(values["scores"]).toFixed(2), values["scores"].length - 1]

    return (
        <div className="flex flex-row mx-auto p-5 text-center">
            {[0, 1, 2].map((value : number) => (
                <div className="flex flex-col mx-auto font-body" key={value}>
                    <h1 className={textColor ? "text-white" : "text-black"}>
                        {type(quizInfo[value], value)}
                    </h1>
                    <h1 className="text-gray-300">{under[value]}</h1>
                </div>
            ))}
        </div>
    )
}