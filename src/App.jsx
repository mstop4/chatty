import React, {Component} from 'react'
import ChatBar from './ChatBar.jsx'
import MessageList from './MessageList.jsx'

class App extends Component {
  render() {
    console.log("Rendering App")
    return (
      <div>
        <nav className="navbar">
          <a href="/" class="navbar-brand">Chatty</a>
          <img className="raccoon" src="/build/raccoon.jpg"/>
        </nav>

        <main className="messages">
          <MessageList/>
          <ChatBar/>
        </main>
      </div>
    );
  }
}

export default App
