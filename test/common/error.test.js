"use strict";

const assert = require("assert");
const BaseError = require("../../app/common/error").BaseError;

function doSomethingBad() {
  throw new BaseError("It went bad!", 400);
}

describe("BaseError", function() {
  describe("#doSomethingBad()", function() {
    it("should throw BaseError when we invoke doSomethingBad()", function() {
      try {
        doSomethingBad();
      } catch (err) {
        // The name property should be set to the error's name
        assert((err.name = "BaseError"));

        // The error should be an instance of its class
        assert(err instanceof BaseError);

        // The error should be an instance of builtin Error
        assert(err instanceof Error);

        // The error should be recognized by Node.js' util#isError
        assert(require("util").isError(err));

        // The error should have recorded a stack
        assert(err.stack);

        // toString should return the default error message formatting
        assert.strictEqual(err.toString(), "BaseError: It went bad!");

        // The stack should start with the default error message formatting
        assert.strictEqual(err.stack.split("\n")[0], "BaseError: It went bad!");

        // The first stack frame should be the function where the error was thrown.
        assert.strictEqual(
          err.stack.split("\n")[1].indexOf("doSomethingBad"),
          7
        );

        // The extra property should have been set
        assert.strictEqual(err.extra, 400);
      }
    });
  });
});

describe("Array", function() {
  describe("#indexOf()", function() {
    it("should return -1 when the value is not present", function() {
      assert.equal(-1, [1, 2, 3].indexOf(4));
    });
  });
});
