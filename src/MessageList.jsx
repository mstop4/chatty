import React, {Component} from 'react'
import Message from './Message.jsx'

class MessageList extends Component {
  render() {
    console.log("Rendering Message List")

    const msgList = this.props.messages.map((msg) =>
      <Message user={msg.username} content={msg.content} id={msg.content}/>
    )

    return (
      <div className="message-list">
        {msgList}
      </div>
    );
  }
}

export default MessageList