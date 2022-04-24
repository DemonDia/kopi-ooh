import React,{useEffect, useState} from 'react';

import { TableHead } from '@mui/material';
import { TableContainer } from '@mui/material';
import { TableBody } from '@mui/material';
import { TableRow } from '@material-ui/core';
import { TableCell } from '@material-ui/core';
import { Paper } from '@mui/material';
import { Table } from '@mui/material';

import { collection,getDocs,setDoc,doc, addDoc,getDoc,onSnapshot,
query, where,updateDoc} from "firebase/firestore";
import { db } from "../firebase-config";
import OrderItemTableRow from './OrderItemTableRow';
import axios from "axios";

function OrderItemTable(props) {
    const [itemOrders,getItemOrders] = useState([])
    const itemRef = collection(db,"itemOrder")
    const baseURL = " https://kopi-ooh-sms-api.herokuapp.com/";
    const getAllOrderItems = async ()=>{
           
        const data = await getDocs(itemRef)
        // console.log(data.docs)
        const arr = data.docs.map((doc)=> ({...doc.data(),orderItemID:doc.id})).filter(item => item.completed == false)
        console.log("a",arr)
        getItemOrders(arr)
    
    }
    // useEffect(()=>{
    //     getAllOrderItems()
    // },[])

    useEffect(()=>{
        const unsubscribe =  onSnapshot(itemRef,async snapshot =>{
            console.log(snapshot.docs)
            getAllOrderItems()
            snapshot.docs.map(async docs =>{
                console.log("LOL")
                   console.log("docs.orderID",docs.id)
                   console.log("data",docs.data())
                   const orderID = docs.data().orderID
                   const checkForIncompleteQuery = query(itemRef, where("completed","==",false),where("orderID","==",orderID))
                   const results = await getDocs(checkForIncompleteQuery)
                   var incompletedOrders = []
                //    console.log("results",results)
                   results.forEach((doc) => {
                     // doc.data() is never undefined for query doc snapshots
                     incompletedOrders.push(doc)
                    //  console.log(doc.id, " => ", doc.data());
                   });
                //    alert(incompletedOrders.length)
       
                   if(incompletedOrders.length ==0 ){
                    const updateTransaction = doc(db, "transactions", orderID);


                    const getTransaction = await getDoc(updateTransaction);
                    if(getTransaction.exists()){
                        if(getTransaction.data().completed == false){
                            await updateDoc(updateTransaction, {
                                completed: true,
                            }).then(
                                ()=>{
                                    alert("SMS sent")
                                    axios.post(baseURL+"alertUser",{
                                        custNum:getTransaction.data().custNum})
                                }
                                

                            )
                        }


                       }
                    }
                    else{
                        console.log("Error")
                    }
                    

    
               })



 
        })
        return ()=>{
            console.log("unsubscribed")
            unsubscribe()
            
            
        }
     },[])
 

    return (
        <div style = {{"width":"90%","margin":"auto"}}>
            <TableContainer component={Paper} >
                <Table>
                    <TableHead  aria-label="simple table">
                        <TableRow  >
                            {/* queries */}
                            <TableCell colSpan = {5}> </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="center">Item Name</TableCell>
                            <TableCell align="center">Qty</TableCell>
                            <TableCell align="center">Price</TableCell>
                            <TableCell align="center">Completed</TableCell>
                            <TableCell align="center">Action</TableCell>
                             
                        </TableRow>

                    </TableHead>
                    {
                        itemOrders.length == 0?
                        <TableBody>
                            <TableRow>
                                <TableCell colSpan = {5} align = "center">
                                    <h2>No pending orders.</h2>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                        
                        :

                            <TableBody>
                                {
                                    itemOrders.map(itemOrder =>{
                                        console.log(itemOrder)
                                        return(
                                            <OrderItemTableRow itemOrder = {itemOrder} />
                                        )

                                    })
                                }
                            </TableBody>


                    }


                </Table>
            </TableContainer>

        </div>
    );
}

export default OrderItemTable;