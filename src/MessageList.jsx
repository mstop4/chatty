import React, {Component} from 'react'
import Message from './Message.jsx'

class MessageList extends Component {
  render() {

    const msgList = this.props.messages.map((msg) => {

      for (var user in this.props.users) {
        if (this.props.users[user].id === msg.userID) {
          return <Message user={msg.username} userColour={this.props.users[user].color} content={msg.content}
                  contentType={msg.contentType} id={msg.id} type={msg.type}/>
        }
      }

      return <Message user={msg.username} userColour="#000000" content={msg.content}
              contentType={msg.contentType} id={msg.id} type={msg.type}/>
    })

    return (
      <div className="message-list">
        {msgList}
      </div>
    );
  }
}

export default MessageList
