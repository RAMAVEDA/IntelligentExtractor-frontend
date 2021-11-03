import React, { useState} from 'react'
import axios from 'axios';
import RegionSelect from 'react-region-select'
// import CardMedia from '@material-ui/core/CardMedia';
import {Card,CardContent,IconButton,Typography,Box,Input,Button,Divider,TextField,
  makeStyles,TextareaAutosize,Snackbar} from '@material-ui/core'
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
    CircularProgress,
    colors
} from '@material-ui/core'
import clsx from "clsx";

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
  button:{
    margin: theme.spacing(1),
    float:"right"
  },
  buttonSuccess: {
    backgroundColor: colors.green[500],
    "&:hover": {
      backgroundColor: colors.green[700]
    }
  },
  buttonProgress: {
    color: colors.green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  },
  upload: {
    
    position: "absolute",
    top: "50%",
    left: "50%"
  }
}))

var ModelIntegration=(props)=>{
  const [extract,setExtract] = useState({})
  const [imagename,setImage] = useState('')
  const [selected,setSelected] = useState(false)
  const [region,setRegion] = useState({})
  const [regions,setRegions] = useState({1:[],2:[],3:[]})
  const [page,setPage] = useState(1)
  const [totalpage,setPageTotal] = useState(3)
  const [imagelist,setImageList] = useState(
    [
    //   'http://127.0.0.1:8000/media/9b6d74ab-5fb3-4e15-a32e-9fac3a103949_folder/9b6d74ab-5fb3-4e15-a32e-9fac3a103949_0.jpg',
    // 'http://127.0.0.1:8000/media/9b6d74ab-5fb3-4e15-a32e-9fac3a103949_folder/9b6d74ab-5fb3-4e15-a32e-9fac3a103949_1.jpg',
    // 'http://127.0.0.1:8000/media/9b6d74ab-5fb3-4e15-a32e-9fac3a103949_folder/9b6d74ab-5fb3-4e15-a32e-9fac3a103949_2.jpg'
    ]
  )
  const classes = useStyles();
  const [dropfield,setDropField] = useState({1:[],2:[],3:[]})
  const [fielderror,setFieldError] = useState('')
  const url=process.env.REACT_APP_BASE_URL
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success
  });

  // ['http://127.0.0.1:8000/media/5245cd0b-c65a-4fbe-8129-485e32660037_folder/5245cd0b-c65a-4fbe-8129-485e32660037_0.jpg',
  //   'http://127.0.0.1:8000/media/5245cd0b-c65a-4fbe-8129-485e32660037_folder/5245cd0b-c65a-4fbe-8129-485e32660037_1.jpg',
  //   'http://127.0.0.1:8000/media/5245cd0b-c65a-4fbe-8129-485e32660037_folder/5245cd0b-c65a-4fbe-8129-485e32660037_2.jpg']
  // var resetextract=()=>{
  //   resetextract1()
  //   resetextract1()
  // }
  var resetextract=()=>{
    console.log('reset')
    var dropfield1={}
    Object.keys(dropfield).map(x=>dropfield1[x]=[])
    var regions1={}
    Object.keys(regions).map(x=>regions1[x]=[])
    console.log(regions1,dropfield1)
    setRegions(regions1)
    // console.log('dropfield1',dropfield,'regions1',regions,'region1',region)
    setDropField(dropfield1)
    setSelected(false)
    setFieldError('')
    setExtract({})
    setRegion({})
    console.log('dropfield',dropfield,'regions',regions,'region',region)

  }
  var savemodel=async ()=>{
    if (Object.keys(extract).length !== props.details.length){
      setFieldError('Please extract all the fields')
      // return ''
    }
    else{
    var coordinates = {}
    Object.keys(regions).map(x=>{
      var temp = {}
      // console.log('page',x,Object.values(regions))
      // if (y.length>0){
      regions[x].map(y=>{
            // console.log('y',dropfield[x],y,[y['data']['index']])
            var page = extract[y['data']['value1']].map(x=>(JSON.parse(x.replaceAll("'",'"'))['page']))
            if(page.length>0){
          // if (y1.includes('data')){
            temp[y['data']['value1']]={
              
              page:page[0],
              x:y['x'],
              y:y['y'],
              height:y['height'],
              width:y['width']}
            }
            // console.log('temp:',dropfield[x][y['data']['index']],y)
        // }
      })
      coordinates[x]=temp;
        // else console.log('values1',y)
      })
    const dict = {
      coordinate:coordinates,
      modelname:props.docName,
      modelID:sessionStorage.getItem('modelid')
      // modelname:"Sakthi'smodel"
    }
    await axios.post(process.env.REACT_APP_BASE_URL+"savemodel",dict)
    .then(res=>{
      console.log(res.data)
      
      setOpen(true);
      setTimeout(function(){
        document.getElementById('dashboard').click();
      }, 3 * 1000);
    })
  }
  }
  var coordinateExtract=async ()=>{
    console.log(dropfield,regions) 
    var values=[]
    
    Object.values(regions).map(x=>{
      if (!Array.isArray(x) ) {
        setFieldError('Please map all the fields')
        return
      }
      console.log(x)
      values=[...values,...x]
    })
    console.log(values,props.details)
    // console.log(dropfield,regions) 
    // values.length === props.details.length values.length === [...new Set(values)].length)
    if (values.length !== props.details.length){
      setFieldError('Please map all the fields')
      return
    }
    else if(values.length !== [...new Set(values)].length){
      setFieldError('Please select individual label each fields')
      return
    }
    else{
      setFieldError("")
      var coordinates = {}
      Object.keys(regions).map(x=>{
        var temp = {}
        var y=''
        console.log('values',dropfield[x],regions[x])
        // console.log('page',x,Object.values(regions))
        // if (y.length>0){
        regions[x].map(y=>{
              // console.log('y',dropfield[x],y,[y['data']['index']])
            // if (y1.includes('data')){
              // y = regions[x]
              console.log(y)
              // if(y.length>0){
              temp[y['data']['value1']]={
                x:y['x'],
                y:y['y'],
                height:y['height'],
                width:y['width']}
              // }
      
        coordinates[x]=temp;
          // else console.log('values1',y)
        })
      // }
      })
      
    
    console.log("coor :",coordinates)
    // setExtract({})
    const dict = {
      coordinate:coordinates,
      modelname:props.docName
      // modelname:"Sakthi'smodel"
    }
    var t =''
    await axios.post(process.env.REACT_APP_BASE_URL+"gettext/",dict)
    .then(res=>{
      console.log(res.data)
      setExtract(res.data)
      
      // console.log(res.data['Field1'].map(x=>(JSON.parse(x.replaceAll("'",'"'))['text'])))
    })
  }
  }
  var onChange=e=>{
    // console.log('onchange select',selected,e)
    if (!selected){
    console.log('on change if',regions,e)
    var key2 =regions
    var key1 = dropfield
    setRegion(e)
    console.log('after if',e)
    var k = e
    key2[page]=k
    key1[page]=e
    console.log('on change if end1',regions,e)
    setRegions(key2)
    console.log('on change if end',regions,e)
    setDropField(key1)
  }
}
  
  const saveDoc=async (e)=>{
    // const data = {modelname:props.docname}
    setSuccess(false);
    setLoading(true);
    const formData = new FormData()
    formData.append('file',imagename)
    formData.append('modelname',props.docName)
    await axios.post(process.env.REACT_APP_BASE_URL+"upload/",formData)
    .then(res=>{
      var li=[]
      var pages = {}
      var i = 1
      setPageTotal(res.data.length)
      res.data.map(x=>{
        console.log(imagelist,x)
        var v = (x).replace('//m','/m')
        console.log(v,x)
        li.push(v)
        pages[i] = []
        i+=1
      })
      console.log(li,pages,regions,dropfield)
      setImageList(li)
      setRegions(pages)
      setDropField(pages)
      setSuccess(true);
      setLoading(false);
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
    try{
    let drop = {}

    console.log('ChangeRegionData1:x,y:',x['index'],y,regions[page][0]['data']['index'],regions[page].findIndex(e=>e['data']['index'] === x['index']))
    
    let index = regions[page].findIndex(e=>e['data']['index'] === x['index'])
    console.log(index)
    let regionss = regions
    if (y.target.value !== 'None'){
      var data = y.target.value
      regionss[page][index]['data']['value1'] = data
      // regions_all[page][regionss[0]['data']['index']]=regionss[0]
      console.log('next',regionss)
      setRegions(regionss)
      // drop=select[page]
      // drop[x['index']]=data;
      // document.getElementById("renderDrop"+String(page)+String(x['index'])).value = data
      // select[page]=drop
      // console.log('new drop',select,data,regions)
      // setDropField(select)

    }
    else{      
      // document.getElementById("renderDrop"+String(page)+String(x['index'])).value = ''
      // drop=select[page]
      // delete drop[x];
      // select[page]=drop
      // setDropField(select)
    }
  }
  catch(e){console.log(e)}
  }
  const regionRenderer =(regionProps)=> {
    // console.log(regionProps.data)
		if (!regionProps.isChanging &&!selected) {
			return (
				<div style={{ position: 'absolute', right: 0, bottom: '-1.5em' }}>
					<select id={"renderDrop"+String(page)+String(regionProps.data['index'])} onChange={(event) => changeRegionData(regionProps.data, event)}  value={regionProps.data.value1}> 
					{
           addDropDown()
          }
					</select>
				</div>
      );
    }
  }

  const calculateMaxRegions=()=>{
    if (!selected){
      console.log('reg',regions,page)
    const values =  Object.keys(regions).filter(x=>x!==String(page))
    console.log(values)
    var n = props.details.length
    // var n = 2
    values.map(x=>{
      n-=regions[x].length
      
    })
    if (n>0){
    // console.log('if total :',n,selected,regions)
    return n
    }
    setSelected(true)
    return 0
    }
    return 0
  }
  
  return (
    <div>
      <a href="/app/dashboard" id="dashboard" hidden>Bootstrap is life </a>
    <Card className={(classes.root)}>
        
        {imagelist.length>0?(
        <div className={classes.details}>
        <CardContent className={classes.content}>
          {console.log('page',regions)}
        <RegionSelect
        // maxRegions={props.details.length}
        maxRegions = {calculateMaxRegions()}
        regions={regions[page]}
        regionStyle={{background: 'rgba(121, 219, 91, 0.5)'}}
        onChange={onChange}
        style={{color:'red'}}
        regionRenderer={regionRenderer}
        >{console.log('maxregion',calculateMaxRegions(),'Regions',regions)}
          <img src={imagelist[page-1]} width='600px' height='750px'/>
        </RegionSelect>
        <Pagination count={totalpage} showFirstButton showLastButton color="primary" onChange={handleChange}/>
        </CardContent>
        
        
    
        </div>):(<div className={classes.upload}>

      <Button
        variant="contained"
        component="label"
        className={classes.button1} 
      >
        Upload File
        <input
          type="file"
          hidden
          onChange={(e)=>setImage(e.target.files[0])}
        />
      </Button>
          <Button className={classes.button} id="icon-button-file" type="file" style={{marginLeft:"10px", marginTop: '30px' }}
          onChange={(e)=>setImage(e.target.files[0])}/>
          <label htmlFor="icon-button-file">
            
          </label>
          <Button 
           color="primary" 
           onClick={saveDoc}
           className={buttonClassname}
           disabled={loading}
          >
            Submit
          </Button>
          {loading && (
          <CircularProgress size={48} className={classes.buttonProgress} />
        )}
        </div>)}
        {imagelist.length>0?(
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
                      {/* {console.log(extract)}
                    {console.log(JSON.parse(extract[field.fieldname]))} */}
                    {extract[field.fieldname]&&(     
                      // <div>{extract[field.fieldname].map(x=>JSON.parse(x.replaceAll("'",'"'))['text'])}</div>
                      <TextareaAutosize
                        style={{ flex: 1, margin: '0 20px 0 0', background:'white'}}
                        aria-label="minimum height"
                        variant="outlined"
                        rowsMin={3}
                        rowsMax={10}
                        placeholder="Select and Click Extract"
                        value={extract[field.fieldname].map(x=>JSON.parse(x.replaceAll("'",'"'))['text']).join(' ')}
                        disabled 
                      />
                    
                    )}
                    </TableCell>
                    </TableRow>)
                })
            }
        </Table> 
        </Box>
        <br></br>
        <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    // endIcon={<ArrowForwardIcon/>}
                    // href='/'
                    onClick={savemodel}
                    type="submit"
                >
                    Save Model
        </Button>
        <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    // endIcon={<ArrowForwardIcon/>}
                    // href='/'
                    onClick={resetextract}
                    type="submit"
                >
                    Reset Extract
        </Button>
        <Button
            variant="contained"
            color="primary"
            className={classes.button}
            // endIcon={<ArrowForwardIcon/>}
            // href='/'
            onClick={coordinateExtract}
            type="submit"
        >
                    Extract Text
        </Button>
                
        <br/><br/><br/>
        {fielderror!==''?
        <Alert severity="error">{fielderror}</Alert>:<div></div>}
         
        </div>):<div></div>}
        <Snackbar open={open} autoHideDuration={5000}>
        <Alert severity="success">
          Saved the model successfully!!!
        </Alert>
      </Snackbar>
        </Card>
    </div>
  )
    
}


export default ModelIntegration;