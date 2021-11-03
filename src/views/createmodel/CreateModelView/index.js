import React, { useState,Component } from 'react';
import {
  Box,
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
// import { Pagination } from '@material-ui/lab';
import Page from 'src/components/Page';
import Toolbar from './Toolbar';
import CreateModel from './CreateModel';
import CreateModelField from './CreateModelField';
import Progress from './Progress'
import data from './data'
import axios from 'axios'
import ModelIntegration from './ModelIntegration'
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

const colortheme = createMuiTheme({
  palette: {
    primary: { main: "#1e87e9", contrastText: "#fff" },
    secondary: { main: "#e91e65", contrastText: "#fff" }
  }
});

class CreateModelView extends Component{
  state ={
    classes : makeStyles((theme) => ({
      root: {
        backgroundColor: theme.palette.background.dark,
        minHeight: '100%',
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(3)
      },
      productCard: {
        height: '100%'
      }
    })),
    modeltypes:data,
    details:
        {
            doc_name:'',
            doc_type:'',
            field_details:[
                {key:1,fieldname:'Field1',type:1,mandatory:false},
                {key:2,fieldname:'Field2',type:1,mandatory:false}
            ]
        },
    step:1,
    modelnames:[],
    alert:'',
    saved:false,
    modeltype:{1:'Character',2:'Integer',3:'date'},
    mandatory:{true:'Yes',false:'No'},
    modfielderror : '',
    
  }
  
  async componentDidMount(){
    var modelnames=[]
    await axios.get(process.env.REACT_APP_BASE_URL+'model')
    .then(res=>{
      console.log(JSON.parse(JSON.stringify(res.data)))
      JSON.parse(JSON.stringify(res.data)).map(model=>{
      modelnames.push(model["modelname"].toUpperCase())
      console.log(modelnames)
    })
  })
    this.setState({ModelName:modelnames})
    console.log(modelnames)
  }
  //Proceed to next step
  nextStep=async ()=>{
    if ((this.state.saved) || (this.state.step !== 2)) {
      this.setState({modfielderror:''})
      const {step} = this.state;
      this.setState({
          step:step+1
      });
      console.log(this.state.step)
    }
    else{
      this.setState({modfielderror: 'Save the Field'})
    }
  }

  prevStep=()=>{
      const {step} = this.state;
      this.setState({
          step:step-1
      });
  }

  handleChange=(i,e)=>{
    if (i === 'ModelName'){
        var modelname=this.state.details
        modelname['doc_name']=e.target.value;
        this.setState({details:modelname})
    }
    else{
      var t = this.state.details
      var index =t.field_details.findIndex(
          p=>{
              return p.key === i
          }
      )
      t.field_details[index][e.target.name]=e.target.value
      this.setState({details:t})
    }
  }

  setValue=(x)=>x;

  addField=()=>{
      var details = this.state.details
      var t = details.field_details.length + 1;
      var newField = {key:t,fieldname:'Field'+String(t),type:1,mandatory:false}
      details.field_details.push(newField)
      this.setState({details:t=details})
  }

  deleteField=()=>{
      var t = this.state.details
      t.field_details.pop()
      this.setState({details:t})
      console.log(this.state.details.field_details)
  }
  
  docChange=(type)=>{
      let details=this.state.details
      details['doc_type'] = type;
      details['doc_name'] = "";
      this.setState({details:details})
      console.log(this.state.details)
      this.nextStep();
  }

  saveState= async (e)=>{
    const {saved} = this.state;
    if (saved){
          return false
    }
    const {doc_type,doc_name,field_details} = this.state.details

    if (this.state.ModelName.includes(doc_name.toUpperCase())){
      
      this.setState({alert:'MODELNAME'})
      e.preventDefault();
      return false
    }
    this.setState({alert:''})
    const list = field_details.filter(
      p=>(p.fieldname !== '')
    )
    if (list.length !== field_details.length | doc_type == '' | doc_name == ''){
      return false
    }
    e.preventDefault();
    console.log('Save process')
    let details=this.state.details
    const fielddetails= []
    details.field_details.map(detail=>{
        fielddetails.push({
            fieldname:detail['fieldname'],
            fieldtype:detail['type'],
            mandatory:detail['mandatory'],
            modelname:details['doc_name']
        })
    })
    
    const modeldetails = {
        modelname:details['doc_name'],
        modeltype:details['doc_type'],
        fieldcount:fielddetails.length
    }
    console.log('axios:',modeldetails,fielddetails)
    await axios.post(process.env.REACT_APP_BASE_URL+'model_field',{modeldetails:modeldetails,fielddetails:fielddetails})
    .then(res=>{
        console.log('Doc',res)
        // fielddetails.map(async field=>{
        //     await axios.post(process.env.REACT_APP_BASE_URL+'field',field)
        //     .then(res=>{
        //       console.log('Field:',res.body)
              sessionStorage.setItem('modelid',res.data)
              this.setState({saved:true})
              console.log(this.state.saved,'saved')
            // })
        // }) 
    })
    .catch(err=>{console.log(err)})
    
  }
  render(){
    console.log('Model.js step:',this.props.value,this.state.step);
      const {step} = this.state;
      const details=this.state.details.field_details;
      const docname = this.state.details.doc_name
      switch(step)
      {
        case 1:
          return (
            <MuiThemeProvider theme={colortheme}>
            <Page
              className={this.state.classes.root}
              title="Create Model"
            >
              <Container maxWidth={false}>
                <Toolbar />
                <Box mt={3}>
                  <Grid
                    container
                    spacing={3}
                  >
                    {this.state.modeltypes.map((model) => (
                      <Grid
                        item
                        key={model.id}
                        lg={4}
                        md={6}
                        xs={12}
                      >
                        <CreateModel
                          className={this.state.classes.productCard}
                          model={model}
                          docChange = {this.docChange}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Box>
                <Box
                  mt={3}
                  display="flex"
                  justifyContent="center"
                >
                </Box>
              </Container>
            </Page>
            </MuiThemeProvider>
        );
        case 2:
          return(
            <MuiThemeProvider theme={colortheme}>
              <div>
              <CreateModelField 
              details={details}
              saveState={this.saveState}
              nextStep={this.nextStep}
              addField={this.addField}
              deleteField={this.deleteField}
              handleChange={this.handleChange}
              setValue={this.setValue}
              alert={this.state.alert}
              save={this.state.saved}
              modfielderror={this.state.modfielderror}
              />
              <Progress value="1"/> 
              </div>
              </MuiThemeProvider>
          )
          case 3:
            return (
            <MuiThemeProvider theme={colortheme}>
            <ModelIntegration 
              details={details} 
              mandatory={this.state.mandatory}
              datatype={this.state.modeltype}
              docName={docname}
              />
              </MuiThemeProvider>
              )
          default:
            return(
            <div>default</div>
            )
        }
      }
};

export default CreateModelView;
