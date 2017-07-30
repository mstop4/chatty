import React, {Component} from 'react'

class ChatBar extends Component {

  render() {

    let chatMsgPlaceholder;

    if (this.props.validMessage) {
      chatMsgPlaceholder = "Type a message and hit ENTER."
    } else {
      chatMsgPlaceholder = "Message cannot be empty. Type a message and hit ENTER."
    }

    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Anonymous" onChange={this.props.handleTypingName} value={this.props.user}
               onKeyDown={this.props.handleNameChange}/>
        <input className="chatbar-message" placeholder={chatMsgPlaceholder} onChange={this.props.handleTypingMessage}
               onKeyDown={this.props.handleSubmit} />
      </footer>
    )
  }
}

export default ChatBar