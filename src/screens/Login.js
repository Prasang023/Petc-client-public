import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import firebase from 'firebase';
import {useState , useEffect}  from 'react'
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {GoogleOutlined} from '@ant-design/icons'

import login from '../assets/images/others/login.jpg';

import VerifyScreen from '../ui/Login/VerifyScreen'

// const getImageUrl = ()=>{
//   let link;
//   axios.get("https://api.unsplash.com/photos/random?query=pets&client_id=<ACCESS_KEY>")
//   .then((res)=>{
//     console.log(res)
//     // const obj = JSON.parse(res)
//     link = res.data.urls.regular
//   })
//   return link
// }
var actionCodeSettings = {
    
  url: 'https://www.petc.in/',
  // iOS: {
  //   bundleId: 'com.example.ios'
  // },
  // android: {
  //   packageName: 'com.example.android',
  //   installApp: true,
  //   minimumVersion: '12'
  // },
  // handleCodeInApp: true,
  // When multiple custom dynamic link domains are defined, specify which
  // one to use.
  // dynamicLinkDomain: "example.page.link"
};

const Login = (props) => {
    const { history, location } = props
    let test = false
    // const {email, setEmail , password , setPassword , emailError, setEmailError , passwordError , setPasswordError, handleLogin , handleSignup , hasAccount , setHasAccount} = props;
    if (location.pathname === '/login'){
      test = true;
    }
    else{
      test = false; 
    }

    const [data, setdata] = useState({
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      phoneno: ''
    })
    const theme = useTheme();
    const [user, setUser]  = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError , setPasswordError] = useState('')
    const [hasAccount, setHasAccount] = useState(test)
    const [forget, setForget] = useState(false)
    const [imageURL, setImageURL] = useState('')
    const [verifyScreen, setVerifyScreen] = useState(false)

    // useEffect(() => {
    //   axios.get(`https://api.unsplash.com/photos/random?query=pets&client_id=${process.env.REACT_APP_UNSPLASH_KEY}`)
    //   .then((res)=>{
    //     console.log(res)
    //     // const obj = JSON.parse(res)
    //     // link = res.data.urls.regular
    //   })
    // }, [])
  
    const clearInput = () => {
      setEmail('')
      setPasswordError('')
    }
  
    const clearError = ()  => {
      setEmailError('')
      setPasswordError('')
    }  
  
    const handleLogin = () => {
      
      clearError()
      
      // firebase.auth().currentUser.sendEmailVerification(actionCodeSettings)
      // firebase.auth().currentUser.sendEmailVerification()
      // .then(() => {
      //     // console.log(firebase.auth().currentUser.uid)
      //     // console.log(firebase.auth().currentUser.email)
      //     console.log('email verification send')
      // })
      // .catch(function(error) {
      //     // Error occurred. Inspect error.code.
      //     console.log(error)
      // });
      firebase
        .auth()
        .signInWithEmailAndPassword(data.email, data.password)
        .then(()=>{
          // if(!isVerified)
          //   window.alert('verify email!')
          var isVerified = firebase.auth().currentUser.emailVerified
          if(!isVerified){
            firebase.auth().currentUser.sendEmailVerification(actionCodeSettings)
            toggleVerifyScreen()
            handleLogout()
          } else {
            history.push('/')
          }
        })
        .catch((err => {
          switch(err.code){
            case 'auth/invalid-email':
            case 'auth/user-disabled':
            case 'auth/user-not-found':
              setEmailError(err.message)
              break;
            case 'auth/wrong-password':
              setPasswordError(err.message)
              break;
          }
        }))
        
       
    }
  
    const handleSignup = () =>{
      
      clearError()
      
      firebase
        .auth()
        .createUserWithEmailAndPassword(data.email, data.password)
        .catch((err => {
          switch(err.code){
            case 'auth/email-already-in-use':
            case 'auth/invalid-email':
              setEmailError(err.message)
              break;
            case 'auth/weak-password':
              setPasswordError(err.message)
              break;
          }
        }))
        .then((e)=>{
          const id = firebase.auth().currentUser.uid
          firebase.firestore()
          .collection('users').doc(id).set({
            name: data.name,
            id: id,
            gender:'',
            imageUrl:'',
            pincode:'',
            city:'',
            mobile: data.phoneno,
            addressLine1:'',
            addressLine2:'',
            email: data.email,
          })
          firebase.auth().currentUser.sendEmailVerification(actionCodeSettings)
          var isVerified = firebase.auth().currentUser.emailVerified
          if(!isVerified){
            setVerifyScreen(true)
            handleLogout()
            // history.push('/verify email page')
            // window.alert('verify email!')
          }
        })
    }
  
  
  const handleLogout = () => {
    firebase.auth().signOut();
  }
  
  
  const authListner = () => {
    firebase.auth().onAuthStateChanged(user =>{
      if(user){
        clearInput()
        setUser(user);
        localStorage.setItem('userId',user.uid)
        // if(location.pathname === '/login' )
        // history.push('/')
        // else if(location.pathname === '/signup')
        // history.push('/')
        // else
        // history.push(location.pathname)
      }else{
        setUser('');
      }
    })
  }
  
  
  useEffect(() => {
    authListner();
  }, [])


  const handleChange = (e) => {
    const { name, value } = e.target

    if(name==='phoneno'){
      if (value.charCodeAt(value.length-1)<48 || value.charCodeAt(value.length-1)>57)
      return
    }

    setdata({
      ...data,
      [name]: value
    })
  }










  const handleSignin = (event) => {
    event.preventDefault();
    // const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    
      setEmail(data.email)
      setPassword(data.password)
      handleLogin()
      
    };

    const handleRegister = (event) => {
      event.preventDefault();
      // const data = new FormData(event.currentTarget);
      // eslint-disable-next-line no-console
      if((data.name).length===0){
        setEmailError('Name cannot be empty')
        return
      }
      if((data.phoneno).length!==10){
        setEmailError('Phone no should be of 10 digits')
        return
      }
      
        setEmail(data.email)
        setPassword(data.password)
        if(data.password === data.confirmPassword){
        handleSignup()
      } else {
        setEmailError('Password and Confirm Password should be same')
      }
        
      };

      function Reset(){
        // console.log(email)
        if(!data.email){
          setEmailError('Please Enter a Valid Email')
          return
        }
        firebase.auth().sendPasswordResetEmail(data.email)
        .then(() => {
        setEmailError('Check Your Inbox for the Reset Link')
        })
        .catch((error) => {
        // const errorCode = error.code;
        setEmailError(error.code + ':' + error.message);
        // ..
        });
        window.alert('Please check your email for password reset link')
    }

    const toggleVerifyScreen = () => {
      setVerifyScreen(!verifyScreen);
    }

    // const link = getImageUrl() 
    // console.log(link)

  return (
    
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${login})`, 
            // 'url(https://source.unsplash.com/random?collections=Pets)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          {verifyScreen? <VerifyScreen toggleVerifyScreen={toggleVerifyScreen} /> :
          hasAccount?(
            forget?
            <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Forget Password
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Enter Email"
                name="email"
                autoComplete="email"
                autoFocus
                value={data.email}
                onChange={handleChange}
              />
              </Box>
              <Button onClick={Reset} variant='contained'>Reset Password</Button>
              <Link onClick={()=>setForget(!forget)} variant="body2" style={{ cursor: 'pointer' }}>
                    Back to Login 
                  </Link>
              </Box>
            :
            <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={data.email}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={data.password}
                onChange={handleChange}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleLogin}
              >
                Sign In
              </Button>
              {/* <div 
                    className="login-button google"
                    onClick={() => firebase.auth().signInWithRedirect(new firebase.auth.GoogleAuthProvider())}
                > 
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      <GoogleOutlined />Sign In With Google
                    </Button>
                </div> */}
              <Grid container>
                <Grid item xs>
                  <Link onClick={()=>setForget(!forget)} variant="body2" style={{ cursor: 'pointer' }}>
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Typography variant="body2">
                    Don't have an account? <a href="#" onClick ={() => setHasAccount(!hasAccount) }>Sign Up</a>
                  </Typography>
                </Grid>
              </Grid>
              
            </Box>
          </Box>
          ) : (  // ---------------------------------------/////////////-------------------------------------------------------- ////////////////////
            <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box component="form" noValidate onSubmit={handleRegister} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoFocus
                value={data.name}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={data.email}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="phoneno"
                label="Phone Number"
                name="phoneno"
                autoFocus
                value={data.phoneno}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={data.password}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="password"
                value={data.confirmPassword}
                onChange={handleChange}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleRegister}
              >
                Sign Up
              </Button>
              <Grid container>
                <Grid item>
                  <Typography variant="body2">
                    Already have an account? <a href="#" onClick ={() => setHasAccount(!hasAccount) }>Sign In</a>
                  </Typography>
                </Grid>
              </Grid>
              
            </Box>
          </Box>
          ) 
          }
          
          <div style={{ margin: "5px 0px", padding: '5px', backgroundColor: theme.palette.background.main, color: "red", width: "100%", display: emailError?'flex':'none', alignItems: "center", justifyContent: "center"}}><p>{emailError}</p></div>
          <div style={{ margin: "5px 0px", padding: '5px', backgroundColor: theme.palette.background.main, color: "red", width: "100%", display: passwordError?'flex':'none', alignItems: "center", justifyContent: "center"}}><p>{passwordError}</p></div>
          
          
        </Grid>
      </Grid>
    
  );
}

export default Login