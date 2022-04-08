import React, {useState,useEffect} from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { Button } from '@mui/material';
import { ButtonGroup } from '@mui/material';
import { useGlobalContext } from '../Contexts/functionalContext';
function CartItem(props) {
    const {cart,setCart} = useGlobalContext()
    // console.log(props.item)
    const [qty,setQty] = useState(props.item.qty)
    
    
    var totalPrice = props.item.price * props.item.qty

    const dec = () =>{
        if(qty>1){
            setQty(qty-1)
            // props.item.qty = qty
        }
        else{
            // setCart(cart.filter(cartItem =>cartItem.id !== props.item.id).map((cartItem)=>{
            //     console.log("cartItem",cartItem)
            //     return cartItem}
            // )
            // )
            var updatedCart = cart.filter(cartItem =>cartItem.id !== props.item.id).map((cartItem)=>{
                console.log("cartItem",cartItem)
                return cartItem}
            )
            console.log("updatedCart",updatedCart)
            setCart(updatedCart)
            localStorage.setItem("cart", JSON.stringify(updatedCart))
            // console.log(cart)
            
        }
    }

    const inc = () =>{
        setQty(qty+1)
        //  props.item.qty = qty



    }
    

    useEffect(()=>{
        // setQty(qty)

        localStorage.setItem("cart", JSON.stringify(cart
            .map((cartItem)=>{
            if(cartItem.id ===  props.item.id){
                return {...cartItem,qty:qty }
            }
            return cartItem
        }
        )
        ))
        setCart(JSON.parse(localStorage.getItem("cart")))
    },[qty])

    return (
        <TableRow>
            <TableCell align="left">{props.item.name}</TableCell>
            <TableCell align="center">
            <ButtonGroup variant="outlined" aria-label="outlined button group">
                <Button onClick = {dec}>-</Button>
                <Button disabled> {qty}</Button>
                <Button onClick = {inc} >+</Button>
            </ButtonGroup>
                
                
                
                
                {/* {props.item.qty} */}
            
            
            
            
            
            </TableCell>
            <TableCell align="center">${totalPrice.toFixed(2)}</TableCell>

        </TableRow>
    );
}

export default CartItem;

