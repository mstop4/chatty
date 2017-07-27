import React, {Component} from 'react'
import ChatBar from './ChatBar.jsx'
import MessageList from './MessageList.jsx'

class App extends Component {

  constructor(props) {
    super(props);
    this.socket = new WebSocket("ws://0.0.0.0:3003")
    this.state = {
      currentUser: {
        postingAs: "Bob",
        name: "Bob", // optional. if currentUser is not defined, it means the user is Anonymous
      },
      messages: [],
      userCount: 0
    }
    this.handleTypingName = this.handleTypingName.bind(this)
    this.handleTypingMessage = this.handleTypingMessage.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
  }

  componentDidMount() {
    console.log("componentDidMount <App />");

    // connect to server

    this.socket.onopen = function (event) {
      //this.socket.send(JSON.stringify({username: "Raccoonbot", content: "Connected to server!"}))
    }

    this.socket.onmessage = function (event) {

      let inMsg = JSON.parse(event.data)
      let newMsg;
      let messages;

      switch (inMsg.type) {

        case "inMessage":
          newMsg = {
            username: inMsg.username,
            content: inMsg.content,
            id: inMsg.id,
            type: 'message'
          }

          messages = this.state.messages.concat(newMsg);
          this.setState({messages: messages})
          break

        case "inNotification":
          newMsg = {
            username: "Note",
            content: `${inMsg.oldName} has changed their name to ${inMsg.newName}`,
            id: inMsg.id,
            type: 'notification'
          }

          messages = this.state.messages.concat(newMsg);
          this.setState({messages: messages})
          break

        case "inUserUpdate":
          this.setState({userCount: inMsg.value})
          //this.render()
      }
    }

    this.socket.onopen = this.socket.onopen.bind(this);
    this.socket.onmessage = this.socket.onmessage.bind(this);
  }

  handleNameChange(e) {
    e.stopPropagation()

    if (e.key === 'Enter') {

      const newMsg = {
        oldName: this.state.currentUser.postingAs,
        newName: this.state.currentUser.name,
        type: "outNotification"
      }

      this.socket.send(JSON.stringify(newMsg))

      let newCurUser = Object.assign({}, this.state.currentUser)
      newCurUser.postingAs = this.state.currentUser.name;
      this.setState({currentUser: newCurUser});
    }
  }

  handleSubmit(e) {
    e.stopPropagation()

    if (e.key === 'Enter') {

      let uName;

      if (!this.state.currentUser.postingAs) {
        uName = "Raccoon"
      } else {
        uName = this.state.currentUser.postingAs
      }

      const newMsg = {
        username: uName,
        content: this.state.text,
        type: "outMessage"
      }

      e.target.value = ""
      this.setState({text: ""})
      this.socket.send(JSON.stringify(newMsg))
    }
  }

  handleTypingName(e) {
    let newCurUser = Object.assign({}, this.state.currentUser)
    newCurUser.name = e.target.value;
    this.setState({currentUser: newCurUser});
  }

  handleTypingMessage(e) {
    this.setState({text: e.target.value});
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Raccoon Chat</a>
          <span className="logoBox"><img className="raccoon" src="/build/raccoon.jpg"/></span>
          <span className="userCounter">{this.state.userCount} Users online</span>
        </nav>

        <main className="messages">
          <MessageList messages={this.state.messages}/>
          <ChatBar user={this.state.currentUser.name} handleSubmit={this.handleSubmit} handleNameChange={this.handleNameChange}
                   handleTypingName={this.handleTypingName} handleTypingMessage={this.handleTypingMessage}/>
        </main>
      </div>
    );
  }

}

export default App
