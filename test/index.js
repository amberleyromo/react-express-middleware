/* global describe, it */
var assert = require('assert');
// var path = require('path');
var reactExpressMiddleware = require('../');
// var jsdom = require('jsdom');
// var React = require('react');

// var html = '<body><div id="app-container"><%- content %></div><script>window.context = <%- JSON.stringify(context) %>;</script></body>';
// var template = path.resolve('file://', __dirname, '/template/index.html');

// var simpleComponent = function () {
//   return <h1>Hello, there.</h1>;
// };

describe('react-express-middleware', function () {
	describe('reactExpressMiddlewareGenerator', function () {
		it('should return a function', function () {
			assert.equal(typeof reactExpressMiddleware(), 'function');
		});
		it('should default template target to "index" if not supplied', function () {
			var returnArgs = function (args) {
				return args;
			};
			var rem = reactExpressMiddleware({
				serverRenderMethod: returnArgs
			});
			var req, res;
			// MOCK REQ RES HERE
			var args = rem();
			console.log('args', args);

			// assert.equal(options.template, 'index');
		});
		it('should accept element option targeting DOM object', function () {
			// jsdom.env(html, {
			// 	done: function (err, window) {
			// 		if (err) { console.error(err); }
			// 		var $ = window.$;
			// 		console.log('window', $);
			// 	}
			// });
			// var rem = reactExpressMiddleware({
			// 	element: 'mount'
			// });
			// console.log('rem1', rem);
			//
			// rem(simpleComponent);
			// console.log('rem2', rem);
			// assert.equal(options.element, );
		});
	});
	// describe('res.renderReactComponent', function () {
	// 	it('should accept a container passed in as a variable', function () {
	// 		assert(reactExpressMiddleware);
	// 	});
	// 	it('^...should bootstrap store with contents of res.locals.context when not passed', function () {
	// 		assert(reactExpressMiddleware);
	// 	});
	// 	it('should accept a container passed in as jsx', function () {
	// 		assert(reactExpressMiddleware);
	// 	});
	// 	it('^...should use passed props, not res.locals.context', function () {
	// 		assert(reactExpressMiddleware);
	// 	});
	// 	it('should accept nested jsx', function () {
	// 		assert(reactExpressMiddleware);
	// 	});
	// 	it('should accept a callback passed as the second arg', function () {
	// 		assert(reactExpressMiddleware);
	// 	});
	// 	it('should accept a callback passed as the third arg', function () {
	// 		assert(reactExpressMiddleware);
	// 	});
	// });
});
