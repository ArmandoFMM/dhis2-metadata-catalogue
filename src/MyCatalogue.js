import React, { Component } from 'react';

import {Toolbar} from 'material-ui/Toolbar';
import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';
import {List, ListItem} from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import ContentSend from 'material-ui/svg-icons/content/send';
import Subheader from 'material-ui/Subheader';
import Toggle from 'material-ui/Toggle';

import './Home.css';
import PackageList  from './PackageList';

const catNameSpace = 'MetadataCatalogue';
const baseUrl = 'http://localhost:8080/dhis';
const headerOptions  = {
   'Accept': 'application/json',
   'Authorization': `Basic ${btoa('admin:district')}`
}

export default class MyCatalogue extends Component {
    
   constructor(props){
       super(props);
       this.state = {
           packs: [],
           loading: true,
           inputPKG: ''
       }

        
   }

   componentWillMount() {
       this.getPackages().then( data => {
                    let aux1;
                   let temp = [];
                   if(data.length){

                    data.map(pack => {
                           aux1 = this.getPackageContent(pack).then((res) => {
                               
    
                                    console.log(res);
                                    if(typeof res.dataElements === 'undefinded'){
                                        res.dataElement = [];
                                    }
                                    if(typeof res.programs === 'undefinded'){
                                        res.programs = [];
                                    }
                                    if(typeof res.indicators === 'undefinded'){
                                        res.indicators = [];
                                    }
                                    if(typeof res.dataSets === 'undefinded'){
                                        res.dataSets = [];
                                    }
    
                                    this.setState(prevState => ({
                                        packs: [...prevState.packs, res]
                                      }));
    
                            });
                       });

                   }
                   if(aux1){
                    aux1.then(() => {
                        this.setState({ loading: false});
                       });
                   }
                   else{
                    this.setState({ loading: false});                    
                   }
  
       });
   }

   getPackageContent(pack){
       return fetch(baseUrl+'/api/dataStore/'+catNameSpace+'/'+pack, {
           headers: headerOptions
           })
       .then(response => {
               return response.json()});
    
   }   

   getPackages() {
        
       return fetch(baseUrl+'/api/dataStore/'+catNameSpace, {
           headers: headerOptions
       })
       .then(response => response.json())
       .then(response => {
                //console.log(response);
                return response;
           }).catch(err => { console.warn('Failed to load:'. err); });
        
   }

   getPackMataData(key){

        return fetch(`${baseUrl}/api/dataStore/${catNameSpace}/${key}/metaData.json?fields=:all`, {
            headers: headerOptions
        })
        .then(response => response.json())
        .catch(err => { console.warn('Failed to load:'. err); })

   }

    
    

       render(){

           if(this.state.loading){
               return (<CircularProgress className="home-loader" size={80} thickness={5} />);
           }
           else {
            //    console.clear()
            //    console.log(this.state.packs);
               const { packs } = this.state;
                   return (<div>
                               <PackageList packs={packs} />
                           </div>);
                           }
       }


}