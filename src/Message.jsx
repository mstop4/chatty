import React, {Component} from 'react'

class Message extends Component {

  render() {
    console.log("Rendering Message")

    if (this.props.type === 'notification') {
      return (
        <div className="message notification">
          <span className="message-username">{this.props.user}</span>
          <span className="message-content">{this.props.content}</span>
        </div>
      )
    } else {


      debugger;
      let nameStyle = {color: this.props.userColour}

      return (
        <div className="message" key={this.props.id}>
          <span className="message-username" style={nameStyle}>{this.props.user}</span>
          <span className="message-content">{this.props.content}</span>
        </div>
      )
    }
  }

  // render() {
  //   console.log("Rendering Message")
  //   let classes

  //   if (this.props.type === 'notification') {
  //     classes = 'className="message notification"'
  //   } else {
  //     classes = 'className="message"'
  //   }

  //   return (
  //     <div {classes} key={this.props.id}>
  //       <span className="message-username">{this.props.user}</span>
  //       <span className="message-content">{this.props.content}</span>
  //     </div>
  //   )
  // }
}

export default Message