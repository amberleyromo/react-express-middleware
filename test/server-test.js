/* global describe, it */
// var assert = require('assert');
// var React = require('react');
var Enzyme = require('enzyme');
var shallow = Enzyme.shallow;
var MockRes = require('mock-express-response');
var expect = require('chai').expect;
var ejs = require('ejs');

var serverRenderMiddleware = require('../lib/index.js').default;

var Container = require('./components/Container.js');

describe('-- SERVER: index.js', function () {
	it('should render passed Component', function () {
		// 1. Generate middleware with 'shallow' as serverRenderMethod
		var renderMiddleware = serverRenderMiddleware({
			template: '<div id="app-container"><%- content %></div>',
			key: 'content',
			serverRenderMethod: function (Component) {
				var wrapper = shallow(Component);
				expect(wrapper.html()).to.equal('<div id="app-container"><p>Hi there</p></div>');
			}
		});

		// 2. run reactExpressMiddleware (server)
		// -- replace res.render with ejs.render
		var res = new MockRes();
		res.render = ejs.render;
		renderMiddleware({}, res, function () {});

		// 3. test the render
		res.renderReactComponent(Container, {});
	});
});
