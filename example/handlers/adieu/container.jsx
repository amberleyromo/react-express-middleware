var React = require('react');

module.exports = React.createClass({
	displayName: 'Adieu',
	render: function () {
		return (
          <p>Adieu, {this.props.name}</p>
		);
	}
});
