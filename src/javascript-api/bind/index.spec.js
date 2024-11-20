import { describe, expect, it } from "vitest";
import "./index";

describe("customBind", () => {
	it("mdn example", () => {
		const module = {
			x: 42,
			getX: function () {
				return this?.x;
			},
		};

		const unboundGetX = module.getX;
		expect(unboundGetX()).toBe(undefined);

		const boundGetX = unboundGetX.customBind(module);
		expect(boundGetX()).toBe(module.x);
	});

	const foo = {
		a: "b",
		c(...args) {
			return [this.a, ...args];
		},
	};

	const bar = {
		a: "bb",
	};

	const binded = foo.c.customBind(bar);

	it("是否为函数", () => {
		expect(binded).toBeTypeOf("function");
	});

	it("this 指向", () => {
		expect(binded()).toStrictEqual([bar.a]);
	});

	it("参数传递", () => {
		expect(binded("a")).toStrictEqual([bar.a, "a"]);

		expect(binded("b", "c")).toStrictEqual([bar.a, "b", "c"]);
	});
});
