// 引入手写的Array.prototype.map方法
const originalMap = Array.prototype.map;

// 重置Array.prototype.map为原始方法，以便在测试结束后恢复
afterEach(() => {
  Array.prototype.map = originalMap;
});

describe('Array.prototype.map', () => {
  beforeEach(() => {
    // 重写Array.prototype.map为手写的方法
    Array.prototype.map = function (callBack, thisArg) {
      if (this === null || this === undefined) {
        throw new TypeError('Array.prototype.map called on null or undefined');
      }

      if (typeof callBack !== 'function') {
        throw new TypeError('Callback is not a function');
      }

      const array = Object(this);
      const length = array.length >>> 0;

      const result = new Array(length);

      for (let i = 0; i < length; i++) {
        if (i in array) {
          result[i] = callBack.call(thisArg, array[i], i, array);
        }
      }

      return result;
    };
  });

  test('should return a new array with the results of calling the provided function on every element', () => {
    const array = [1, 2, 3, 4, 5];
    const expectedResult = [2, 4, 6, 8, 10];
    const result = array.map((x) => x * 2);
    expect(result).toEqual(expectedResult);
  });

  test('should handle an empty array', () => {
    const array = [];
    const expectedResult = [];
    const result = array.map((x) => x * 2);
    expect(result).toEqual(expectedResult);
  });

  test('should handle non-array objects', () => {
    const arrayLikeObject = { 0: 1, 1: 2, 2: 3, length: 3 };
    const expectedResult = [2, 4, 6];
    const result = Array.prototype.map.call(arrayLikeObject, (x) => x * 2);
    expect(result).toEqual(expectedResult);
  });

  test('should throw an error if called on null or undefined', () => {
    expect(() => {
      Array.prototype.map.call(null, (x) => x * 2);
    }).toThrow(new TypeError('Array.prototype.map called on null or undefined'));

    expect(() => {
      Array.prototype.map.call(undefined, (x) => x * 2);
    }).toThrow(new TypeError('Array.prototype.map called on null or undefined'));
  });

  test('should throw an error if the callback is not a function', () => {
    const array = [1, 2, 3];
    expect(() => {
      array.map(null);
    }).toThrow(new TypeError('Callback is not a function'));

    expect(() => {
      array.map('not a function');
    }).toThrow(new TypeError('Callback is not a function'));

    expect(() => {
      array.map({});
    }).toThrow(new TypeError('Callback is not a function'));
  });

  test('should pass the correct arguments to the callback', () => {
    const array = [1, 2, 3];
    const results = [];
    array.map((value, index, arr) => {
      results.push([value, index, arr]);
    });

    const expectedResult = [
      [1, 0, [1, 2, 3]],
      [2, 1, [1, 2, 3]],
      [3, 2, [1, 2, 3]]
    ];

    expect(results).toEqual(expectedResult);
  });

  test('should respect the thisArg parameter', () => {
    const array = [1, 2, 3];
    const context = { value: 10 };
    const result = array.map(function (x) {
      return this.value + x;
    }, context);

    const expectedResult = [11, 12, 13];
    expect(result).toEqual(expectedResult);
  });
});