import React,{useState,useEffect} from 'react';
import { Card } from '@mui/material';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import { auth } from '../firebase-config';
import { Alert } from '@mui/material';
import { signInWithEmailAndPassword,signOut, onAuthStateChanged } from "firebase/auth";
import { set } from 'firebase/database';

function Login(props) {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [error,setError] = useState(false)
    const [success,setSuccess] = useState(false)

     

    const login_user = () =>{
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        setError(false)
        setSuccess(true)
        const user = userCredential.user;
        window.location.href = '/admin/home';
        console.log("done")
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode)
        console.log(errorMessage)
        setSuccess(false)
        setError(true)
    });
    }
    
    useEffect(()=>{

        // signOut(auth).then(() => {  // Sign-out successful.
        //     console.log("signed out")
        //   }).catch((error) => {  // An error happened.
        //     console.log("oh no")
        //   });

          onAuthStateChanged(auth, (user) => {
            if (user) {

            window.location.href = '/admin/home';
              // ...
            } else {
              // User is signed out
              // ...
              console.log("kosong")
            }
          });
    },[])


    return (
        <Card style = {{"width":"60%","margin":"auto"}}> 
            <div  style = {{"background":"#631F1F","color":"white","padding":"20px"}}>
                <h1>Staff Login</h1>
            </div>
            <div>
            <TextField
                style = {{"width":"60%","marginTop":"40px"}}
            required
            id="outline-required"
            label="Email"
            defaultValue={email}
            onChange = {(e)=>{setEmail(e.target.value)}}
            />
            
            <TextField
            style = {{"width":"60%","marginTop":"40px"}}
          required
          type = "password"
          id="password-required"
          label="Password"
          defaultValue={password}
          onChange = {(e)=>{setPassword(e.target.value)}}
           
            />


            </div>
            <Button variant="contained" style = {{"backgroundColor":"#7C2222","margin":"20px","padding":"10px",
        "width":"60%"}} onClick = {login_user}>Login</Button>
        {
          error == true? <Alert severity="error">Login failed! </Alert>:<></>
        }
        {
          success == true? <Alert severity="success">Login successful! </Alert>:<></>
        }
        
        </Card>

    );
}

export default Login;