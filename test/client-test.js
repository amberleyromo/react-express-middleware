/* global describe, it */
// var assert = require('assert');
// var React = require('react');
var Enzyme = require('enzyme');
var shallow = Enzyme.shallow;
var MockRes = require('mock-express-response');
var expect = require('chai').expect;

var clientRenderMiddleware = require('../lib/browser.js').default;

var Container = require('./components/Container.js');

describe('-- CLIENT: browser.js', function () {
	it('should render passed Component', function () {
		// 1. Generate middleware with 'shallow' as clientRenderMethod
		var renderMiddleware = clientRenderMiddleware({
			template: 'meow',
			key: 'bark',
			clientRenderMethod: function (Component, target, done) {
				var wrapper = shallow(Component);
				done(wrapper);
			}
		});

		// 2. run reactExpressMiddleware (client)
		var res = new MockRes();
		renderMiddleware({}, res, function () {});

		// 3. test the render
		res.renderReactComponent(Container, {}, function (wrapper) {
			expect(wrapper.html()).to.equal('<div id="app-container"><p>Hi there</p></div>');
		});
	});
});
