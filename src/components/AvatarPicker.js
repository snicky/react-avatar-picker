import React, { Component } from 'react';
import Bounce from 'bounce.js';
import '../styles/css/AvatarPicker.css';
import AvatarListImage from './AvatarListImage';
import HappyGrid from '../helpers/HappyGrid';

export default class AvatarPicker extends Component {
  state = {
    opened: false,
    currentAvatar: this.props.avatars[0],
    spinningAvatar: null,
    hoveredAvatar: null
  }

  // ------------------------------------------------------------------------
  // Opening and closing

  bounceEffect = (() => {
    const bounce = new Bounce();
    bounce.scale({
      from: { x: 0, y: 0 },
      to: { x: 1, y: 1 }
    });
    return bounce;
  })();

  open = () => {
    // Short delay to start bouncing before the element is displayed.
    const displayDelay = 50;
    this.bounceEffect.applyTo(this.popover);
    setTimeout(() => {
      this.setState({
        opened: true
      })
    }, displayDelay);
  }
  close() {
    this.popover.addEventListener('transitionend', () => {
      this.setState({ opened: false });
    });
    this.popover.classList.remove('opened');
  }

  // ------------------------------------------------------------------------
  // Events detection

  avatarsGrid = new HappyGrid(this.props.avatars, this.props.avatarsPerRow);

  detectPopoverClicks = (e) => {
    if (this.state.opened && !this.popover.contains(e.target)) {
      this.close();
    }
  }
  detectKeyDown = (e) => {
    if (this.state.opened) {
      this.avatarsGrid.setCurrentElement(this.state.hoveredAvatar);
      let newHoveredAvatar;
      switch(e.keyCode) {
        case 13: // [Enter]
          newHoveredAvatar = null;
          this.saveAvatarChoice(this.state.hoveredAvatar);
          break;
        case 37: // [Left]
          newHoveredAvatar = this.avatarsGrid.jumpLeft();
          break;
        case 38: // [Up]
          newHoveredAvatar = this.avatarsGrid.jumpUp();
          break;
        case 39: // [Right]
          newHoveredAvatar = this.avatarsGrid.jumpRight();
          break;
        case 40: // [Down]
          newHoveredAvatar = this.avatarsGrid.jumpDown();
          break;
        default:
      }
      this.setState({
        hoveredAvatar: newHoveredAvatar
      });
    }
  }
  componentWillMount() {
    document.addEventListener('click', this.detectPopoverClicks, false);
    document.addEventListener('keydown', this.detectKeyDown, false);
  }
  componentWillUnmount() {
    document.removeEventListener('click', this.detectPopoverClicks, false);
    document.removeEventListener('keydown', this.detectKeyDown, false);
  }

  // ------------------------------------------------------------------------
  // Callbacks to pass down to the AvatarListImage

  saveAvatarChoice = (avatar) => {
    return new Promise(((resolve, _) => {
      this.setState({ spinningAvatar: avatar });
      this.props.saveAvatar(avatar).then(() => {
        this.setState({ currentAvatar: avatar, spinningAvatar: null });
        this.close();
        resolve()
      })
    }));
  }

  hoverAvatar = (avatar) => {
    if (this.state.opened) {
      this.setState({ hoveredAvatar: avatar });
    }
  }

  // ------------------------------------------------------------------------
  // Presentation

  setPopoverClass = () => {
    let className = 'popover';
    if (this.state.opened) className += ' opened';
    return className;
  }
  render() {
    const avatarImages = this.props.avatars.map((avatar) => {
      return (
        <AvatarListImage
          avatar={avatar}
          key={`avatar-${avatar.id}`}
          saveAvatarChoice={this.saveAvatarChoice}
          hoverAvatar={this.hoverAvatar}
          hovered={this.state.hoveredAvatar === avatar}
          spinning={this.state.spinningAvatar === avatar}
        />
      );
    });
    return (
      <div className="avatar-picker">
        <img className="current" src={this.state.currentAvatar.src}
          onClick={this.open} alt={this.state.currentAvatar.label} />
        <div className={this.setPopoverClass()}
          ref={(domNode) => this.popover = domNode}>
          <div className="title">Choose your avatar:</div>
          <ul>{avatarImages}</ul>
        </div>
      </div>
    );
  }
}
