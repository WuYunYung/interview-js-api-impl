

Function.prototype.customBind = function (context, ...args) {
  const fn = this

  return function (...innerArgs) {
    return fn.apply(context, [...args, ...innerArgs])
  }
}