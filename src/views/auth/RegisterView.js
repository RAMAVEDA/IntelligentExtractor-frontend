import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
// import DateFnsUtils from '@date-io/date-fns';
// import { KeyboardDatePicker,MuiPickersUtilsProvider  } from '@material-ui/pickers';
import {
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import axios from 'axios';


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const RegisterView = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  // var {Storage} = require('@google-cloud/storage')
  // const { Storage } = require('@google-cloud/storage');
  // const { Storage } = require('@google-cloud/storage');
  // const storage = new Storage();
  // var s1 = new Storage()
  // 'use strict'

// const {Storage} = require('@google-cloud/storage')
// const storage = new Storage()
// console.log('It worked!')
const {Storage} = require('@google-cloud/storage'); 
console.log(Storage)
  // const Storage = require('@google-cloud/storage')
  // var storage = new Storage({
  //   keyFilename:'extractor-314607-cc9a92774562.json'
  //   });
  // var s2 = storage.bucket('extractor_s1');
  // var bucket = async ()=>{
  //     var [t] = await storage.getBuckets().then(data=>{
  //         var list = document.getElementsById('demo');
  //         data.map(x=>{
  //             var y = document.createElement('li');
  //             y.value = x
  //         })
  //     })
  // } 
  // bucket()
  return (
    <Page
      className={classes.root}
      title="Register"
    >
      <ol id="demo">
        </ol>
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              username: '',
              password: '',
              // dateofbirth: null
            }}
            validationSchema={
              Yup.object().shape({
                username: Yup.string().max(255).required('Username is required'),
                password: Yup.string().max(255).required('password is required'),
                // dateofbirth: Yup.date().required('Date of birth is required')
              })
            }
            onSubmit={async (values) => {
              const userdetails={
                username:values.username,
                password:values.password
                // dateofbirth:values.dateofbirth
              }
              await axios.post(process.env.REACT_APP_BASE_URL+'user/add',userdetails)
              .then((res)=>{
                console.log(res)
                navigate('/login', { replace: true });
              })
              .catch(err=>{
                console.log('Error')
                navigate('/register', { replace: true });
              })
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <Box mb={3}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Create new account
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.username && errors.username)}
                  fullWidth
                  helperText={touched.username && errors.username}
                  label="Username"
                  margin="normal"
                  name="username"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.username}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                />
                {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  format="MM/dd/yyyy"
                  margin="normal"
                  name='dateofbirth'
                  label="Date Of Birth"
                  value={values.dateofbirth}
                  onChange={handleChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
                </MuiPickersUtilsProvider> */}
                <Box
                  alignItems="center"
                  display="flex"
                  ml={-1}
                >
                
                </Box>
                <Box my={2}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sign up now
                  </Button>
                </Box>
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  Have an account?
                  {' '}
                  <Link
                    component={RouterLink}
                    to="/login"
                    variant="h6"
                  >
                    Sign in
                  </Link>
                </Typography>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </Page>
  );
};

export default RegisterView;
