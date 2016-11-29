/* global describe, it */
var assert = require('assert');
var reactExpressMiddleware = require('../');

// var React = require('react');
// var Enzyme = require('enzyme');
// var shallow = Enzyme.shallow;
// var mount = Enzyme.mount;
// var Chai = require('chai');
// var expect = Chai.expect;
// var TestUtils = require('react-addons-test-utils');
var jsdom = require('jsdom');
// var setup = require('./.setup.js');

var Foo = require('./components/Foo');

// **
// Example usage of Enzyme
// **

// describe('A suite', function () {
// 	it('contains spec with an expectation', function () {
// 		expect(shallow(<Foo />).contains(<div className="foo" />)).to.equal(true);
// 	});
//
// 	it('contains spec with an expectation', function () {
// 		expect(shallow(<Foo />).is('.foo')).to.equal(true);
// 	});
//
// 	it('contains spec with an expectation', function () {
// 		expect(mount(<Foo />).find('.foo').length).to.equal(1);
// 	});
// });

describe('react-express-middleware', function () {
	describe('reactExpressMiddlewareGenerator', function () {
		it('should return a function', function () {
			assert.equal(typeof reactExpressMiddleware(), 'function');
		});
		it('should accept options for template target and key', function () {
			var resRenderArguments;
			var sendArgs = function () { resRenderArguments = arguments; };
			var rem = reactExpressMiddleware({
				template: 'meow',
				key: 'bark',
				serverRenderMethod: JSON.stringify
			});
			var req = {};
			var res = { render: sendArgs };
			var renderReactComponent;
			rem(req, res,
				function () {
					renderReactComponent = res.renderReactComponent;
				}
			);
			renderReactComponent(Foo, {});
			assert.equal(resRenderArguments['0'], 'meow');
			assert(resRenderArguments['1'].bark);
		});
		it('...otherwise should default template -> "index", key -> "content" ', function () {
			var resRenderArguments;
			var sendArgs = function () { resRenderArguments = arguments; };
			var rem = reactExpressMiddleware({
				serverRenderMethod: JSON.stringify
			});
			var req = {};
			var res = { render: sendArgs };
			var renderReactComponent;
			rem(req, res,
				function () {
					renderReactComponent = res.renderReactComponent;
				}
			);
			renderReactComponent(Foo, {});
			assert.equal(resRenderArguments['0'], 'index');
			assert(resRenderArguments['1'].content);
		});
		it('should accept element option targeting DOM object', function () {
			jsdom.env(
				'<div id="app-container">The content</div>',
				function (err, window) {
					if (err) { console.error(err); }
					console.log('window', window);
				}
			);
			// var rem = reactExpressMiddleware({
			// 	element: 'app-container'
			// });
		});
		it('...otherwise should default to targeting document.body', function () {
			// var rem = reactExpressMiddleware();
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
