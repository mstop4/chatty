import React, {Component} from 'react'
import ChatBar from './ChatBar.jsx'
import MessageList from './MessageList.jsx'

class App extends Component {

  constructor(props) {
    super(props);
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
          <ChatBar user={this.state.currentUser}/>
        </main>
      </div>
    );
  }

}

export default App
