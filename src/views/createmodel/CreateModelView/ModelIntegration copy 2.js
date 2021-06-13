import React, { useState} from 'react'
import axios from 'axios';
import RegionSelect from 'react-region-select'
// import CardMedia from '@material-ui/core/CardMedia';
import {Card,CardContent,IconButton,Typography,Box,Input,Button,Divider,TextField,
  makeStyles,TextareaAutosize} from '@material-ui/core'
import Pagination from '@material-ui/lab/Pagination';
import Alert from '@material-ui/lab/Alert';
import {
    Table,
    TableCell,
    TableRow,
    FormControl,
    MenuItem,
    InputLabel,
    Select,
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
  const [extract,setExtract] = useState([])
  const [imagename,setImage] = useState('')
  const [selected,setSelected] = useState(false)
  const [region,setRegion] = useState([])
  const [regions,setRegions] = useState({1:[],2:[],3:[]})
  const [page,setPage] = useState(1)
  const [totalpage,setPageTotal] = useState(3)
  const [imagelist,setImageList] = useState(
    ['http://127.0.0.1:8000/media/5245cd0b-c65a-4fbe-8129-485e32660037_folder/5245cd0b-c65a-4fbe-8129-485e32660037_0.jpg',
    'http://127.0.0.1:8000/media/5245cd0b-c65a-4fbe-8129-485e32660037_folder/5245cd0b-c65a-4fbe-8129-485e32660037_1.jpg',
    'http://127.0.0.1:8000/media/5245cd0b-c65a-4fbe-8129-485e32660037_folder/5245cd0b-c65a-4fbe-8129-485e32660037_2.jpg'] )
  const classes = useStyles();
  const [dropfield,setDropField] = useState({1:[],2:[],3:[]})
  const [fielderror,setFieldError] = useState('')
  const url=process.env.REACT_APP_BASE_URL

  var coordinateExtract=async ()=>{
    var values=[]
    Object.values(dropfield).map(x=>values=[...values,...x])
    console.log(values)
    // console.log(dropfield,regions) values.length === props.details.length values.length === [...new Set(values)].length)
    if (values.length !== props.details.length){
      setFieldError('Please map all the fields')
    }
    else if(values.length !== [...new Set(values)].length){
      setFieldError('Please select individual label each fields')
    }
    else{
      setFieldError("")
      var coordinates = {}
      Object.keys(regions).map(x=>{
        var temp = {}
        console.log('values',dropfield[x],regions)
        // console.log('page',x,Object.values(regions))
        // if (y.length>0){
        regions[x].map(y=>{
              // console.log('y',dropfield[x],y,[y['data']['index']])
            // if (y1.includes('data')){
              temp[dropfield[x][y['data']['index']]]={
                x:y['x'],
                y:y['y'],
                height:y['height'],
                width:y['width']}
              // console.log('temp:',dropfield[x][y['data']['index']],y)
          // }
        })
          
        
      
        coordinates[x]=temp;
          // else console.log('values1',y)
        })
      // }
      
    
    console.log("coor :",coordinates)
    // var coordinate=[]
    // region.map(e=>{
    //   coordinate.push({
    //   x:e['x'],
    //   y:e['y'],
    //   height:e['height'],
    //   width:e['width']})
    // })
    setExtract([])
    const dict = {
      coordinate:coordinates,
      modelname:props.docName
    }
    var t =''
    await axios.post(process.env.REACT_APP_BASE_URL+"gettext/",dict)
    .then(res=>{
      console.log(res.data,res.data.length)
      // if (Object.keys(res.data).length > 0){
      //   Object.values(res.data).map((x)=>{
      //     t=[...t,x]
      //   })
      //   setExtract(t)
      // }
    })
  }
  }
  var onChange=e=>{
    // console.log('onchange select')
    if (!selected){
    var key =regions
    setRegion(e)
    var k = e
    key[page]=k
    setRegions(key)
    }
  }
  
  const saveDoc=async (e)=>{
    // const data = {modelname:props.docname}
    const formData = new FormData()
    formData.append('file',imagename)
    await axios.post(process.env.REACT_APP_BASE_URL+"upload/"+props.modelname,formData)
    .then(res=>{
      var li=[]
      var pages = {}
      var i = 1
      setPageTotal(res.data[1].length)
      res.data.map(x=>{
        console.log(imagelist,x)

        var v = (x).replace('//m','/m')
        console.log(v,x)
        li.push(v)
        pages[i] = []
        i+=1
      })
      setImageList(li)
      setRegions(pages)
      setDropField(pages)
  })
}

  const handleChange = (event, value) => {
    setPage(value)
  };

  const addDropDown=()=>{
    let items=[<option key='None' value='None'>
      --None--
    </option> ]
    props.details.map(field=>{
      items.push(
        <option key={field.fieldname} value={field.fieldname}>
          {field.fieldname} 
        </option> 
      )
    })
    return items
  }
  const changeRegionData=(x,y)=>{
    let drop = {}
    let select = dropfield
    if (y.target.value !== 'None'){
      var data = y.target.value
      drop=select[page]
      drop[x]=data;
      select[page]=drop
      setDropField(select)
      console.log(select)
    }
    else{
      drop=select[page]
      delete drop[x];
      select[page]=drop
      setDropField(select)
    }
  }
  const regionRenderer =(regionProps)=> {
    // console.log(regionProps.data)
		if (!regionProps.isChanging) {
			return (
				<div style={{ position: 'absolute', right: 0, bottom: '-1.5em' }}>
          
					<select onChange={(event) => changeRegionData(regionProps.data['index'], event)}  value={regionProps.data.dataType}> 
					{
           addDropDown()
          }
					</select>
				</div>
      );
    }
    console.log('ischanging')
  }

  const calculateMaxRegions=()=>{
    if (!selected){
    const values =  Object.keys(regions).filter(x=>x!=page)
    var n = totalpage
    values.map(x=>n-=regions[x].length)
    console.log('total:',n)
    if (n>=0){
    return n}
    setSelected(true)
    return 0
    }
    return 1
  }
  
  return (
    <div>
    <Card className={(classes.root)}>
        
        {imagelist.length>0?(
        <div className={classes.details}>
        <CardContent className={classes.content}>
        <RegionSelect
        // maxRegions={props.details.length}
        maxRegions = {calculateMaxRegions()}
        regions={regions[page]}
        regionStyle={{background: 'rgba(121, 219, 91, 0.5)'}}
        onChange={onChange}
        style={{color:'red'}}
        regionRenderer={regionRenderer}
        >
          <img src={imagelist[page-1]} width='600px' height='750px'/>
        </RegionSelect>
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
                    <TableCell>
                    {extract.length>key?(              
                    
                      <TextareaAutosize
                        style={{ flex: 1, margin: '0 20px 0 0', background:'white'}}
                        aria-label="minimum height"
                        variant="outlined"
                        rowsMin={3}
                        rowsMax={10}
                        placeholder="Select and Click Extract"
                        value={extract[key]}
                        disabled 
                      />
                    
                    ):<div></div>}
                    </TableCell>
                    </TableRow>)
                })
            }
        </Table> 
        </Box>
        
        <Button
                    variant="contained"
                    color="primary"
                    // className={classes.button}
                    // endIcon={<ArrowForwardIcon/>}
                    // href='/'
                    onClick={coordinateExtract}
                    type="submit"
                >
                    Extract Text
        </Button>
        {fielderror!==''?
        <Alert severity="error">{fielderror}</Alert>:<div></div>}
        </div>
        
    </Card>
    </div>
  )
    
}


export default ModelIntegration;