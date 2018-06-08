import React, { Component } from 'react';
import styled from 'styled-components';
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
    const Question = styled.div`
      border: 1px solid #eee;
    `
    const Info = styled.li`
      display: inline-block;
      margin-left: 10px;    
    `;

    const Image = styled.img`
      width: 40px;
      border-radius: 40px;
      border: 2px solid red;
    `;

    const Name = styled.h1`
      font-size: 18px;     
    `;

    const Date = styled.p`
      font-size: 15px;
      margin-top: -10px;
    `;

    const Title = styled.h1`
      font-size: 20px;
      margin: 0 0 10px 40px;
    `;

    const Text = styled.p`
      margin: 0 0 10px 40px;
    `;

    let res = await fetch('/get-help');
    let data = await res.json().catch(err => {
      console.log(err.stack)
    })
    console.log(data)
    let questions = data.map((question, i) => {
      return (
        <Question key={i}>
          <Info>
            <Image src={`./images/${question.user.username.split(' ').join('')}.jpg`} alt={question.user.username} />
          </Info>
          <Info>
            <Name>
              {question.user.username}
            </Name>
            <Date>
              {question.createAt}
            </Date>
          </Info>
          <Title>
            {question.title}
          </Title>
          <Text>
            {question.text.slice(0, 30)}
          </Text>
          {/* <h1 className="Title" onClick={this.onClick}>{question.title}</h1>
          <div className="slide">
            <p className="Text">{question.text}</p>

            <button className="btn" onClick={(e) => this.applyQuestion(e, question)}>Apply</button>
          </div> */}
        </Question>
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
