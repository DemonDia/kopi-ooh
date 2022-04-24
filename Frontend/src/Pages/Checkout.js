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

import { Modal } from '@mui/material';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';


import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { db } from '../firebase-config';
import { collection,getDocs,setDoc,doc ,serverTimestamp,addDoc,updateDoc} from "firebase/firestore";

import { FormLabel } from '@mui/material';
import MuiPhoneNumber from 'material-ui-phone-number';
import axios from "axios"

function Checkout(props) {

    const {cart,phoneNo,setPhoneNo,fetchData,checkedOut} = useGlobalContext()
    const [error,checkForError] = useState(false)
    const [success,checkForSuccess] = useState(false)
    const [isLoading,setIsLoading] = useState(false)
    const baseURL = "https://kopi-ooh-sms-api.herokuapp.com/";

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'white',
        // border: '2px solid #000',
        borderRadius:"10px",
        boxShadow: 24,
        color:"black",
        margin:"auto",
        justifyContent:"center",
        display:"grid",
        p: 4,
      };

    // init
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


 




     const addCartItemsToOrder = (orderID,formattedPhoneNum)=>{
        cart.map(async cartItem =>{
            console.log(cartItem)
            cartItem = {...cartItem,orderID:orderID,completed:false}
            const res = await addDoc(collection(db, `itemOrder`), cartItem);
            console.log(res.id)

        })



        console.log("added all")


     }
    const placeOrder = async () =>{
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
            // localStorage.setItem("phoneNo",formattedPhoneNum)
            checkForError(false)
            formattedPhoneNum = formattedPhoneNum.replace(" ","")
            

            const orderData = {
                custNum:formattedPhoneNum,
                totalCost:totalCost,
                orderTime:serverTimestamp(),
                tableNum: localStorage.getItem("tableNum"),
                completed:false
            }
// add transaction into database
            const addOrder = await addDoc(collection(db, "transactions"), orderData);
            addCartItemsToOrder(addOrder.id)
            axios.post(baseURL+"sendReceipt",{
                custNum:formattedPhoneNum,
                items:cart,
                totalCost:totalCost,
                totalGst:totalCost*0.07,
                nettCost:totalCost*1.07,
                tableNum: localStorage.getItem("tableNum")
    
            }).then(resp => {
                console.log(resp.data);
                alert("Receipt sent!")
                window.location.href = '/exit';
            })
            .catch(err => {
                // Handle Error Here
                console.error(err);
            });
            
            await new Promise((resolve) => {
                setIsLoading(true)
                setTimeout(resolve, 4500)});
            window.location.href = '/exit';
   
            
           
            // addCartItemsToDoc(addOrder.id)


// promise: add items as child


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
    

           <>
          
          
          
          <Modal
        open={isLoading}
        // open = {true}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx = {modalStyle}>
          <Typography variant = "h3">Processing</Typography>
          <hr></hr>
          <Typography variant = "h6">Your order is processing</Typography>
          <CircularProgress thickness = {2} size = {200} color = {"error"}/>


     
         

        </Box>
      </Modal>          
          
          
          
          
          
          
          
          
           <h1>Checkout</h1>

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
                            <TableCell align="center" colSpan={2}>Raw cost</TableCell>
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