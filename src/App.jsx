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
      messages: []
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
    //   }

    //   const messages = this.state.messages.concat(newMsg)
    //   this.setState({messages: messages, text: ""})
    // }, 3000)

    // connect to server

    this.socket.onopen = function (event) {
      this.socket.send(JSON.stringify({username: "Raccoonbot", content: "Connected to server!"}))
    }

    this.socket.onmessage = function (event) {

      let inMsg = JSON.parse(event.data)

      const newMsg = {
        username: inMsg.username,
        content: inMsg.content,
        id: inMsg.id
      }

      const messages = this.state.messages.concat(newMsg);
      this.setState({messages: messages})
    }

    this.socket.onopen = this.socket.onopen.bind(this);
    this.socket.onmessage = this.socket.onmessage.bind(this);
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
        username: uName,
        content: this.state.text,
        id: Date.now()
      }

      const messages = this.state.messages.concat(newMsg)
      this.setState({messages: messages, text: ""})
      e.target.value = ""

      this.socket.send(JSON.stringify(newMsg))
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
