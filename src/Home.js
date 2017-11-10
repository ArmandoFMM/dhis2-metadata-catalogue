import React, { Component } from 'react';

import {Toolbar} from 'material-ui/Toolbar';
import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';

import './Home.css';
import DataElementsList  from './DataElementsList';
import ProgramsList  from './ProgramsList';
import DataSetList  from './DataSetList';
import IndicatorsList  from './IndicatorsList';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import { Redirect } from 'react-router';


const baseUrl = 'http://localhost:8080/dhis';
const headerOptions  = {
    'Accept': 'application/json',
    'Authorization': `Basic ${btoa('admin:district')}`,
    'Content-Type': 'application/json'
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
            inputDataSet: '',
            open: false,
            nome: '',
            selectedItems:[],
            saved: false
            
        }

        this.filterDataElements = this.filterDataElements.bind(this);
        this.filterPrograms = this.filterPrograms.bind(this);
        this.filterDataSets = this.filterDataSets.bind(this);
        this.filterIndicators = this.filterIndicators.bind(this);
        this.handleCreatePack = this.handleCreatePack.bind(this);
        this.addItem = this.addItem.bind(this); 
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

    addItem(type, item) {

        item['type'] = type;

        this.setState(prevState => ({
            selectedItems: [...prevState.selectedItems, item]
          }));
          console.log(this.state.selectedItems);

    }

    removeItem(){



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

    handleOpen = () => {
        this.setState({open: true});
      };
    
      handleClose = () => {
        this.setState({open: false});
      };

      generateId(){
          return fetch(`${baseUrl}/api/system/id.`, {
              headers: headerOptions
          }).then( res => res.json());
      }

      savePackage(name, id){

        let selectedItems = this.state.selectedItems.slice();
        let dataElements = [];
        let programs = [];
        let dataSets = [];
        let indicators = [];

        selectedItems.map( el => {
            switch(el.type) {
            
                case 'dataElement': dataElements.push(el);
                break;

                case 'program': programs.push(el);
                break;

                case 'dataSet': dataSets.push(el);
                break;

                case 'indicator': indicators.push(el);
                break;

                default: console.log('none');
            } 
           
        });

          return fetch(`${baseUrl}/api/dataStore/MetadataCatalogue/${name}`,
          {
            method: 'POST',
            headers: headerOptions,
            body: JSON.stringify({ 
                "package_name" : name,
                  "id" : id,
                  dataElements: dataElements,
                  programs: programs,
                  dataSets: dataSets,
                  indicators: indicators
              })
          })
      }


      handleCreatePack(){
          this.generateId()
            .then( res => {
                console.log(res);
                this.savePackage(this.state.nome, res.codes[0])
                    .then( res => res.json()).then( res => {

                        if(res.httpStatusCode == '201'){
                            this.setState({saved: true})
                        }
                    });
                    this.setState({saved: false, open:false}); 
                    this.props.history.push("/catalogues");
          
            });
      }


      componentWillReceiveProps(nextProps) {
        if (nextProps.location !== this.props.location) {
          // navigated!
        }
      }
    

        render(){

            if(this.state.loading){
                    return (<CircularProgress className="home-loader" size={80} thickness={5} />
                );
            }
            else {
                const actions = [
                    <FlatButton
                      label="Cancel"
                      primary={true}
                      onClick={this.handleClose}
                    />,
                    <FlatButton
                      label="Submit"
                      primary={true}
                      keyboardFocused={true}
                      onClick={this.handleCreatePack}
                    />,
                  ];

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
                                <FloatingActionButton style={{position: 'fixed',
                                    right: 20,
                                    bottom: 60}}
                                    onClick={() => { this.setState( prevState =>({open: !prevState.open}))}}
                                    >
                                    <ContentAdd />
                                </FloatingActionButton>
                                <DataElementsList addItem={this.addItem} filterDataElements={this.filterDataElements} dataElements={dataElements} />
                                <ProgramsList addItem={this.addItem} programs={programs}  filterPrograms={this.filterPrograms}  />
                                <DataSetList addItem={this.addItem} dataSets={dataSets} filterDataSets={this.filterDataSets}  />
                                <IndicatorsList addItem={this.addItem} indicators={indicators} filterIndicators={this.filterIndicators}/>
                                <Dialog
                                    title="Add Catalogue"
                                    modal={false}
                                    actions={actions}
                                    open={this.state.open} >
                                    <div>
                                        <TextField

                                        onChange={(e) => {
                                            this.setState({nome: e.target.value})
                                        }}
                                        hintText="Catalogue Name"
                                        />
                                    </div>
                                    </Dialog>

                                    <Snackbar
                                        open={this.state.saved}
                                        message="Catalogue Saved"
                                        autoHideDuration={3000}
                                        />                          
                            </div>);
                        }
            }


    }