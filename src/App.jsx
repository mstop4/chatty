import React, {Component} from 'react'
import ChatBar from './ChatBar.jsx'
import MessageList from './MessageList.jsx'

class App extends Component {

  constructor(props) {
    super(props)
    this.socket = new WebSocket("ws://0.0.0.0:3003")
    this.state = {
      currentUser: {
        id: 0,
        postingAs: "Bob",
        name: "Bob" // optional. if currentUser is not defined, it means the user is Anonymous
      },
      messages: [],
      users: {},
      userCount: 0
    }

    this.handleTypingName = this.handleTypingName.bind(this)
    this.handleTypingMessage = this.handleTypingMessage.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
  }

  componentDidMount() {

    // connect to server

    this.socket.onmessage = function (event) {

      let inMsg = JSON.parse(event.data)
      let newMsg
      let messages
      let newUsersList

      switch (inMsg.type) {

        case "inMessage":
          newMsg = this.buildMessage(inMsg.id, 'message', inMsg.userID, inMsg.username, inMsg.contentType, inMsg.content)
          messages = this.state.messages.concat(newMsg)
          this.setState({messages: messages})
          break

        case "inNotification":
          let content = `${inMsg.oldName} has changed their name to ${inMsg.newName}`
          newMsg = this.buildMessage(inMsg.id, 'notification', inMsg.userID, 'Note', inMsg.contentType, content)
          messages = this.state.messages.concat(newMsg)
          this.setState({messages: messages})
          break

        case "inSetup":
          let newCurUser = Object.assign({}, this.state.currentUser)
          newCurUser.id = inMsg.id
          this.setState({currentUser: newCurUser})
          this.setState({users: inMsg.clientList})
          break

        case "inConnect":
          newUsersList = Object.assign({}, this.state.users)
          newUsersList[inMsg.user.id] = inMsg.user
          this.setState({users: newUsersList})
          this.setState({userCount: inMsg.numUsers})
          break

        case "inDisconnect":
          newUsersList = Object.assign({}, this.state.users)
          delete newUsersList[inMsg.user.id]
          this.setState({users: newUsersList})
          this.setState({userCount: inMsg.numUsers})
          break

        default:
          console.log("Error: Unknown message type.")
      }
    }

    this.socket.onmessage = this.socket.onmessage.bind(this)
  }

  buildMessage(id, type, userID, username, contentType, content) {
    return {
      id: id,
      type: type,
      userID: userID,
      username: username,
      contentType: contentType,
      content: content
    }
  }

  handleNameChange(e) {
    e.stopPropagation()

    if (e.key === 'Enter') {

      // the content key is there to prevent the server from freaking out when it tries to find an image link
      const newMsg = {
        oldName: this.state.currentUser.postingAs,
        newName: this.state.currentUser.name ? this.state.currentUser.name : 'Anonymous',
        content: '',
        type: "outNotification"
      }

      this.socket.send(JSON.stringify(newMsg))

      let newCurUser = Object.assign({}, this.state.currentUser)
      newCurUser.postingAs = this.state.currentUser.name
      this.setState({currentUser: newCurUser})
    }
  }

  handleSubmit(e) {
    e.stopPropagation()

    if (e.key === 'Enter' && this.state.text) {

      let uName = this.state.currentUser.postingAs ? this.state.currentUser.postingAs : 'Anonymous'

      // the id (null) and contentType ('text') keys are ignored by the server
      const newMsg = this.buildMessage(null, 'outMessage', this.state.currentUser.id, uName, 'text', this.state.text)

      e.target.value = ""
      this.setState({text: ""})
      this.socket.send(JSON.stringify(newMsg))
    }
  }

  handleTypingName(e) {
    let newCurUser = Object.assign({}, this.state.currentUser, {name: e.target.value})
    this.setState({currentUser: newCurUser})
  }

  handleTypingMessage(e) {
    this.setState({text: e.target.value})
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <span className="logoBox"></span>
          <span className="userCounter">{this.state.userCount} Users online</span>
        </nav>

        <main className="messages">
          <MessageList messages={this.state.messages} users={this.state.users}/>
          <ChatBar user={this.state.currentUser.name} handleSubmit={this.handleSubmit} handleNameChange={this.handleNameChange}
                   handleTypingName={this.handleTypingName} handleTypingMessage={this.handleTypingMessage}/>
        </main>
      </div>
    )
  }
}

export default App
