import React,{useState} from 'react';
import { TableRow } from '@mui/material';
import { TableCell } from '@material-ui/core';
import { Button } from '@mui/material';
import { TextField } from '@mui/material';
import { InputAdornment } from '@mui/material';
import { Input } from '@mui/material';
import { db } from '../firebase-config';
import { doc, updateDoc ,deleteDoc} from "firebase/firestore";
import { getStorage, ref, deleteObject } from "firebase/storage";


function ItemTableRow(props) {
    const [editing,setEditing] = useState(false)
    const [itemName,setItemName]  = useState(props.item.name)
    const [itemPrice,setItemPrice]  = useState(props.item.price)

    const toggleEdit = ()=>{
        setEditing(!editing)
    }

    const saveData = async() =>{
        console.log(itemName)
        console.log(itemPrice)
        const itemRef = doc(db, "items", props.item.id);
        await updateDoc(itemRef, {
            name: itemName,
            price:itemPrice
          });

        // save changes in firestore
        toggleEdit()


    }

    const deleteItem = () =>{
        deleteFromFirestore()
        deleteFromStorage()
        console.log("done")

    }
    const deleteFromFirestore = async() =>{
        await deleteDoc(doc(db, "items", props.item.id));

    }
    const deleteFromStorage = () =>{
        const storage = getStorage();

        // Create a reference to the file to delete
        const imgRef = ref(storage,props.item.image);
        
        // Delete the file
        deleteObject(imgRef).then(() => {
            console.log("Done")
          // File deleted successfully
        }).catch((error) => {
            console.log(error)
          // Uh-oh, an error occurred!
        });




    }
    
    return (
        <TableRow>
            <TableCell align="center" colSpan={1}>
                {
                editing == false?
                props.item.name:
                <TextField 
                required
                value = {itemName}
                onChange = {(e)=> setItemName(e.target.value) }
                id="outlined-basic" label="Edit item Name" variant="outlined" />

                
                }</TableCell>
            <TableCell align="center" colSpan={1}>
                {/* ${props.item.price} */}
                {
                    editing == false? <p> ${props.item.price} </p>:
                    <Input id="outlined-basic" 
                    required
                    value = {itemPrice}
                    type = {"number"}
                    onChange = {(e)=> setItemPrice(e.target.value) }
                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    label="Item Price" variant="outlined" />
                }
                
                </TableCell>
            <TableCell align="center" colSpan={1}>
                {
                editing == false?
                <Button onClick = {toggleEdit} style = {{"backgroundColor":"#7C2222","padding":"10px","color":"white"}} >Edit</Button> :
                <Button onClick = {toggleEdit} style = {{"backgroundColor":"#5B2121","padding":"10px","color":"white"}} >Cancel</Button> 

                }
                
            </TableCell>
            <TableCell align="center" colSpan={1}>
            {
                editing == false?
                <Button onClick = {deleteItem} style = {{"backgroundColor":"#AB0000","padding":"10px","color":"white"}}>Delete</Button> :
                <Button onClick = {saveData} style = {{"backgroundColor":"#7C2222","padding":"10px","color":"white"}}>Save</Button> 

            }
            {/* {props.item.id} */}
                
            </TableCell>
        </TableRow>
    );
}

export default ItemTableRow;
