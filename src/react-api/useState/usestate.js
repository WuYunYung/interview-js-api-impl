const queue = []
let index = 0

const useState = (initialData) => {
  queue.push(initialData)

  const update = (state) => {
    queue.push(state)
    index++
  }

  return [queue[index], update]
}