import React, { Component } from 'react'; 

// First we will make a new context
const { Provider, Consumer } = React.createContext();

// Then create a provider Component
class UserProvider extends Component {
  constructor() {
    super();
    this.state = {
      error: null,
      user: null
    }
  }

  async componentDidMount() {
    let res = await fetch('/login');
    let data = await res.json().catch((err) => {
      console.log(err.stack);
    })
    console.log(data);
    // if (!data.body.username) {
    //   this.setState({
    //     error: data.msg
    //   })
    // } else {
    //   this.setState({
    //     user: data
    //   })
    // }
  }

  render() {
    return (
      <Provider value={ this.state }>
        {this.props.children}
      </Provider>
    )
  }
}

export default {UserProvider, Consumer};

