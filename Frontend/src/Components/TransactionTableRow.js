import React,{useState,useEffect} from 'react';
import { TableRow } from '@mui/material';
import { TableCell } from '@mui/material';
import { db } from '../firebase-config';
import { query,where,collection ,onSnapshot,doc,updateDoc} from 'firebase/firestore';
function TransactionTableRow(props) {
   const [orderDate,setOrderDate] = useState([])
  

   const checkAllComplete = async() =>{
    //    find orders with transaction data
    
    const itemOrderRef= db.collection("itemOrder")
    const q = query(itemOrderRef,
        where("orderID", "==", props.transaction.id), 
        where("completed", "==", false)
        
        )
    onSnapshot(q,(snapshot)=>{
        const incompletedOrders = []
        snapshot.docs.forEach((doc)=>{
            incompletedOrders.push({...doc.data()})
        })

        changeToTrue()
    })
    

   }

   const changeToTrue = async() =>{
       const allDone = checkAllComplete()
       console.log("allDone",allDone)
     
       if(allDone == true){
           console.log("can complete")
        const transactionRef = doc(db, "transactions", props.transaction.id);
        await updateDoc(transactionRef, {
            completed:true
          });
       }
       else{
        const transactionRef = doc(db, "transactions", props.transaction.id);
        await updateDoc(transactionRef, {
            completed:false
          });
       }
   }



   useEffect(()=>{
    const date = new Date(props.transaction.orderTime.seconds * 1000);
    const datevalues = [
    date.getFullYear(),
    date.getMonth()+1,
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
    ];  
    setOrderDate(datevalues)
    // changeToTrue();
    // checkAllComplete()
   })

    return (
        <TableRow>
            <TableCell align="center">
            {/* {props.transaction.custNum} */}
            +65 xxxx xxxx
            </TableCell>
            <TableCell align="center">
                ${props.transaction.totalCost}
            </TableCell>
            <TableCell align="center">
            {props.transaction.tableNum}
            </TableCell>
            <TableCell align="center">
            {props.transaction.completed == false?
            <>Incomplete</>:<>Complete</>
        }
            </TableCell>
            <TableCell align="center">

                {orderDate[2]}/{orderDate[1]}/{orderDate[0]}, {orderDate[3]}:{orderDate[4]}:{orderDate[5]}
            </TableCell>
        </TableRow>
    );
}

export default TransactionTableRow;