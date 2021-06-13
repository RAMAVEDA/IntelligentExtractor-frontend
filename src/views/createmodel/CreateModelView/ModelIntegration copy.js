import React, { useState} from 'react'
// import {post} from 'axios';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import DeleteIcon from "@material-ui/icons/Delete";
import axios from 'axios';
// import CardMedia from '@material-ui/core/CardMedia';
import {Card,CardContent,IconButton,Typography,Box,Input,Button,Divider,TextField,
  makeStyles,CardMedia} from '@material-ui/core'
  import Pagination from '@material-ui/lab/Pagination';
import {
    Table,
    TableCell,
    TableRow,
    FormControl,
    MenuItem,
    InputLabel,
    Select
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  details: {
    display: "flex",
    flexDirection: "column",
    marginTop:"10px"
  },
  content: {
    flex: "1 0 auto",
    width:'100%',
    height:'100%',
  },
  cover: {
    width: 151
  },
}))

var ModelIntegration=(props)=>{

  const [imagename,setImage] = useState('')
  const [page,setPage] = useState(1)
  const [totalpage,setPageTotal] = useState('')
  const [imagelist,setImageList] = useState('')
  const classes = useStyles();
  const url=process.env.REACT_APP_BASE_URL

  const saveDoc=async (e)=>{
    // console.log('check'+imagename)
    // const data = {modelname:props.docname}
    const formData = new FormData()
    formData.append('file',imagename)
    await axios.post(process.env.REACT_APP_BASE_URL+"upload/"+props.modelname,formData)
    .then(res=>{
      var li=[]
      setPageTotal(res.data[1].length)
      res.data[1].map(x=>{
        console.log(imagelist,url+res.data[0]+x)
        li.push(url+res.data[0]+x)
      })
      setImageList(li)
  })}

  const handleChange = (event, value) => {
    setPage(value)
  };
  
  return (
    <div>
    <Card className={(classes.root)}>
        
        {imagelist.length>0?(
        <div className={classes.details}>
        <CardContent className={classes.content}>
        <CardMedia
        component="img"
        padding="100%"
        maxWidth= "345"
        // className={classes.media}
        image={imagelist[page-1]}
        title={"Page"+String(page)}
      />
      <Pagination count={totalpage} showFirstButton showLastButton color="primary" onChange={handleChange}/>
        </CardContent>
        </div>):(<div>
          <input id="icon-button-file" type="file" style={{marginLeft:"10px", marginTop: '30px' }}
      onChange={(e)=>setImage(e.target.files[0])}/>
      <label htmlFor="icon-button-file">
        <IconButton color="primary" aria-label="upload picture" component="span">
        </IconButton>
      </label>
      <button color="primary" onClick={saveDoc}>Submit</button>
        </div>)}
        <div style={{width:'150%',marginTop:"20px"}}>
        <Box margintop='10px'>
        <Typography>Fields Created:</Typography>
        <Table>
            {props.details.map((field,key)=>{  
                return(  <TableRow>
                    <TableCell>
                    <TextField
                    style={{ flex: 1, margin: '0 20px 0 0', background:'white'}}
                    required
                    id="outlined-required"
                    name="fieldname"
                    label="Field Name"
                    value={field.fieldname}
                    variant="outlined"
                    />
                    </TableCell>
                    <TableCell>
                      <TextField
                    style={{ flex: 1, margin: '0 20px 0 0', background:'white'}}
                    required
                    id="outlined-required"
                    name="Datatype"
                    label="Datatype"
                    value={props.datatype[field.type]}
                    variant="outlined"
                    />
                    </TableCell>
                    <TableCell>
                    <TextField
                    style={{ flex: 1, margin: '0 20px 0 0', background:'white'}}
                    required
                    id="outlined-required"
                    name="Mandatory"
                    label="Mandatory"
                    value={props.mandatory[field.mandatory]}
                    variant="outlined"
                    />
                    </TableCell>
                    </TableRow>)
                })
            }
        </Table> 
        </Box>
        </div>
    </Card>
    </div>
  )
    
}


export default ModelIntegration;