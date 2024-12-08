/**
 * @param {number[]} nums
 * @return {boolean}
 */
var containsDuplicate = function (nums) {
  const set = new Set()

  for (let i of nums) {
    if (set.has(i)) {
      return true
    } else {
      set.add(i)
    }
  }

  return false
};

const nums1 = [1, 1, 1, 3, 3, 4, 3, 2, 4, 2]
const nums2 = [1, 2, 3, 4]

console.log(containsDuplicate(nums1))
console.log(containsDuplicate(nums2))