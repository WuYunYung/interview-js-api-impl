import { describe, it, expect } from "vitest";

// 假设你有一个 `deepEqual` 函数来执行深比较
import deepEqual from "./index";

describe("deepEqual", () => {
	// 1. 原始类型比较
	it("should compare primitive values correctly", () => {
		expect(deepEqual(1, 1)).toBe(true);
		expect(deepEqual(1, "1")).toBe(false);
		expect(deepEqual(true, false)).toBe(false);
		expect(deepEqual("string", "string")).toBe(true);
		expect(deepEqual(undefined, undefined)).toBe(true);
		expect(deepEqual(null, null)).toBe(true);
		expect(deepEqual(Number.NaN, Number.NaN)).toBe(true); // NaN should be equal to NaN
	});

	// 2. 对象类型比较
	it("should compare objects correctly", () => {
		const obj1 = { a: 1, b: { x: 2, y: 3 } };
		const obj2 = { a: 1, b: { x: 2, y: 3 } };
		const obj3 = { a: 1, b: { x: 2, y: 4 } };
		const obj4 = { a: 1, b: { x: 2 } };

		expect(deepEqual(obj1, obj2)).toBe(true);
		expect(deepEqual(obj1, obj3)).toBe(false);
		expect(deepEqual(obj1, obj4)).toBe(false);
		expect(deepEqual(obj1, { a: 1 })).toBe(false);
	});

	// 3. 数组比较
	it("should compare arrays correctly", () => {
		const arr1 = [1, 2, 3];
		const arr2 = [1, 2, 3];
		const arr3 = [1, 2, 4];
		const arr4 = [1, 2, 3, 4];

		expect(deepEqual(arr1, arr2)).toBe(true);
		expect(deepEqual(arr1, arr3)).toBe(false);
		expect(deepEqual(arr1, arr4)).toBe(false);
		expect(deepEqual([], [])).toBe(true); // empty arrays are equal
	});

	// 4. Date对象比较
	it("should compare Date objects correctly", () => {
		const date1 = new Date("2023-01-01");
		const date2 = new Date("2023-01-01");
		const date3 = new Date("2024-01-01");

		expect(deepEqual(date1, date2)).toBe(true);
		expect(deepEqual(date1, date3)).toBe(false);
	});

	// 5. RegExp对象比较
	it("should compare RegExp objects correctly", () => {
		const regex1 = /abc/i;
		const regex2 = /abc/i;
		const regex3 = /abc/g;

		expect(deepEqual(regex1, regex2)).toBe(true);
		expect(deepEqual(regex1, regex3)).toBe(false);
	});

	// 6. Function对象比较
	it("should compare Function objects correctly", () => {
		const func1 = () => {};
		const func2 = () => {};
		const func3 = func1;

		expect(deepEqual(func1, func2)).toBe(false); // Different function references
		expect(deepEqual(func1, func3)).toBe(true); // Same function reference
	});

	// 7. Symbol比较
	it("should compare Symbol objects correctly", () => {
		const sym1 = Symbol("description");
		const sym2 = Symbol("description");
		const sym3 = sym1;

		expect(deepEqual(sym1, sym2)).toBe(false); // Symbols are unique
		expect(deepEqual(sym1, sym3)).toBe(true); // Same symbol reference
	});

	// 8. BigInt比较
	it("should compare BigInt objects correctly", () => {
		const bigInt1 = BigInt(123);
		const bigInt2 = BigInt(123);
		const bigInt3 = BigInt(456);

		expect(deepEqual(bigInt1, bigInt2)).toBe(true);
		expect(deepEqual(bigInt1, bigInt3)).toBe(false);
	});

	// 9. null与undefined比较
	it("should compare null and undefined correctly", () => {
		expect(deepEqual(null, undefined)).toBe(false);
		expect(deepEqual(null, null)).toBe(true);
		expect(deepEqual(undefined, undefined)).toBe(true);
	});

	// 10. NaN比较
	it("should compare NaN correctly", () => {
		const nan1 = Number.NaN;
		const nan2 = Number.NaN;
		const num = 1;

		expect(deepEqual(nan1, nan2)).toBe(true); // NaN should be equal to NaN
		expect(deepEqual(nan1, num)).toBe(false); // NaN is not equal to a number
		expect(deepEqual(num, nan2)).toBe(false); // A number is not equal to NaN
	});

	// 11. 循环引用比较
	it("should handle circular references correctly", () => {
		const obj1 = { a: 1 };
		obj1.self = obj1; // obj1 has a circular reference

		const obj2 = { a: 1 };
		obj2.self = obj2; // obj2 has a circular reference

		expect(deepEqual(obj1, obj2)).toBe(true);

		const obj3 = { a: 1 };
		obj3.self = obj1; // obj3 references obj1
		expect(deepEqual(obj1, obj3)).toBe(false);
	});

	// 12. 对象的原型链
	it("should not consider prototype chain in comparison", () => {
		const obj1 = Object.create({ a: 1 });
		obj1.b = 2;

		const obj2 = { b: 2 };

		expect(deepEqual(obj1, obj2)).toBe(true); // obj1 has prototype chain, obj2 does not
	});

	// 13. Map对象比较
	it("should compare Map objects correctly", () => {
		const map1 = new Map([
			["a", 1],
			["b", 2],
		]);
		const map2 = new Map([
			["a", 1],
			["b", 2],
		]);
		const map3 = new Map([["a", 1]]);

		expect(deepEqual(map1, map2)).toBe(true);
		expect(deepEqual(map1, map3)).toBe(false);
	});

	// 14. Set对象比较
	it("should compare Set objects correctly", () => {
		const set1 = new Set([1, 2, 3]);
		const set2 = new Set([1, 2, 3]);
		const set3 = new Set([1, 2]);

		expect(deepEqual(set1, set2)).toBe(true);
		expect(deepEqual(set1, set3)).toBe(false);
	});
});
