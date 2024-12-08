/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function (nums) {

  let count = 1
  let majority = nums[0]

  for (let i in nums) {

    if (count === 0) {
      majority = nums[i]
    }

    if (nums[i] === majority) {
      count++
    } else {
      count--

      if (count === 0) {
        majority = nums[i]
        count++
      }
    }
  }

  return majority
};

const nums1 = [6, 5, 5]
const nums2 = [10, 9, 9, 9, 10]

console.log(majorityElement(nums1))
console.log(majorityElement(nums2))