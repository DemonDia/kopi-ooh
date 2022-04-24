import React from 'react';
import { TableRow } from '@mui/material';
import { TableCell } from '@mui/material';
import Button from '@mui/material/Button';
import { db } from '../firebase-config';
import { doc, updateDoc,deleteDoc} from 'firebase/firestore';

// import OrderItemTable,{getAllOrderItems}  from './OrderItemTable';
function OrderItemTableRow(props) {

    // const itemRef = collection(db,"transactions")
    const completeOrder = async() =>{
        console.log(props.itemOrder.orderID)

        const itemOrderRef = doc(db, "itemOrder", props.itemOrder.orderItemID);
        await updateDoc(itemOrderRef, {
            completed: true,
        }).then(async()=>(
        await deleteDoc(doc(db, `transactions/${ props.itemOrder.orderID}/itemOrder`, props.itemOrder.orderItemID
        
          ))))

    }
    
    const finishItem = () =>{
        completeOrder()
        
    }
    return (
        <TableRow>
            <TableCell align="center">
            {props.itemOrder.name}
            </TableCell>
            <TableCell align="center">
                {props.itemOrder.qty }
            </TableCell>
            <TableCell align="center">
            ${(props.itemOrder.price *props.itemOrder.qty).toFixed(2)}
            </TableCell>
            <TableCell align="center">
            {props.itemOrder.completed == false?
            <>Incomplete</>:<>Complete</>
        }
            </TableCell>
            <TableCell  align="center">
                <Button onClick = {()=>{finishItem()}} style = {{"backgroundColor":"#7C2222","padding":"10px","color":"white"}} >Complete</Button>
                {/* <Button>Complete</Button> */}
            </TableCell>
        </TableRow>
    );
}

export default OrderItemTableRow;