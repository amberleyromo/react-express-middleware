/* global describe, it */
var assert = require('assert');

var reactExpressMiddleware = require('../');

describe('React Express Middleware', function () {
	it('should return a function', function () {
		assert.equal(typeof reactExpressMiddleware(), 'function');
	});
});
