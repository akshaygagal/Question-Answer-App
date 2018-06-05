import React, { Component } from 'react';

class History extends Component {
	constructor() {
		super()
		this.state = {
			getHelp: '',
			postHelp: '',
			msg: ''
		}
	}

	// onClick method
	onClick(e)  {
		console.log(e.target);
		var text = e.target.nextElementSibling;
		e.target.classList.toggle('active')
		if (text.style.maxHeight){
		  text.style.maxHeight = null;
		} else {
		  text.style.maxHeight = text.scrollHeight + "px";
		}
	}

	// use async + await ES7 feturer
	async componentDidMount() {
		let res = await fetch('/profile', {
			credentials: 'same-origin' // if you not use this then you don't send cookies
		});

		let data = await res.json().catch((err) => {
			console.log(err.stack);
		});

		if (data.body === null) {
			let msg = <h1 className={data.type}>{data.msg}</h1>
			this.setState({
				getHelp: null,
				postHelp: null,
				msg: msg
			});
		} else {
			console.log(data.body)
			let getHelp = data.body.getHelp.map((question, i) => {
				return (
					<div className="Question" key={i}>
						<div className="question-info">
							<h1 className="question-username">{data.body.username}</h1>
							<p className="question-createat">{question.createAt}</p>
						</div>
						<h1 className="Title" onClick={this.onClick}>{question.title}</h1>
						<div className="slide">
							<p className="Text">{question.text}</p>
							<div className="comments">
								{question.comments.map((comment, i) => {
									return <p key={i} className="comment">{comment}</p>
								})}
							</div>
						</div>
					</div>
				);
			});
			let postHelp = data.body.postHelp.map((question, i) => {
				return (
					<div className="Question" key={i}>
						<div className="question-info">
							<h1 className="question-username">{question.user.username}</h1>
							<h1 className="user-number">{question.user.number}</h1>
							<p className="question-createat">{question.createAt}</p>
						</div>
						<h1 className="Title" onClick={this.onClick}>{question.title}</h1>
						<div className="slide">
							<p className="Text">{question.text}</p>
						</div>
					</div>
				);
			});
			// let msg = <h1 className={data.type}>{data.msg}</h1>
			this.setState({
				getHelp: getHelp,
				postHelp: postHelp,
				msg: null
			});
		}
	}

	render() {
		return (
			// user's profile
			<div>
				{this.state.msg}
				<div className="user-question">
					<div className="get-help">				
						{this.state.getHelp}
					</div>
					<div className="post-help">
						{this.state.postHelp}
					</div>
				</div>
			</div>	
		)
	}
}

export default History;
