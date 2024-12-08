// Array.prototype.map: 对数组中的每个元素执行一个提供的函数，并返回一个新数组。

Array.prototype.map = function (callBack, thisArg) {
  if (this === null || this === undefined) {
    throw new TypeError('Array.prototype.map called on null or undefined')
  }

  if (typeof callBack !== 'function') {
    throw new TypeError('Callback is not a function')
  }

  const array = Object(this)
  const length = array.length >>> 0

  const result = new Array(length)

  for (let i = 0; i < length; i++) {
    if (i in array) {
      callBack.call(thisArg, array[i], i, array)
    }
  }

}

//test
const array = [1, 2, 3, 4]

array.forEach((x, index) => {
  console.log(x + index * x)
})

console.log('array-map', array)
