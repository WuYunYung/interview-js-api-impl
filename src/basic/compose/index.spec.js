import { describe, it, expect } from "vitest";
import compos from "./index";

describe("compos function", () => {
	it("should compose two functions correctly", () => {
		const add = (arr) => arr[0] + arr[1];
		const multiply = (result) => result * 2;
		const composed = compos(add, multiply);

		const result = composed(2, 3);
		expect(result).toBe(10); // (2 + 3) * 2 = 10
	});

	it("should compose three functions correctly", () => {
		const add = (arr) => arr[0] + arr[1];
		const multiply = (result) => result * 2;
		const subtract = (result) => result - 5;
		const composed = compos(add, multiply, subtract);

		const result = composed(2, 3);
		expect(result).toBe(5); // ((2 + 3) * 2) - 5 = 5
	});

	it("should handle an empty list of functions", () => {
		const composed = compos();
		const result = composed(2, 3);
		expect(result).toEqual([2, 3]); // No functions, should return original args as array
	});

	it("should correctly compose a function that returns an array", () => {
		const add = (arr) => [arr[0] + arr[1]];
		const multiply = (arr) => arr.map((item) => item * 2);
		const composed = compos(add, multiply);

		const result = composed(2, 3);
		expect(result).toEqual([10]); // [ (2 + 3) * 2 ] = [10]
	});

	it("should pass intermediate results correctly between functions", () => {
		const add = (arr) => arr[0] + arr[1];
		const multiply = (result) => result * 3;
		const divide = (result) => result / 2;
		const composed = compos(add, multiply, divide);

		const result = composed(2, 4);
		expect(result).toBe(9); // ((2 + 4) * 3) / 2 = 9
	});
});
