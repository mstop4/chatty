import React, {Component} from 'react'

class ChatBar extends Component {

  render() {
    console.log("Rendering ChatBar")

    let name;

    if (!this.props.user.name) {
      name = "Anonymous"
    } else {
      name = this.props.user.name
    }

    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Anonymous" value={this.props.user.name} />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onChange={this.props.handleTyping}
               onKeyDown={this.props.handleSubmit} />
      </footer>
    );
  }
}

export default ChatBar