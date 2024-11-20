import { describe, it, expect } from "vitest";
import myInstanceof from "./index";

describe("手写 instanceof 测试", () => {
	// 基本类型检查
	it("should return true for instance of Object", () => {
		const obj = {};
		expect(myInstanceof(obj, Object)).toBe(true);
	});

	it("should return false for instance of Array", () => {
		const obj = {};
		expect(myInstanceof(obj, Array)).toBe(false);
	});

	it("should return false for instance of Function", () => {
		const obj = {};
		expect(myInstanceof(obj, Function)).toBe(false);
	});

	it("should return true for instance of Function", () => {
		// biome-ignore lint/complexity/useArrowFunction: <explanation>
		const fn = function () {};
		expect(myInstanceof(fn, Function)).toBe(true);
	});

	it("should return true for instance of Array", () => {
		const arr = [];
		expect(myInstanceof(arr, Array)).toBe(true);
	});

	// 继承关系
	it("should return true for instance of derived class", () => {
		class Animal {}
		class Dog extends Animal {}
		const dog = new Dog();
		expect(myInstanceof(dog, Dog)).toBe(true);
		expect(myInstanceof(dog, Animal)).toBe(true);
	});

	it("should return false for instance of unrelated class", () => {
		class Animal {}
		class Dog extends Animal {}
		const dog = new Dog();
		class Cat {}
		const cat = new Cat();
		expect(myInstanceof(dog, Cat)).toBe(false);
	});

	// 原型链测试
	it("should return true when object is created from constructor", () => {
		function Person(name) {
			this.name = name;
		}
		const person = new Person("Alice");
		expect(myInstanceof(person, Person)).toBe(true);
	});

	it("should return true when object is created from prototype constructor", () => {
		function Person(name) {
			this.name = name;
		}
		const person = new Person("Bob");
		expect(myInstanceof(person, Object)).toBe(true);
	});

	// 测试 null 和 undefined
	it("should return false for null", () => {
		expect(myInstanceof(null, Object)).toBe(false);
	});

	it("should return false for undefined", () => {
		expect(myInstanceof(undefined, Object)).toBe(false);
	});

	// 构造函数的检查
	it("should return true if object is an instance of constructor directly", () => {
		function Shape() {}
		const shape = new Shape();
		expect(shape.constructor === Shape).toBe(true);
		expect(myInstanceof(shape, Shape)).toBe(true);
	});

	// 跨原型链检查
	it("should return false when checking against a different constructor prototype chain", () => {
		function Car() {}
		function Bike() {}
		const bike = new Bike();
		expect(myInstanceof(bike, Car)).toBe(false); // Bike 和 Car 没有继承关系
	});

	// 处理非引用类型作为构造函数时应该抛出错误
	it("should throw an error when constructor is not a function", () => {
		const obj = {};
		expect(() => myInstanceof(obj, 123)).toThrowError(TypeError); // 123 不是构造函数
		expect(() => myInstanceof(obj, "string")).toThrowError(TypeError); // 'string' 不是构造函数
		expect(() => myInstanceof(obj, null)).toThrowError(TypeError); // null 不是构造函数
	});
});
