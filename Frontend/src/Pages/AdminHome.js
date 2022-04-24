import React, { useEffect,useState } from 'react';
import { auth } from '../firebase-config';
import { onAuthStateChanged } from "firebase/auth";
import { db } from '../firebase-config';
import { doc, getDoc } from 'firebase/firestore';
import UserTable from '../Components/UserTable';
import ItemTable from "../Components/ItemTable";
import TransactionTable from '../Components/TransactionTable';
import OrderItemTable from '../Components/OrderItemTable';
import TableStatus from '../Components/TableStatus';
// import SalesChart from '../Components/SalesChart';

import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

import { Box } from '@mui/system';
function AdminHome(props) {
    const [userType,getUserType] = useState(null)
    const[currPage,setCurrPage] = useState(0);


    const handleChange = (event,newValue) =>{
      localStorage.setItem("currPage",newValue)
      setCurrPage(newValue)
  }

    useEffect(()=>{



        onAuthStateChanged(auth, async(user) => {
            if (user) {


            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
            
            if (docSnap.exists()) {
              getUserType(docSnap.data().user_type)
              // console.log("Document data:", );
            } else {
              // doc.data() will be undefined in this case
              console.log("No such document!");
            }
            
            if(localStorage.getItem("currPage")){
              setCurrPage(parseInt(localStorage.getItem("currPage")))
            }
            else{
              localStorage.setItem("currPage",0)
            }
            // find user in firestore
              // ...
            } else {
                window.location.href = '/login';
              // User is signed out
              // ...
            //   console.log("kosong")
            }
          });
    })



    return (
        <div>
            <h1>Admin Home</h1>
            {
              userType == "owner"?
              <>
                <Box style = {{"width":"100%","minHeight":"100vh","backgroundColor":"#C4A484"}}>
                    <Tabs value={currPage} onChange={handleChange} aria-label="tabs"
                      variant="scrollable"
                      scrollButtons="auto"
                    >
                      <Tab label="Users" />
                      <Tab label="Menu items"/>
                      <Tab label="Pending orders"/>
                      <Tab label="Pending Order items"/>
                      <Tab label="Check tables"/>
                    </Tabs>
                    <Box hidden = {currPage != 0}>
                      <UserTable/>
                    </Box>
                    <Box hidden = {currPage != 1}>
                      <ItemTable/>
                    </Box>
                    <Box hidden = {currPage != 2}>
                      <TransactionTable/>
                    </Box>
                    <Box hidden = {currPage != 3}>
                      <OrderItemTable/>  
                    </Box>
                    <Box hidden = {currPage != 4}>
                    <TableStatus/>
                    </Box>

                </Box>

              </>
              :
              <>
                <Box style = {{"width":"100%","minHeight":"100vh","backgroundColor":"#C4A484"}}>
                    <Tabs value={currPage} onChange={handleChange} aria-label="tabs">

                      <Tab label="Transactions"/>
                      <Tab label="Order items"/>
                    </Tabs>
                    <Box hidden = {currPage != 0}>
                    <TransactionTable/>
                    </Box>
                    <Box hidden = {currPage != 1}>
                    <OrderItemTable/>  
                    </Box>
                    
                </Box>




              </>
            }

            
        </div>
    );
}

export default AdminHome;