/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function (nums) {

  let len = nums.length

  for (let i = 0; i < len; i++) {
    if (nums[i] === 0) {
      nums.splice(i, 1)
      nums.push(0)

      i--
      len--

    }
  }

  return nums
};

const nums1 = [0, 1, 0, 3, 12]
const nums2 = [0, 0, 1]

console.log(moveZeroes(nums1))
console.log(moveZeroes(nums2))