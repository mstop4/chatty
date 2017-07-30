import React, {Component} from 'react'
import Message from './Message.jsx'

class MessageList extends Component {
  render() {

    // convert message data into Message elements
    const msgList = this.props.messages.map((msg) => {

      // Determine username colour
      for (var user in this.props.users) {
        if (this.props.users[user].id === msg.userID) {
          return <Message user={msg.username} userColour={this.props.users[user].color} content={msg.content}
                  contentType={msg.contentType} key={msg.id} type={msg.type}/>
        }
      }

      // Default to black if user is unknown
      return <Message user={msg.username} userColour="#000000" content={msg.content}
              contentType={msg.contentType} key={msg.id} type={msg.type}/>
    })

    return (
      <div className="message-list">
        {msgList}
      </div>
    )
  }
}

export default MessageList
