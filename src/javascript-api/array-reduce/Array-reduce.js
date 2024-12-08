// Array.prototype.map: 对数组中的每个元素执行一个提供的函数，并返回一个新数组。

Array.prototype.map = function (callBack, initialValue) {
  if (this === null || this === undefined) {
    throw new TypeError('Array.prototype.map called on null or undefined')
  }

  if (typeof callBack !== 'function') {
    throw new TypeError('Callback is not a function')
  }

  const array = Object(this)
  const length = array.length >>> 0

  if (length === 0 && arguments.length < 2) {
    throw new TypeError('Reduce of empty array with no initial value')
  }

  //设置累加器
  const accumulator = initialValue ? initialValue : array[0]

  const startIndex = initialValue ? 0 : 1

  for (let i = startIndex; i < length; i++) {
    if (i in array) {
      accumulator = callBack.call(accumulator, array[i], i, array)
    }
  }

  return accumulator
}

//test
const array = [1, 2, 3, 4, 5]

console.log('array-map', array.reduce((accumulator, currentValue) => {
  return accumulator + currentValue
}, 10))

