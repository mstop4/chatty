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
          username: "Bob",
          content: "Has anyone seen my marbles?",
        },

        {
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]
    }
  }

  componentDidMount() {
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" class="navbar-brand">Chatty</a>
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
