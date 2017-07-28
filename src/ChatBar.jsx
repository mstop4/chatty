import React, {Component} from 'react'

class ChatBar extends Component {

  render() {

    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Raccoon" onChange={this.props.handleTypingName} value={this.props.user}
               onKeyDown={this.props.handleNameChange}/>
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onChange={this.props.handleTypingMessage}
               onKeyDown={this.props.handleSubmit} />
      </footer>
    );
  }
}

export default ChatBar