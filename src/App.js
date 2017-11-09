import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Home from './Home';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle = () => this.setState({open: !this.state.open});

  render(){
    return (
          <MuiThemeProvider>
            <div>
            <AppBar
                title="Metadata Catalog"
                className="App-navbar"
                iconClassNameRight="muidocs-icon-navigation-expand-more"
                onLeftIconButtonTouchTap={this.handleToggle}
              />
              <Home />

              <Drawer open={this.state.open}>
                <MenuItem>Home</MenuItem>
                <MenuItem>My Catalogs</MenuItem>
                <MenuItem>Settings</MenuItem>
                <RaisedButton className="toggle-drawer" label="CLOSE" primary={true} onClick={this.handleToggle}
                 />
              </Drawer>              
            </div>
          </MuiThemeProvider>
    );
  }
}

export default App;
