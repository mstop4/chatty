import React, {Component} from 'react'
import ChatBar from './ChatBar.jsx'
import MessageList from './MessageList.jsx'

const bots = ['pairs', 'john', 'slack', 'raccoon', 'dog', 'cat']

class App extends Component {

  constructor(props) {
    super(props);
    this.socket = new WebSocket("ws://0.0.0.0:3003")
    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          id: 1,
          username: "Bob",
          content: "Has anyone seen my marbles?",
        },

        {
          id: 2,
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]
    }
    this.handleTyping = this.handleTyping.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    console.log("componentDidMount <App />");

    // setInterval(()=> {
    //   let rnd = Math.floor(Math.random() * (bots.length))
    //   const newMsg = {
    //     username: bots[rnd] + "bot",
    //     content: bots[rnd],
    //     id: Date.now()
    //   }

    //   const messages = this.state.messages.concat(newMsg)
    //   this.setState({messages: messages, text: ""})
    // }, 3000)

    // connect to server

    this.socket.onopen = function (event) {
      this.send("Connected to server")
    }

    this.socket.onmessage = function (data) {
      console.log(data);
    }
  }

  handleSubmit(e) {
    e.stopPropagation()

    if (e.key === 'Enter') {

      let uName;

      if (!this.state.currentUser.name) {
        uName = "Raccoon"
      } else {
        uName = this.state.currentUser.name
      }

      const newMsg = {
        username: username,
        content: content,
        id: Date.now()
      }

      const messages = this.state.messages.concat(newMsg)
      this.setState({messages: messages, text: ""})
    }
  }

  handleTyping(e) {
    this.setState({text: e.target.value});
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Raccoon Chat</a>
          <img className="raccoon" src="/build/raccoon.jpg"/>
        </nav>

        <main className="messages">
          <MessageList messages={this.state.messages}/>
          <ChatBar user={this.state.currentUser} handleSubmit={this.handleSubmit} handleTyping={this.handleTyping}/>
        </main>
      </div>
    );
  }

}

export default App
