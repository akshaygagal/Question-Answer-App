import React, { Component } from 'react';
// import Alert from './AlertMessage.js'
import Login from './Login';
import Signup from './Signup'; 
import './App.css';

class Autho extends Component {
	constructor() {
		super();
		this.state = {
			signup: {
				display: 'block'
			},
			login: {
				display: 'none'
			}
		};

		// this.handleSubmit = this.handleSubmit.bind(this);
		// this.handleChange = this.handleChange.bind(this);
	}

	onStyle(e, status) {
		if (status === 'signup') {
			this.setState({
				signup: { display: 'block' },
				login: { display: 'none' }
			})
		} else {
			this.setState({
				signup: { display: 'none' },
				login: { display: 'block' }
			})
		}
	}

	render() {
		return (
			<div className="registration">
				<p onClick={(e) => this.onStyle(e, 'signup')}>Signup</p>
				<p onClick={(e) => this.onStyle(e, 'login')}>Login</p>
				<Login style={this.state.login} />
				<Signup style={this.state.signup} />
			</div>
		)
	}
}

export default Autho;
