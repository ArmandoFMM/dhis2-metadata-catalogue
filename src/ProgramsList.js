import React, { Component } from 'react';

import './Home.css';
import {GridList} from 'material-ui/GridList';
import {Card, CardActions, CardHeader} from 'material-ui/Card';

import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Toggle from 'material-ui/Toggle';

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

export default class ProgramsList extends Component {
    
    constructor(props){
        super(props);
        this.state = {
        }
    }
    

        render(){
            const { programs } = this.props;
             return (<div>
                            <div style={styles.root}>
                                <Subheader className="home-subheader" inset={true}>PROGRAMS</Subheader>
                                <GridList style={styles.gridList} cols={3.2} padding={2}>
                                {programs.map((program) => (
                                                <Card style={styles.card} key={program.id}>
                                                        <CardHeader title={program.displayName}
                                                        />
                                                        <CardActions>
                                                            <Toggle label="Export" />
                                                        </CardActions>
                                                        
                                                </Card>
                                                ))}
                                    
                                </GridList>
                            </div>
                        </div>);
        }


}