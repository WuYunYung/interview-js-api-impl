/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortedSquares = function (nums) {
  nums.forEach((e, index) => {
    nums.splice(index, 1, e * e)
  })

  nums.sort((a, b) => (a - b))

  return nums
};

const nums1 = [-4, -1, 0, 3, 10]

console.log(sortedSquares(nums1))