import React, { Component } from 'react';

import './Home.css';
import {GridList} from 'material-ui/GridList';
import {Card, CardActions, CardHeader} from 'material-ui/Card';

import Subheader from 'material-ui/Subheader';
import Toggle from 'material-ui/Toggle';
import TextField from 'material-ui/TextField';


const styles = {
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
    },
    gridList: {
      width: 800,
      height: 250,
      overflowY: 'auto',
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    card:{
        height: 166
    }
  };

export default class IndicatorsList extends Component {
    
    constructor(props){
        super(props);
        this.state = {
        }
    }
    

        render(){
            const { indicators, filterIndicators, addItem } = this.props;
            
             return (<div>
                            <div style={styles.root}>
                                <Subheader className="home-subheader" inset={true}>INDICATOR</Subheader>
                                <TextField
                                            hintText="Please type..."
                                            className="filter-input-item"
                                            onChange={filterIndicators}
                                            />
                                <GridList style={styles.gridList} cols={3.2} padding={2}>
                                {indicators.map((indicator) => (
                                                <Card style={styles.card} key={indicator.id}>
                                                        <CardHeader title={indicator.displayName}
                                                        />
                                                        <CardActions>
                                                            <Toggle label="Export" onToggle={(e,value) => {
                                                                if(value){
                                                                    addItem('indicator', indicator)
                                                                }
                                                            }} />
                                                        </CardActions>
                                                        
                                                </Card>
                                                ))}
                                    
                                </GridList>
                            </div>
                        </div>);
        }


}