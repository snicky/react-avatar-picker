import React, { Component } from 'react';
import Bounce from '../bower_components/bounce.js/bounce.js';
import AvatarListImage from './AvatarListImage';

export default class AvatarPopover extends Component {
  state = {
    opened: false,
    hoveredAvatar: null
  }
  bounceEffect = (() => {
    const bounce = new Bounce();
    bounce.scale({
      from: { x: 0, y: 0 },
      to: { x: 1, y: 1 }
    });
    return bounce;
  })();
  open() {
    const displayDelay = 50;
    this.bounceEffect.applyTo(this.domNode);
    setTimeout(() => {
      this.setState({ opened: true });
    }, displayDelay);
  }
  close() {
    this.domNode.addEventListener('transitionend', () => {
      this.setState({ opened: false });
    })
    this.domNode.classList.remove('opened');
  }
  detectInsideClicks(e) {
    if (this.state.opened && !this.domNode.contains(e.target)) {
      this.close();
    }
  }
  componentWillMount() {
      document.addEventListener('click', this.detectInsideClicks.bind(this), false);
  }
  componentWillUnmount() {
      document.removeEventListener('click', this.detectInsideClicks.bind(this), false);
  }
  setClassName() {
    let className = 'popover';
    if (this.props.opened) className += ' opened';
    return className;
  }
  chooseAvatar(avatar) {
    return new Promise(((resolve, _) => {
      this.props.chooseAvatar(avatar).then(() => {
        this.close();
        resolve();
      })
    }).bind(this));
  }
  render() {
    const avatarImages = this.props.avatars.map((avatar) => {
      return (
        <AvatarListImage
          avatar={avatar}
          chooseAvatar={this.chooseAvatar.bind(this)}
          hoverAvatar={this.hoverAvatar.bind(this)}
          hovered={this.state.hoveredAvatar == avatar}
        />
      );
    });
    return (
      <div className={this.setClassName.apply(this)} ref={(domNode) => this.domNode = domNode}>
        <div className="title">Choose your avatar:</div>
        <ul>{avatarImages}</ul>
      </div>
    )
  }
}
