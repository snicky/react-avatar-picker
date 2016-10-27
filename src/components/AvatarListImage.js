import React, { Component } from 'react';

export default class AvatarListImage extends Component {
  chooseAvatar = () => {
    this.props.saveAvatarChoice(this.props.avatar);
  }
  setWrapperClass() {
    let className = 'image-wrapper';
    if (this.props.hovered) className += ' hovered';
    if (this.props.spinning) className += ' spinning';
    return className;
  }
  onMouseOver = () => {
    this.props.hoverAvatar(this.props.avatar);
  }
  onMouseOut = () => {
    this.props.hoverAvatar(null);
  }
  render() {
    return (
      <li className={this.setWrapperClass()}>
        <img src={this.props.avatar.src} alt={this.props.avatar.label} />
        <div className='image-overlay' onClick={this.chooseAvatar}
          onMouseOver={this.onMouseOver}
          onMouseOut={this.onMouseOut}></div>
        <div className='image-spinner'></div>
      </li>
    );
  }
}
