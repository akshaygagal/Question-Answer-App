import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router-dom';

class Navbar extends Component {
	render() {
		return (
			<nav className="navbar">
				<ul>
					<li><Link to="/">GILOOL</Link></li>
					<li><Link to="/help">GET HELP</Link></li>
					<li><Link to="/history">HISTORY</Link></li>
					<li><Link to="/autho">LOGIN</Link></li>
					<li><Link to="/profile">PROFILE</Link></li>
				</ul>
			</nav>
		)
	}
}

export default Navbar;
