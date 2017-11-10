import React, { Component } from 'react';

import './DataElementsList.css';
import {GridList} from 'material-ui/GridList';
import {Card, CardActions, CardHeader} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';

import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import FileFolder from 'material-ui/svg-icons/file/folder';
import FileFileDownload from 'material-ui/svg-icons/file/file-download';
import ActionLabel from 'material-ui/svg-icons/action/label';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import RaisedButton from 'material-ui/RaisedButton';

import Checkbox from 'material-ui/Checkbox';

import Subheader from 'material-ui/Subheader';
import Toggle from 'material-ui/Toggle';
import FontIcon from 'material-ui/FontIcon'
import {Toolbar} from 'material-ui/Toolbar';
import TextField from 'material-ui/TextField';
import {
 Table,
 TableBody,
 TableHeader,
 TableHeaderColumn,
 TableRow,
 TableRowColumn,
} from 'material-ui/Table';

const catNameSpace = 'MetadataCatalogue';
const baseUrl = 'http://localhost:8080/dhis';
const headerOptions  = {
   'Accept': 'application/json',
   'Authorization': `Basic ${btoa('admin:district')}`
}


var rerender = false;
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

export default class PackageList extends Component {
    
   constructor(props){
       super(props);
       this.state = {
        //    packs: [],
           rerender : false
       }
        
       this.handleClick = this.handleClick.bind(this);
       this.forceUpdate = this.forceUpdate.bind(this);
        

   }

    handleClickDelete (pack, event) {


           return fetch(baseUrl+'/api/dataStore/'+catNameSpace+'/'+pack.package_name, {
           headers: headerOptions,
           method: 'delete'
           })
       .then(response => {  
                
               //
               let new_packs = []
               let aux = (!this.state.rerender)?this.props:this.state;
               console.log(aux);
               aux.packs.forEach(res => {
                            
                           if (res.id != pack.id){
                               new_packs[new_packs.length] = res;                              
                           }
                            
                           return res;});
                
                           this.setState({rerender : true,packs: new_packs});
        
               return response.json();  });;

        

   }
    

   handleClick(pack,event) {
    
   function fake_click(obj) {
     let ev = document.createEvent('MouseEvents');
     ev.initMouseEvent(
       'click',
       true,
       false,
       window,
       0,
       0,
       0,
       0,
       0,
       false,
       false,
       false,
       false,
       0,
       null
     );
     obj.dispatchEvent(ev);
   }
   function export_raw(name, data) {
     let urlObject = window.URL || window.webkitURL || window;

     let dataString = JSON.stringify(pack.dataElements) + ',' + JSON.stringify(pack.programs) + ',' +
                      JSON.stringify(pack.dataSets) + ',' + JSON.stringify(pack.indicators);
                        

     console.log('data'+dataString);
     let export_blob = new Blob([dataString]);
     let save_link = document.createElementNS(
       'http://www.w3.org/1999/xhtml',
       'a'
     );
     save_link.href = urlObject.createObjectURL(export_blob);
     save_link.download = name;
       console.log('name'+name);
     fake_click(save_link);
   }
   export_raw(pack.package_name+'.json', pack);
   }

       render(){
            
           const { packs } =  this.props;
            
               console.log(packs);
            
            return (<div>
                           <div style={styles.root}>
                               <Subheader className="home-subheader" inset={true}>SAVED CATALOGUES</Subheader>
                                       
                                      <List>
                                        
                                        
                                        
                                        {packs.map((pack) => (
                                        
                                
                                        
                                       <ListItem
                                         key={pack.id}
                                
                                         initiallyOpen={false}
                                         primaryTogglesNestedList={true}
                                        nestedItems={[
                                       <ListItem key={1} primaryText="Data Elements" leftIcon={<FileFolder />} 
                                           primaryTogglesNestedList={false}
                                           nestedItems={
                                           pack.dataElements.map(data => (
                                            <ListItem
                                                 key={data.id}
                                                 primaryText={data.displayName}
                                                 leftIcon={<ActionLabel />} 
                                                   disabled={true}
                                                    
                                               />
                                               )
                                               )
                                                
                                           }
                                       />,
                                       <ListItem key={2} primaryText="Programs" leftIcon={<FileFolder />}
                                           primaryTogglesNestedList={false}
                                           nestedItems={
                                           pack.programs.map(data => (
                                            <ListItem
                                                 key={data.id}
                                                 primaryText={data.displayName}
                                                 leftIcon={<ActionLabel />} 
                                                   disabled={true}
                                                    
                                               />
                                               )
                                               )
                                                
                                           }
                                       />,
                                       <ListItem key={3} primaryText="Data Sets" leftIcon={<FileFolder />} 
                                           primaryTogglesNestedList={false}
                                           nestedItems={
                                           pack.dataSets.map(data => (
                                            <ListItem
                                                 key={data.id}
                                                 primaryText={data.displayName}
                                                 leftIcon={<ActionLabel />} 
                                                   disabled={true}
                                                    
                                               />
                                               )
                                               )
                                                
                                           }
                                       />,
                                       <ListItem key={4} primaryText="Indicators" leftIcon={<FileFolder />} 
                                           primaryTogglesNestedList={false}
                                           nestedItems={
                                           pack.indicators.map(data => (
                                            <ListItem
                                                 key={data.id}
                                                 primaryText={data.displayName}
                                                 leftIcon={<ActionLabel />} 
                                                   disabled={true}
                                                    
                                               />
                                               )
                                               )
                                                
                                           }
                                       />
                                        
                                        
                                       ]}
                                       >

                                       <Table>                                           
                                           <TableBody displayRowCheckbox={false}>
                                             <TableRow>
                                               <TableRowColumn><FileFileDownload onClick={(e) => this.handleClick(pack, e)} className="material-icons" /> <ActionDelete onClick={(e) => this.handleClickDelete(pack, e)} className="material-icons" /> </TableRowColumn>
                                               <TableRowColumn>{pack.package_name} </TableRowColumn>
                                             </TableRow>
                                           </TableBody>
                                       </Table>
                                        
                                       </ListItem> 
                                       )  )}
                                        
                                        
                                        


                    

                                        
                                        
                                     </List>
                                
                                
                                
                         
                           </div>
                       </div>);
       }


}