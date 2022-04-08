import React,{useState,useEffect} from 'react';
import CartItem from '../Components/CartItem';
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

function Cart(props) {
    const {cart,setCart,fetchData,getCheckOutStatus} = useGlobalContext()
    useEffect(()=>{
        if(localStorage.getItem("tableNum") == null){
            window.location.href = '/';
          }
        else{
        fetchData()
        getCheckOutStatus()
        }
    }
    ,[])
    const emptyCart = () =>{
        localStorage.setItem("cart",JSON.stringify([]));
        setCart([])
       
    }
    // useEffect(()=>{
    //     fetchData()

    // },[cart])

    var totalCost = 0;
    var totalGST = 0;
    var totalNettCost = 0;

    return (
        <div style = {{"marginTop":"80px"}}>
{
    cart.length > 0?

           <><h1>Cart</h1>

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
                            totalCost += Math.round(itemTotalCost * 100) / 100
                            ;
                            totalGST += itemTotalCost * 0.07;
                            totalNettCost += itemTotalCost * 1.07;
                            return(
                            <CartItem item = {cartItem} key = {cartItem.id} />
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
            <div className = "btnGrp" style = {{"display":"grid","width":"80%","margin":"auto",
        "marginTop":30}} >
                <Button variant="contained" href = "/checkout"
                 style = {{"backgroundColor":"#620B0B","color":"white","margin":"10px"}} >Checkout</Button>
                <Button variant="outlined" style = {{"backgroundColor":"#5C3131","color":"white","margin":"10px"}} href = "/menu">Back to menu</Button>
                <Button variant="outlined"
                style = {{"backgroundColor":"#5C3131","color":"white","margin":"10px"}}
                onClick = {emptyCart}
                >Empty cart</Button>
                
                
            </div>
            </> :
            <EmptyCart/>


}
        </div>

    );
}

export default Cart;