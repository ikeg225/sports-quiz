const average = (array : number[], length : number) => array.reduce((a, b) => a + b) / length;

export default (array : number[]) => {
  let newArr : number[] = []
  let summ = 0
  array.forEach((x, i) => {
    summ += x
    newArr.push(x * i)
  })
  return (average(newArr, summ) / (array.length - 1)) * 100
}