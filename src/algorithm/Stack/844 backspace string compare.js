/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var backspaceCompare = function (s, t) {
  const stack1 = new Array()
  const stack2 = new Array()

  for (let i of s) {
    if (i === '#') {
      stack1.pop()
    } else {
      stack1.push(i)
    }
  }

  for (let i of t) {
    if (i === '#') {
      stack2.pop()
    } else {
      stack2.push(i)
    }
  }

  return stack1.toString() === stack2.toString()
};

const s = "ab#c", t = "ad#c"
console.log(backspaceCompare(s, t))