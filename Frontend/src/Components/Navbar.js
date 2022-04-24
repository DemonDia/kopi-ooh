import React, { useEffect,useState } from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Link from '@mui/material/Link';

import { db,auth } from '../firebase-config';
import { signOut, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from 'firebase/firestore';
import {useGlobalContext} from "../Contexts/functionalContext"


import {

    useTheme,
    useMediaQuery,
  } from "@material-ui/core";
function Navbar(props) {
  const {cart,fetchData} = useGlobalContext()

    const theme = useTheme();
    const [tableNum,setTableNum] = useState(-1)
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const [userType,setUserType] = useState("")

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    useEffect(()=>{
      console.log("load")

      onAuthStateChanged(auth, async(user) => {
        if (user) {


        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          console.log("user",docSnap.data().user_type)
          setUserType(docSnap.data().user_type)
          // console.log("Document data:", );
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      

        // find user in firestore
          // ...
        } else {
          setUserType("customer")
          setTableNum(localStorage.getItem("tableNum"))
            // window.location.href = '/login';
          // User is signed out
          // ...
        //   console.log("kosong")
        }
      });



    })
    const logout = ()=>{
      signOut(auth).then(() => {
        localStorage.clear()
        window.location.href = "/login"
        // Sign-out successful.
      }).catch((error) => {
        console.log(error)
        // An error happened.
      });



    }


    return (
        <Box sx={{ flexGrow: 1 }}>
         {
           userType != "customer"?
           <>
          
            <AppBar position="fixed" style = {{"backgroundColor":"#631F1F"}}>
              <Toolbar>
                {isMobile?
                <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick = {()=>setIsDrawerOpen(true)}
              >
                <MenuIcon />
              </IconButton>:<></>
                }
                <Typography variant="h6" component="p" >
                  Kopi-Ohh
                </Typography>

                {isMobile?
                  <Drawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} 
                  >
                  <List style = {{"width":"300px","color":"white","backgroundColor":"#5C3131"}}  > 

        
                    <ListItem button style = {{"width":"300px"}} >
                    <Link href="/admin/home" style = {{"width":"300px"}}  color="inherit">Home</Link>
                    </ListItem>
        
                    <ListItem button  style = {{"width":"300px"}}>
                    <Link onClick = {logout} color="inherit" style = {{"width":"300px"}}>Logout</Link>
                    </ListItem>

                  </List>
                </Drawer>
                :
                <div>
                
                <Button>
                  <Link href="/admin/home" color="inherit" style = {{"color":"white"}}>
                    Home
                  </Link>
                </Button>

                <Button>
                  <Link onClick = {logout} color="inherit" style = {{"color":"white"}}>
                    Logout
                  </Link>
                </Button>
                </div>
                }
              </Toolbar>
            </AppBar>









           </>
           :
           <>
            <AppBar position="fixed" style = {{"backgroundColor":"#631F1F"}}>
              <Toolbar>
                {isMobile?
                <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick = {()=>setIsDrawerOpen(true)}
              >
                <MenuIcon />
              </IconButton>:<></>
                }
                <Typography variant="h6" component="p" >
                  Kopi-Ohh
                </Typography>

                {isMobile?
                  <Drawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} 
                  >
                  <List style = {{"width":"300px","color":"white","backgroundColor":"#5C3131"}}  > 

        
                    <ListItem button style = {{"width":"300px"}} >
                    <Link href="/menu" style = {{"width":"300px"}} color="inherit">
                    Menu {tableNum > 0?<>(Table no: {tableNum})</>:<></> } 
                    {tableNum == 0?<>(Takeaway)</>:<></> } 
                    
                    </Link>
                    </ListItem>
        
                    <ListItem button  style = {{"width":"300px"}}>
                    <Link href="/cart" style = {{"width":"300px"}} color="inherit">Cart ({cart.length})</Link>
                    </ListItem>

                  </List>
                </Drawer>
                :
                <div>
                
                <Button>
                  <Link href="/menu" color="inherit" style = {{"color":"white"}}>
                    Menu {tableNum > 0?<>(Table no: {tableNum})</>:<></> } 
                    {tableNum == 0?<>(Takeaway)</>:<></> } 
                  </Link>
                </Button>

                <Button>
                  <Link href="/cart" color="inherit" style = {{"color":"white"}}>
                    Cart ({cart.length})
                  </Link>
                </Button>
                </div>
                }
              </Toolbar>
            </AppBar>




           </>
         }

      </Box>
    );
}

export default Navbar;