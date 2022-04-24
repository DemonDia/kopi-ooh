import React,{useEffect, useState} from 'react';

import { TableHead } from '@mui/material';
import { TableContainer } from '@mui/material';
import { TableBody } from '@mui/material';
import { TableRow } from '@material-ui/core';
import { TableCell } from '@material-ui/core';
import { Paper } from '@mui/material';
import { Table } from '@mui/material';

import { collection,getDocs,where,doc, query,updateDoc, onSnapshot,getDoc} from "firebase/firestore";
import { db } from "../firebase-config";
import TransactionTableRow from './TransactionTableRow';
import axios from "axios";

function TransactionTable(props) {
    const [transactions,getTransations] = useState([])
    const itemRef = collection(db,"transactions")
    const itemOrderRef = collection(db,"itemOrder")
    const baseURL = "https://kopi-ooh-sms-api.herokuapp.com/";


    
    const getAllItems = async ()=>{
           
        const data = await getDocs(itemRef)
        // console.log(data.docs)
        const arr = data.docs.map((doc)=> (
            {...doc.data(),id:doc.id}
            )).filter((transaction)=>transaction.completed == false)
        console.log("a",arr)
        getTransations(arr)
    
    }

    useEffect(()=>{
       const unsubscribe =  onSnapshot(itemRef, snapshot =>{
           console.log(snapshot.docs)
           snapshot.docs.map(async docs =>{
            console.log("LOL")
               console.log("id",docs.id)
               console.log("data",docs.data())
               const checkForIncompleteQuery = query(itemOrderRef, where("completed","==",false),where("orderID","==",docs.id))
               const results = await getDocs(checkForIncompleteQuery)
               var incompletedOrders = []
               console.log("results",results)
               results.forEach((doc) => {
                 // doc.data() is never undefined for query doc snapshots
                 incompletedOrders.push(doc)
                //  console.log(doc.id, " => ", doc.data());
               });
               console.log(incompletedOrders.length)

               if(incompletedOrders.length ==0){
                const updateTransaction = doc(db, "transactions", docs.id);
                // const completedQuery = query(updateTransaction,where("completed","==",false))
                const isIncomplete = await getDoc(updateTransaction)
                // var isNotcompleted = []
                // isIncomplete.forEach((doc)=>{
                //     isNotcompleted.push(doc.data())
                // })
                console.log(isIncomplete)

               }

           })
           getAllItems()

       })
       return ()=>{
           console.log("unsubscribed")
           unsubscribe()
           
           
       }
    },[])








    


    
    // useEffect(()=>{
    //     getAllItems()
    // },[])

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
                            <TableCell align="center">Customer Number</TableCell>
                            <TableCell align="center">Total Cost</TableCell>
                            <TableCell align="center">Table Number</TableCell>
                            <TableCell align="center">Order Status</TableCell>
                            <TableCell align="center">Order Time</TableCell>
                        </TableRow>

                    </TableHead>
                    {
                        transactions.length == 0?
                        <TableBody>
                            <TableRow>
                                <TableCell colSpan = {5} align = "center">
                                    <h2>No transactions found.</h2>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                        :
                        <TableBody>
                            {
                                transactions.map(transaction =>{
                                    console.log(transaction)
                                    return(
                                        <TransactionTableRow transaction = {transaction}/>
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

export default TransactionTable;