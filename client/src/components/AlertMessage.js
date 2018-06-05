import React from 'react';

function Alert(props) {
	if (props.type === 'success') {
		return (
			<div className="success-msg">
		  	<i className="fa fa-check"></i>
		  	{ props.msg }
			</div>
		)
	} else if (props.type === 'info') {
		return (
			<div className="info-msg">
		  	<i className="fa fa-info-circle"></i>
		  	{ props.msg }
			</div>
		)
	} else if (props.type === 'warning') {
		return (
			<div className="warning-msg">
		  	<i className="fa fa-warning"></i>
		  	{ props.msg }
			</div>
		)
	} else if (props.type === 'error') {
		return (
			<div className="error-msg">
		  	<i className="fa fa-times-circle"></i>
		  	{ props.msg }
			</div>
		)
	} else {
		return null;
	}
}

export default Alert;
