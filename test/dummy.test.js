import chai from "chai"

const assert = chai.assert
const expect = chai.expect
const should = chai.should

describe("Galaxy", () => {

	beforeEach(() => {
		console.log("Before each")
	})

	beforeEach("Nombre before each", () => {
		console.log("Before each nombrado")
	})

	before("Nombre before", () => {
		console.log("Before")
	})

	describe("Earth", () => {

		it.skip("should be round", () => {
			console.log("tierra")
		})

	})

	describe("Moon", () => {

		it("should be round", () => {
			assert.equal(12, 12);

			expect({"a": 1, "b": 2, "c": 3, "d": {}}).to.be.deep.equal({"a": 1, "b": 2, "c": 3, "d": {}})
		})

		it.skip("should be deep equal", () => {
			// {"a": 1, "b": 2, "c": 3, "d": {}}).should.to.be.deep.equal({"a": 1, "b": 2, "c": 3, "d": {}})
		})

	})

});