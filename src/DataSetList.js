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

export default class DataSetList extends Component {
    
    constructor(props){
        super(props);
        this.state = {
        }
    }
    

        render(){
            const { dataSets, filterDataSets, addItem } = this.props;
             return (<div>
                            <div style={styles.root}>
                                <Subheader className="home-subheader" inset={true}>DATA SETS</Subheader>
                                <TextField
                                            hintText="Please type..."
                                            className="filter-input-item"
                                            onChange={filterDataSets}
                                            />
                                <GridList style={styles.gridList} cols={3.2} padding={2}>
                                {dataSets.map((dataSet) => (
                                                <Card style={styles.card} key={dataSet.id}>
                                                        <CardHeader title={dataSet.displayName}
                                                        />
                                                        <CardActions>
                                                            <Toggle label="Export" onToggle={(e,value) => {
                                                                if(value){
                                                                    addItem('dataSet',dataSet)
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