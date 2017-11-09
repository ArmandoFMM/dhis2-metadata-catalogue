import React, { Component } from 'react';

import {Toolbar} from 'material-ui/Toolbar';
import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';

import './Home.css';
import Divider from 'material-ui/Divider';
import DataElementsList  from './DataElementsList';
import ProgramsList  from './ProgramsList';
import DataSetList  from './DataSetList';
import IndicatorsList  from './IndicatorsList';

const baseUrl = 'http://localhost:8080/dhis';

export default class Home extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            dataElements: [],
            programs: [],
            dataSets: [],
            indicators: [],
            loading: true
        }
    }

    componentWillMount() {
        this.getMetada().then( data => {
            this.setState({
                dataElements: data.dataElements,
                programs: data.programs,
                dataSets: data.dataSets,
                indicators: data.indicators,
                loading: false});
            console.log(data);
        });
    }

    getMetada() {
        return fetch(baseUrl+'/api/metadata.json?dataElements=true&programs=true&dataSets=true&indicators=true&fields=:idName&pageSize=50', {
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Basic '+btoa('admin:district')+''
            }
        })
            .then(response => response.json())
            .then(response => {
                 console.log(response);
                 return response;
            });
    }
    

        render(){
            if(this.state.loading){
                return (<CircularProgress className="home-loader" size={80} thickness={5} />
            );
            }
            else
                return (<div>
                            <Toolbar className="Home-toolbar" >
                                <TextField
                                    hintText="Please type..."
                                    className="filter-input"
                                    />
                            </Toolbar>
                            <DataElementsList dataElements={this.state.dataElements} />
                            <ProgramsList programs={this.state.programs} />
                            <DataSetList dataSets={this.state.dataSets} />
                            <IndicatorsList indicators={this.state.indicators} />
                        </div>);
        }


}