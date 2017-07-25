import React, {Component} from 'react'

class MessageList extends Component {
  render() {
    console.log("Rendering ChatBar")
    return (
      <div className="message system">
        <span className="message-username">Anonymous1</span>
        <span className="message-content">I won't be impressed with technology until I can download food.</span>
      </div>
    );
  }
}

export default MessageList