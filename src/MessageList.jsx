import React, {Component} from 'react'
import Message from './Message.jsx'

class MessageList extends Component {
  render() {
    console.log("Rendering Message List")

    const msgList = this.props.messages.map((msg) => {

      for (var i=0; i<this.props.users.length; i++) {
        if (this.props.users[i].id === msg.userID) {
          return <Message user={msg.username} userColour={this.props.users[i].color} content={msg.content} key={msg.id} type={msg.type}/>
        }
      }

      return <Message user={msg.username} userColour="#000000" content={msg.content} key={msg.id} type={msg.type}/>
    })

    return (
      <div className="message-list">
        {msgList}
      </div>
    );
  }
}

export default MessageList
