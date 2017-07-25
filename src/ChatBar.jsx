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
        <input className="chatbar-username" placeholder={this.props.user.name} />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" />
      </footer>
    );
  }
}

export default ChatBar