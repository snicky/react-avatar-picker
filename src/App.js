import React, { Component } from 'react';
import AvatarPicker from './components/AvatarPicker';

const avatars = [
  { "src": "https://github.com/JoinColony/coding-challenge/blob/master/avatar1.png?raw=true", "label": "Avatar 1", "id": 1 },
  { "src": "https://github.com/JoinColony/coding-challenge/blob/master/avatar2.png?raw=true", "label": "Avatar 2", "id": 2 },
  { "src": "https://github.com/JoinColony/coding-challenge/blob/master/avatar3.png?raw=true", "label": "Avatar 3", "id": 3 },
  { "src": "https://github.com/JoinColony/coding-challenge/blob/master/avatar4.png?raw=true", "label": "Avatar 4", "id": 4 },
  { "src": "https://github.com/JoinColony/coding-challenge/blob/master/avatar5.png?raw=true", "label": "Avatar 5", "id": 5 },
  { "src": "https://github.com/JoinColony/coding-challenge/blob/master/avatar6.png?raw=true", "label": "Avatar 6", "id": 6 }
];

const saveAvatar = (avatar) => {
  return new Promise((resolve, _) => {
    const fakeApiResponseDelay = 1000;
    setTimeout(() => {
      console.log('API saved avatar ', JSON.stringify(avatar));
      resolve();
    }, fakeApiResponseDelay);
  });
}

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <br/>
        <AvatarPicker avatars={avatars} avatarsPerRow={4} saveAvatar={saveAvatar} />
      </div>
    );
  }
}
