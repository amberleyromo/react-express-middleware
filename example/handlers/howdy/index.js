var React = require('react');
var Container = require('./container.jsx');

module.exports = function howdyHandler (req, res) {
	res.locals.context.example = true;
	res.locals.context.sampleData = {
		hi: 'hello',
		goodbye: 'sad'
	}

	res.renderReactComponent(Container);
}
