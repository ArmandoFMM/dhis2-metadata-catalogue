import React, { Component } from 'react';

import {Toolbar} from 'material-ui/Toolbar';
import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';

import './Home.css';
import DataElementsList  from './DataElementsList';
import ProgramsList  from './ProgramsList';
import DataSetList  from './DataSetList';
import IndicatorsList  from './IndicatorsList';

const baseUrl = 'http://localhost:8080/dhis';
const headerOptions  = {
    'Accept': 'application/json',
    'Authorization': `Basic ${btoa('admin:district')}`
}

export default class Home extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            dataElements: [],
            programs: [],
            dataSets: [],
            indicators: [],
            loading: true,
            inputDataEl: '',
            inputPro: '',
            inputInd: '',
            inputDataSet: ''
            
        }

        this.filterDataElements = this.filterDataElements.bind(this);
        this.filterPrograms = this.filterPrograms.bind(this);
        this.filterDataSets = this.filterDataSets.bind(this);
        this.filterIndicators = this.filterIndicators.bind(this);
    }

    componentWillMount() {
        this.getMetadata().then( data => {
            this.setState({
                dataElements: data.dataElements,
                programs: data.programs,
                dataSets: data.dataSets,
                indicators: data.indicators,
                loading: false});
            console.log(data);
        });
    }

    getMetadata() {
        return fetch(baseUrl+'/api/metadata.json?dataElements=true&programs=true&dataSets=true&indicators=true&fields=:idName&paging=false', {
            headers: headerOptions
        })
            .then(response => response.json())
            .then(response => {
                 console.log(response);
                 return response;
            });
    }

    filterPrograms(e){
        this.setState({
            inputPro: e.target.value,
          });
        }
    
    
    filterIndicators(e){
        this.setState({
            inputInd: e.target.value,
        });
        }

    filterDataSets(e){
        this.setState({
            inputDataSet: e.target.value,
            });
        }

    filterDataElements(e){
        this.setState({
            inputDataEl: e.target.value,
          });
        //   if(e.target.value){
        //         this.getMetaDataByName('dataElements', e.target.value)
        //             .then( response => {
        //                 this.setState({ dataElements: response.dataElements});
        //             });
        //         console.log(this.state.inputDE);
        //   }
        //   else {
              
        //   }
    }

    getMetaDataByName(metaType,value){
        return fetch(`${baseUrl}/api/${metaType}.json?fields=:idName&filter=displayName:like:${value}&paging=false`,
            {
            headers: headerOptions
        })
            .then( response => response.json())
            .then( response => {
                return response;
            });

    }
    

        render(){

            if(this.state.loading){
                    return (<CircularProgress className="home-loader" size={80} thickness={5} />
                );
            }
            else {
                const dataElements  = this.state.dataElements.filter(dataElement => {
                                    return dataElement.displayName.toString().toLowerCase().includes(this.state.inputDataEl.toLowerCase()) || dataElement.id.toString().includes(this.state.inputDataEl.toLowerCase());
                                });

                const programs  = this.state.programs.filter(program => {
                                    return program.displayName.toString().toLowerCase().includes(this.state.inputPro.toLowerCase()) || program.id.toString().includes(this.state.inputPro.toLowerCase());
                                });

                const dataSets  = this.state.dataSets.filter(dataSet => {
                                    return dataSet.displayName.toString().toLowerCase().includes(this.state.inputDataSet.toLowerCase()) || dataSet.id.toString().includes(this.state.inputDataSet.toLowerCase());
                                });

                const indicators  = this.state.indicators.filter(indicator => {
                                    return indicator.displayName.toString().toLowerCase().includes(this.state.inputInd.toLowerCase()) || indicator.id.toString().includes(this.state.inputInd.toLowerCase());
                                });

                    return (<div>
                                <Toolbar className="Home-toolbar" >
                                    <TextField
                                        hintText="Please type..."
                                        className="filter-input"
                                        />
                                </Toolbar>
                                <DataElementsList filterDataElements={this.filterDataElements} dataElements={dataElements} />
                                <ProgramsList programs={programs}  filterPrograms={this.filterPrograms}  />
                                <DataSetList dataSets={dataSets} filterDataSets={this.filterDataSets}  />
                                <IndicatorsList indicators={indicators} filterIndicators={this.filterIndicators}/>
                            </div>);
                        }
            }


    }