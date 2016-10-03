import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();
import Header from './Header';
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
        socket.emit('user.connect', { id: fp }, (err, role, works) => {
          console.log(err, role, works)
        })
      })
    });
  }

  render() {
    return (
      <MuiThemeProvider>
        <Header title='众创' />
      </MuiThemeProvider>
    );
  }
}

export default App;
