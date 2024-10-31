import { describe, it, expect } from "vitest";
import { transformContext } from ".";

describe("context转换", () => {
	describe("非引用类型", () => {
		it("Undefined", () => {
			expect(transformContext(undefined)).toBe(window);
		});
		it("Null", () => {
			expect(transformContext(null)).toBe(window);
		});
		it("Boolean", () => {
			expect(transformContext(true).valueOf()).toBe(true);
			expect(transformContext(false).valueOf()).toBe(false);
		});
		it("number", () => {
			expect(transformContext(1).valueOf()).toBe(1);
			expect(transformContext(1.1).valueOf()).toBe(1.1);
		});
		it("BigInt", () => {
			expect(transformContext(BigInt("10000000000000000")).valueOf()).toBe(
				BigInt("10000000000000000"),
			);
		});
		it("String", () => {
			expect(transformContext("").valueOf()).toBe("");
			expect(transformContext("foo").valueOf()).toBe("foo");
		});
	});

	describe("引用类型", () => {
		it("Object", () => {
			const target = {};
			expect(transformContext(target)).toBe(target);
		});

		it("Array", () => {
			const target = [1, 2];
			expect(transformContext(target)).toBe(target);
		});

		it("Function", () => {
			function simple() {}
			expect(transformContext(simple)).toBe(simple);
			const arrow = () => {};
			expect(transformContext(arrow)).toBe(arrow);
		});

		it("Date", () => {
			const date = new Date();
			expect(transformContext(date)).toBe(date);
		});

		it("RegExp", () => {
			const regExp = /test/;
			expect(transformContext(regExp)).toBe(regExp);
		});

		it("Error", () => {
			const error = new Error();
			expect(transformContext(error)).toBe(error);
		});
	});
});
