/**
* @param {string} s
* @return {boolean}
*/
var isValid = function (s) {
  const stack = new Array()

  for (let i = 0; i < s.length; i++) {

    if (i === 0) {
      stack.push(s[i])
    } else {
      if (stack[stack.length - 1] === '(') {
        if (s[i] === ')') {
          stack.pop()
        } else {
          stack.push(s[i])
        }
      } else if (stack[stack.length - 1] === '[') {
        if (s[i] === ']') {
          stack.pop()
        } else {
          stack.push(s[i])
        }
      } else if (stack[stack.length - 1] === '{') {
        if (s[i] === '}') {
          stack.pop()
        } else {
          stack.push(s[i])
        }
      } else {
        stack.push(s[i])
      }
    }

    console.log(stack)
  }

  if (stack.length > 0) {
    return false
  }

  return true
};

const s1 = "([])"
const s2 = "(]"

console.log(isValid(s1))
// console.log(isValid(s2))