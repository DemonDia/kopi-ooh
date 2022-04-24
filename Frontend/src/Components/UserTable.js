import React,{useEffect,useState} from 'react';
import Paper from '@mui/material/Paper';
import { TableContainer } from '@mui/material';
import { Table } from '@mui/material';
import { TableHead } from '@mui/material';
import { TableRow } from '@mui/material';
import { TableCell } from '@material-ui/core';
import { TableBody } from '@mui/material';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import { Modal } from '@mui/material';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import { InputAdornment } from '@mui/material';
import { auth,db } from '../firebase-config';
import { createUserWithEmailAndPassword } from "firebase/auth";
import {useGlobalContext} from "../Contexts/functionalContext"
import { collection,getDocs,setDoc,doc } from "firebase/firestore";


import UserTableRow from './UserTableRow';
function UserTable(props) {
    const {toTitleCase,modalStyle} = useGlobalContext()
    const [open, setOpen] = useState(false);

    const [staff, setStaff] = useState([])
    const [search,setSearch] = useState("")
    
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [email, setEmail] = useState("");

    const staffRef = collection(db,"users")
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
        setFname("")
        setLname("")
        setEmail("")
    
    };


    const createUserRecord = async(userID,userData)=>{
        await setDoc(doc(db, "users", userID), userData);
    }
    const getAllStaff = async ()=>{
           
        const data = await getDocs(staffRef)
        // console.log(data.docs)
        const arr = data.docs.map((doc)=> ({...doc.data(),id:doc.id})).filter(indivStaff => indivStaff.user_type === "staff")
        console.log("a",arr)
        setStaff(arr)
        console.log(staff)
    
    }

    const register = () =>{
        console.log(fname)
        console.log(lname)

        console.log(email)
        const fullName = toTitleCase(fname) + " " + toTitleCase(lname)
        const formattedEmail = email+"@kopioh.com"
        const password =  "Staff123"

        createUserWithEmailAndPassword(auth, formattedEmail, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user.uid)
            const docData = {
                name:fullName,
                email: formattedEmail,
                user_type:"staff"
            };
            createUserRecord(user.uid,docData)
            // setDoc(doc(db, "users", user.uid), docData);

            setOpen(false)
            setFname("")
            setLname("")
            setEmail("")
            getAllStaff()

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });
    }

    useEffect(()=>{
        getAllStaff()
    },[])
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "60%",
        backgroundColor: 'white',
        // border: '2px solid #000',
        display:"grid",
        boxShadow: 24,
        p: 4,
      };

    return (
        <div style = {{"width":"90%","margin":"auto"}}>
        
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>

                            <TableCell align="center" 
                            colSpan = {2}
                            // style = {{"background":"red"}}
                            >
                                <TextField 
                                style = {{"width":"80%"}}
                                id="outlined-basic" label="Search for name" variant="outlined" 
                                value = {search}
                                onChange = {(e)=> { setSearch(e.target.value) }}
                                />
                            </TableCell>
                        
                            <TableCell align = "center"
                            colSpan = {1}>
                            <Button variant="contained" style = {{"backgroundColor":"#7C2222","margin":"20px","padding":"10px",
            "width":"60%"}} 
            onClick = {handleOpen}>Onboard user</Button>
                            </TableCell>
                            <TableCell align = "center"
                            colSpan = {1}>
                            </TableCell>

                        </TableRow>
                    </TableHead>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" colSpan={1}>Name</TableCell>
                            <TableCell align="center" colSpan={1}>Email</TableCell>
                            <TableCell align="center" colSpan={1}>Action</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            staff.filter((indivStaff=> (indivStaff.name.toLowerCase().includes(search.toLowerCase())))).map(indivStaff =>{
                                return(
                                    <UserTableRow indivStaff = {indivStaff} key = {indivStaff.id}/>
                                )       
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={modalStyle}>
                    <Typography id="modal-modal-title" variant="h5" component="h2"
                    style = {{"margin":"10px"}}>
                       Onboard user
                    </Typography>
                    <TextField 
                    required
                    value = {fname}
                    onChange = {(e)=> setFname(e.target.value) }
                    id="outlined-basic" label="First Name" variant="outlined" />
                    
                    <TextField id="outlined-basic" 
                    required
                    value = {lname}
                    onChange = {(e)=> setLname(e.target.value) }
                    label="Last Name" variant="outlined" />

                    <TextField id="outlined-basic" label="Email" 
                    required
                    value = {email}
                    onChange = {(e)=> setEmail(e.target.value) }
                    InputProps={{
                        endAdornment: <InputAdornment position="end">@kopioh.com</InputAdornment>,
                      }}
                    type = "email" variant="outlined" />

                    <Button 
                    onClick = {register}
                    variant="contained" style = {{"backgroundColor":"#7C2222","margin":"20px","padding":"10px"}}> 
                    Onboard user</Button>

                </Box>
            </Modal>
        </div>
    );
}

export default UserTable;