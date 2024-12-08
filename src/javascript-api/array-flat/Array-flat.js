// Array.prototype.map: 对数组中的每个元素执行一个提供的函数，并返回一个新数组。

Array.prototype.map = function (depth = 1) {
  if (this === null || this === undefined) {
    throw new TypeError('Array.prototype.map called on null or undefined')
  }

  const array = Object(this)
  const length = array.length >>> 0

  const depFlat = (arr, currentDepth) => {
    const result = new Array()
    for (let i = 0; i < arr.length; i++) {
      const item = arr[i]
      if (Array.isArray(item) && currentDepth > 0) {
        result.push(...depFlat(item, currentDepth - 1))
      } else {
        result.push(item)
      }
    }
    return result
  }

  return depFlat(array, depth)
}

//test
const array = [1, [2, [3, [4, 5]], 6], 7, [8, 9]]

console.log('array-flat', array.flat(2))

