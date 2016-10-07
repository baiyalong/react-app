import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();
import Header from './Header';
import Content from './Content';
import Fingerprint2 from 'fingerprintjs2';
import io from 'socket.io-client';
import server from './server'

class App extends Component {
  // constructor() {
  //   super()
  // }
  componentDidMount() {
    var socket = io(server.addr)
    new Fingerprint2().get(fp => {
      socket.on('connect', () => {
        socket.emit('user.connect', { fp }, (err, user) => {
          console.log('user.connect', err, user)
        })
      })
    });
    socket.on('user.set', user => console.log('user.set', user))
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Header title='众创' />
          <Content />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
