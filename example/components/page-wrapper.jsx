var React = require('react');

module.exports = React.createClass({
	displayName: 'PageWrapper',
	render: function () {
		return (
			<div className="page-wrapper">
				<header>
					<p>Header info and such</p>
				</header>
				{this.props.children}
				<footer>
					<p>Footer info and such.</p>
				</footer>
			</div>
		);
	}
});
