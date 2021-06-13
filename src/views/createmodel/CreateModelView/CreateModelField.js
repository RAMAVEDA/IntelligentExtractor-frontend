// import './CreateModelField.css';
import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import {Typography,Box,Button,Divider,TextField} from '@material-ui/core'
import {
    Table,
    TableCell,
    TableRow,
    FormControl,
    MenuItem,
    InputLabel,
    Select
} from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab';


const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
      float: "right"
    },
    root: {
        width: '100%',
        maxWidth: 500,
      },
      text: {
        margin: theme.spacing(1)
      }
  }));
var CreateModelField =(props)=>{ 
    const classes = useStyles();
    return(<Box marginTop="20px">
        <form onSubmit={props.saveState}>
        <Typography align="center" variant="h2">Model Configuration</Typography><br/>
        <Divider/>
        <Box marginTop="20px" marginLeft="10px">
        <Typography variant='h5'>Pickup feilds to design your document....</Typography>
        <Box marginTop="20px" >
            <TextField
            style={{ flex: 1, margin: '0 20px 0 0', background:'white'}}
            required
            id="outlined-required"
            name="modelname"
            label="Model Name"
            variant="outlined"
            helperText={props.error? "Name already present":null}
            error={props.error}
            onChange={(e)=>props.handleChange('ModelName',e)}
            />
            {(props.alert==='MODELNAME')?<Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            Model Name already present — <strong>Enter new name!</strong>
            </Alert>:<br/>}
            <Box className={classes.button}>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    endIcon={<ArrowForwardIcon/>}
                    // href='/'
                    onClick={(e)=>{props.nextStep();}}
                    type="submit"
                >
                    Next
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={props.saveState}
                    type="submit"
                    disabled={props.save}
                // onClick={props.saveState}
                >
                    Save
                </Button>
                {props.modfielderror!==''?
                    <Alert severity="error">{props.modfielderror}</Alert>:<div></div>}
                <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<DeleteIcon />}
                    className={classes.button}
                    id='Delete'
                    onClick={props.deleteField}
                >
                Delete Field
                </Button>
                <Button
                    variant="contained"
                    color="default"
                    className={classes.button}
                    startIcon={<AddIcon />}
                    onClick={props.addField}
                >
                    Add Field
                </Button>
                
                
            </Box> 
        </Box>       
        </Box>
        <Box marginTop="10px" marginLeft="10px">
            <Table align='left'>
            <colgroup>
                <col style={{width:'200px'}}/>
                <col style={{width:'150px'}}/>
                <col style={{width:'100px'}}/>
            </colgroup>
            {props.details.map((field,key)=>{  
                return(  <TableRow>
                    <TableCell>
                    <TextField
                    style={{ flex: 1, margin: '0 20px 0 0', background:'white'}}
                    required
                    id="outlined-required"
                    name="fieldname"
                    label="Field Name"
                    defaultValue={props.setValue(field.fieldname)}
                    variant="outlined"
                    // value={(e)=>handleChange(field.key,e)}
                    onChange={(e)=>props.handleChange(field.key,e)}
                    />
                    </TableCell>
                    <TableCell>
                    <FormControl variant="outlined" 
                    style={{ flex: 1, margin: '0 20px 0 0', background:'white'}}>
                        <InputLabel id="demo-simple-select-outlined-label">Datatype</InputLabel>
                        <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={props.setValue(field.type)}
                        onChange={(e)=>props.handleChange(field.key,e)}
                        name = "type"
                        label="Datatype"
                        required
                        >
                        <MenuItem value={1}>Character</MenuItem>
                        <MenuItem value={2}>Integer</MenuItem>
                        <MenuItem value={3}>Date</MenuItem>
                        </Select>
                    </FormControl>
                    </TableCell>
                    <TableCell>
                    <FormControl 
                    variant="outlined" 
                    style={{ width:'100px', flex: 2, margin: '0 20px 0 0', background:'white'}}>
                        <InputLabel id="demo-simple-select-outlined-label">Mandatory</InputLabel>
                        <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={props.setValue(field.mandatory)}
                        onChange={(e)=>props.handleChange(field.key,e)}
                        name = "mandatory"
                        label="Mandatory"
                        required
                        >
                        <MenuItem value={true}>Yes</MenuItem>
                        <MenuItem value={false}>No</MenuItem>
                        </Select>
                    </FormControl>
                    </TableCell>
                    <TableCell>
                    </TableCell>
                    </TableRow>)
                })
            }
        </Table> 
        {/* <Box align='center' marginTop='50px'>
            <Button
                variant="contained"
                color="secondary"
                startIcon={<DeleteIcon />}
                id='Delete'
                onClick={props.deleteField}
            >
            Delete Field
            </Button>
        </Box> */}
        </Box> 
        </form>
    </Box>)
    
}

export default CreateModelField;
