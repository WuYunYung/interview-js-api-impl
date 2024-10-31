import { describe, expect, it } from "vitest";
import "./index";

describe("customCall", () => {
	it("mdn example", () => {
		const numbers = [5, 6, 2, 3, 7];

		const max = Math.max.customApply(null, numbers);

		expect(max).toBe(7);

		const min = Math.min.customApply(null, numbers);

		expect(min).toBe(2);
	});

	it("this 指向", () => {
		const foo = {
			name: "foo",
			fn(...args) {
				return [this.name, ...args];
			},
		};

		const bar = { name: "bar" };

		expect(foo.fn.customApply(bar)).toStrictEqual([bar.name]);

		expect(foo.fn.customApply(bar, ["a"])).toStrictEqual([bar.name, "a"]);

		expect(foo.fn.customApply(bar, ["a", "b"])).toStrictEqual([
			bar.name,
			"a",
			"b",
		]);
	});

	it("context 异常", () => {
		const foo = {
			fn() {
				return this;
			},
		};

		expect(foo.fn.customApply(null)).toBe(window);

		expect(foo.fn.customApply(undefined)).toBe(window);

		expect(foo.fn.customApply("").valueOf()).toBe("");

		expect(foo.fn.customApply(1).valueOf()).toBe(1);

		expect(foo.fn.customApply(true).valueOf()).toBe(true);
	});
});
