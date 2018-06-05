import React, { Component } from 'react';
import Question from './Question.js';
import './App.css';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      msg: ''
    };
  }

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

  async applyQuestion(e, question) {
    console.log(question);
    let res = await fetch('/apply', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      credentials: 'same-origin', // if you not use this then you don't send cookies
      body: JSON.stringify(question)
    });
    let data = await res.json().catch((err)=> { 
      console.log(err.stack)
    });
    let msg = <h1 className={data.type}>{data.msg}</h1>
    this.setState({
      msg: msg
    })
    console.log(data);
  }

  // lifecycle method
  async componentDidMount() {
    let res = await fetch('/get-help');
    let data = await res.json().catch(err => {
      console.log(err.stack)
    })
    console.log(data)
    let questions = data.map(question => {
      return (
        <div className="Question" key={question.createAt}>
          <div className="question-info">
            <h1 className="question-username">{question.user.username}</h1>
            <p className="question-createat">{question.createAt}</p>
          </div>
          <h1 className="Title" onClick={this.onClick}>{question.title}</h1>
          <div className="slide">
            <p className="Text">{question.text}</p>

            <button className="btn" onClick={(e) => this.applyQuestion(e, question)}>Apply</button>
          </div>
        </div>
      )
    });
    this.setState({questions: questions});
  }  

  render() {
    return (
      <div>
        {this.state.msg}
        {this.state.questions}
      </div>
    );
  }
}

export default Home;
