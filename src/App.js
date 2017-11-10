import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Home from './Home';
import MyCatalogue from './MyCatalogue';
import { Link, Route } from 'react-router-dom';


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
                title="Metadata Catalogue"
                className="App-navbar"
                iconClassNameRight="muidocs-icon-navigation-expand-more"
                onLeftIconButtonTouchTap={this.handleToggle}
                zDepth={3}
              />


              <Drawer open={this.state.open}>
                <MenuItem><Link to="/">Home</Link></MenuItem>
                <MenuItem><Link to="/catalogues">My Catalogues</Link></MenuItem>
                <MenuItem>Settings</MenuItem>
                <RaisedButton className="toggle-drawer" label="CLOSE" primary={true} onClick={this.handleToggle}
                 />
              </Drawer>

              <Route exact path="/" component={Home}/>
              <Route path="/catalogues" component={MyCatalogue}/>             
            </div>
          </MuiThemeProvider>
    );
  }
}

export default App;
