import React, { Component } from 'react';
import './Autho.css';

class Signup extends Component {
	constructor() {
		super();
		this.state = {
			msg: '',
			username: '',
			number: '',
			password: ''
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value.replace(/(^\s+|\s{2,9})/g, '')
		});
	}

	async handleSubmit(e, status) {
		e.preventDefault();
		let res = await fetch('/signup', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
      	username: this.state.username,
      	number: this.state.number,
      	password: this.state.password
      })
    });
    let data = await res.json().catch(err => {
    	console.log(err.stack)
    })
    console.log(data)
    this.setState({
    	username: '',
			number: '',
			password: '',
			msg: data.msg
    })
	}

	render() {
		return (
			<div style={this.props.style}>
				{this.state.msg && <h2 className="alert-message">{ this.state.msg }</h2>}
				<form onSubmit={this.handleSubmit}>
					<input onChange={this.handleChange} value={this.state.username} name="username" type="text" placeholder="User Name" required />
					<input onChange={this.handleChange} value={this.state.number} name="number" type="number" placeholder="Phone Number" required />
					<input onChange={this.handleChange} value={this.state.password} name="password" type="password" placeholder="Password" required />
					<button type="submit" className="btn">Sign Up</button>
				</form>
			</div>
		)
	}
}

export default Signup;
