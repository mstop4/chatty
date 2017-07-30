import React, {Component} from 'react'

class Message extends Component {

  render() {

    let nameStyle = {}
    let divClass = ""
    let msgContSpan

    if (this.props.type !== 'notification') {
      divClass = "message"
      nameStyle = {color: this.props.userColour}
    } else {
      divClass = "message notification"
    }

    if (this.props.contentType === 'image') {
      msgContSpan = <span className="message-content" dangerouslySetInnerHTML={{__html: this.props.content}}></span>
    } else {
      msgContSpan = <span className="message-content">{this.props.content}</span>
    }

    return (
      <div className={divClass} style={nameStyle}>
        <span className="message-username">{this.props.user}</span>
        {msgContSpan}
      </div>
    )
  }
}

export default Message

