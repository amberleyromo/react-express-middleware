/* global describe, it, beforeEach */
var Enzyme = require('enzyme');
var shallow = Enzyme.shallow;
var MockRes = require('mock-express-response');
var expect = require('chai').expect;

var clientRenderMiddleware = require('../lib/browser.js').default;

var Container = require('./components/Container.js');

describe('-- CLIENT: browser.js', function () {
	var res;
	beforeEach(function () {
		res = new MockRes();
	});

	it('should render passed Component', function () {
		// 1. Generate middleware with 'shallow' as clientRenderMethod
		var renderMiddleware = clientRenderMiddleware({
			clientRenderMethod: function (Component, target, done) {
				var wrapper = shallow(Component);
				done(wrapper);
			}
		});

		// 2. run reactExpressMiddleware (client)
		renderMiddleware({}, res, function () {});

		// 3. test the render
		res.renderReactComponent(Container, {}, function (wrapper) {
			expect(wrapper.html()).to.equal('<div><h1>Basic headline.</h1><p>Basic paragraph.</p></div>');
		});
	});
});
