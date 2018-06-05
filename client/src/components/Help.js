import React, { Component } from 'react';
import Alert from './AlertMessage.js'
import './App.css';

class Question extends Component {
	constructor() {
    super();
    this.state = {
      type: '',
      msg: '',
      title: '',
      text: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onClick(e) {
    console.log(e.target);
    var text = e.target.nextElementSibling;
    e.target.classList.toggle('active')
    if (text.style.maxHeight){
      text.style.maxHeight = null;
    } else {
      text.style.maxHeight = text.scrollHeight + "px";
    }
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  async handleSubmit(e) {
    e.preventDefault();
    let res = await fetch('/get-help', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      credentials: 'same-origin', // if you not use this then you don't send cookies
      body: JSON.stringify({title:this.state.title, text:this.state.text})
    });
    let data = await res.json().catch((err)=> { 
      console.log(err.stack)
    });
    console.log(data);
    this.setState({
      type: data.type,
      msg: data.msg
    })
  }

  render() {
    let al = this.state.title || this.state.text ? "Question" : "Notice";
    return (
      <div>
        <Alert type={this.state.type} msg={this.state.msg} />
      	<form onSubmit={this.handleSubmit}>
	        <input type="text" name="title" value={this.state.title} onChange={this.handleChange} placeholder="title"/>
	        <input type="text" name="text" value={this.state.text} onChange={this.handleChange} placeholder="text"/>
	        <button type="submit" className="btn">Submit</button>
      	</form>
        <div className={al}>
          <h1 className="Title" onClick={this.onClick}>{this.state.title}</h1>
          <p className="Text">{this.state.text}</p>
        </div>
      </div>
    );
  }
}

export default Question;