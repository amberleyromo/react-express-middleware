/* global describe, it, beforeEach */
var Enzyme = require('enzyme');
var shallow = Enzyme.shallow;
var MockRes = require('mock-express-response');
var expect = require('chai').expect;
var ejs = require('ejs');

var serverRenderMiddleware = require('../lib/index.js').default;

var Container = require('./components/Container.js');

describe('-- SERVER: index.js', function () {
	var res;
	beforeEach(function () {
		res = new MockRes();
		res.render = ejs.render;
	});

	it('should render passed Component', function () {
		// 1. Generate middleware with 'shallow' as serverRenderMethod
		var renderMiddleware = serverRenderMiddleware({
			template: '<div id="app-container"><%- content %></div>',
			serverRenderMethod: function (Component) {
				var wrapper = shallow(Component);
				expect(wrapper.html()).to.equal('<div><h1>Basic headline.</h1><p>Basic paragraph.</p></div>');
				return wrapper.html();
			}
		});

		// 2. run reactExpressMiddleware (server)
		renderMiddleware({}, res, function () {});

		// 3. render
		res.renderReactComponent(Container, {});
	});

	it('should render Component into template', function () {
		var renderMiddleware = serverRenderMiddleware({
			template: '<div id="app-container"><%- content %></div>',
			serverRenderMethod: function (Component) {
				var wrapper = shallow(Component);
				return wrapper.html();
			}
		});

		renderMiddleware({}, res, function () {});

		var renderedTemplate = res.renderReactComponent(Container, {});
		expect(renderedTemplate).to.equal('<div id="app-container"><div><h1>Basic headline.</h1><p>Basic paragraph.</p></div></div>');
	});

	it('should accept config options for template and template key', function () {
		var renderMiddleware = serverRenderMiddleware({
			template: '<div id="app-container"><%- meow %></div>',
			key: 'meow',
			serverRenderMethod: function (Component) {
				var wrapper = shallow(Component);
				return wrapper.html();
			}
		});

		renderMiddleware({}, res, function () {});

		var renderedTemplate = res.renderReactComponent(Container, {});
		expect(renderedTemplate).to.equal('<div id="app-container"><div><h1>Basic headline.</h1><p>Basic paragraph.</p></div></div>');
	});
});
