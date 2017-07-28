import React, {Component} from 'react'

class Message extends Component {

  render() {

    if (this.props.type === 'notification') {
      if (this.props.contentType === 'image') {
        return (
          <div className="message notification" key={this.props.id}>
            <span className="message-username">{this.props.user}</span>
            <span className="message-content" dangerouslySetInnerHTML={{__html: this.props.content}}></span>
          </div>
        )
      } else {
        return (
          <div className="message notification" key={this.props.id}>
            <span className="message-username">{this.props.user}</span>
            <span className="message-content">{this.props.content}</span>
          </div>
        )
      }
    } else {

      let nameStyle = {color: this.props.userColour}

      if (this.props.contentType === 'image') {
        return (
          <div className="message" key={this.props.id}>
            <span className="message-username" style={nameStyle}>{this.props.user}</span>
            <span className="message-content" dangerouslySetInnerHTML={{__html: this.props.content}}></span>
          </div>
        )
      } else {
        return (
          <div className="message" key={this.props.id}>
            <span className="message-username" style={nameStyle}>{this.props.user}</span>
            <span className="message-content">{this.props.content}</span>
          </div>
        )
      }
    }
  }
}

export default Message

