import React, {Component} from 'react'

class Message extends Component {
  render() {
    console.log("Rendering ChatBar")
    return (
      <div className="message">
        Anonymous1 changed their name to nomnom.
      </div>
    );
  }
}

export default Message