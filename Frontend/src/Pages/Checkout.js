import React,{useState,useEffect} from 'react';
import CheckoutItem from '../Components/CheckoutItem';
import {useGlobalContext} from "../Contexts/functionalContext"
import EmptyCart from "../Components/EmptyCart"

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';


import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

import { FormLabel } from '@mui/material';
import MuiPhoneNumber from 'material-ui-phone-number';


function Checkout(props) {

    const {cart,phoneNo,setPhoneNo,fetchData,checkedOut} = useGlobalContext()
    const [error,checkForError] = useState(false)
    const [success,checkForSuccess] = useState(false)
    useEffect(()=>{
        if(localStorage.getItem("tableNum") == null){
            window.location.href = '/';
          }
        else{
            fetchData()
            console.log("checkedOut",checkedOut)
        }


    }
    ,[])
    var totalCost = 0;
    var totalGST = 0;
    var totalNettCost = 0;
    const  handleOnChange = (value) =>{
        setPhoneNo(value);
     }

     const haveError = () =>{
            checkForError(false)
            
         
     } 

 

    const placeOrder = () =>{
        // setPhoneNo(phoneNo.replace(/-/g, ""));
        let formattedPhoneNum = phoneNo.replace(/-/g, "");
        console.log("cart",cart)
        console.log("totalCost",totalCost)
        console.log("totalGST",totalGST)
        console.log("totalNettCost",totalNettCost)
        console.log("formattedPhoneNum",formattedPhoneNum)
        // console.log('valid',validatePhoneNo(formattedPhoneNum))
        const valid = validatePhoneNo(formattedPhoneNum)
        if(valid == true){
            checkForSuccess(true)

            console.log("Sent to twilio")
            localStorage.setItem("checkedOut",true)
            localStorage.setItem("phoneNo",formattedPhoneNum)
            checkForError(false)

            window.location.href = '/exit';



            // window.location.href = '/exit';

        }else{
            checkForError(true)
            checkForSuccess(false)
            // haveError();
            console.log("oh no")
            //retype
        }
    }

    const validatePhoneNo = (phoneNumber) =>{

        return  /^\+65 (6|8|9)\d{7}$/.test(phoneNumber)

    }


    return (
        <div style = {{"marginTop":"80px"}}>
{
    cart.length > 0?

           <><h1>Checkout</h1>

            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Name</TableCell>
                            <TableCell align="center">Qty</TableCell>
                            <TableCell align="center">Nett price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                        cart.map(cartItem =>{
                            const itemTotalCost = cartItem.price * cartItem.qty
                            totalCost += itemTotalCost;
                            totalGST += itemTotalCost * 0.07;
                            totalNettCost += itemTotalCost * 1.07;
                            return(
                            <CheckoutItem item = {cartItem} key = {cartItem.id} />
                            )

                        })
                        }
                        <TableRow>
                            <TableCell align="center" colSpan={2}>Total cost</TableCell>
                            <TableCell align="center">${totalCost.toFixed(2)}</TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell align="center" colSpan={2}>7% GST</TableCell>
                            <TableCell align="center">${totalGST.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="center" colSpan={2}>Nett cost</TableCell>
                            <TableCell align="center">${totalNettCost.toFixed(2)}</TableCell>
                        </TableRow>

                    </TableBody>
                </Table>
            </TableContainer>

            {error?<><Alert severity = {"error"}  style = {{"justifyContent": "center"}} >
                    Checkout unsuccessful. Please use a valid phone number
                </Alert></>:<></>}

            {success?<><Alert severity = {"success"}  style = {{"justifyContent": "center"}} >
                Checkout successful.
            </Alert></>:<></>}


            <div className = "btnGrp" style = {{"display":"grid","width":"80%","margin":"auto",
        "marginTop":30}} >
            <FormLabel>Phone number:</FormLabel>
            <MuiPhoneNumber defaultCountry={'sg'} onChange={handleOnChange}
            countryCodeEditable = {false}
            onlyCountries = {["sg"]}/>
                <Button variant="contained" onClick = {placeOrder}  style = {{"backgroundColor":"#620B0B","color":"white","margin":"10px"}} >Place order</Button>
                <Button variant="outlined" href = "/cart" style = {{"backgroundColor":"#5C3131","color":"white","margin":"10px"}} >Cancel</Button>
                                
            </div>
            </> :
            <EmptyCart/>


}
        </div>
    );
}

export default Checkout;