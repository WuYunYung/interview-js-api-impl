import { it } from "vitest";
import { describe } from "vitest";
import "./index";
import { expect } from "vitest";

describe("customCall", () => {
	it("mdn example", () => {
		function Product(name, price) {
			this.name = name;
			this.price = price;
		}

		function Food(name, price) {
			Product.customCall(this, name, price);
			this.category = "food";
		}

		expect(new Food("cheese", 5).name).toBe("cheese");
	});

	it("this 指向", () => {
		const foo = {
			name: "foo",
			fn(...args) {
				return [this.name, ...args];
			},
		};

		const bar = { name: "bar" };

		expect(foo.fn.customCall(bar)).toStrictEqual([bar.name]);

		expect(foo.fn.customCall(bar, "a")).toStrictEqual([bar.name, "a"]);

		expect(foo.fn.customCall(bar, "a", "b")).toStrictEqual([
			bar.name,
			"a",
			"b",
		]);
	});
});
