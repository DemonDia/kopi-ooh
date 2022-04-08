import * as React from 'react';
import {useState, useEffect} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import {storage} from "../firebase-config"
import { getStorage, ref, getDownloadURL } from "firebase/storage";

import {useGlobalContext} from "../Contexts/functionalContext"

function MenuItem(props) {
    const {cart,setCart,checkedOut} = useGlobalContext()
    const [added,setAdded] = useState(false)

    const [qty,changeQty] = useState(0)
    const [url,setURL] = useState("")
    useEffect(()=>{
        console.log("set cart",cart)
        console.log(checkedOut)
        localStorage.setItem("checkedOut",checkedOut)
        
        localStorage.setItem("cart",JSON.stringify(cart))
    }
    ,[cart])

    const handleChange = (event) =>{
    console.log(event.target.value)
      if(event.target.value<0 ){
        changeQty(0)
      }
      else{
        changeQty(event.target.value)
      }
    
    }

    const addedItem = () =>{
      setAdded(false)
      changeQty(0)

    }


    const handleSubmit = () =>{
      console.log("qty",qty)
      if(qty > 0){

          if(cart.some(item => item.name ===  props.item.name)){

              setCart(cart.map((item)=>{
                  if(item.name ===  props.item.name){
                      return {...item,qty:item.qty +  parseInt(qty) }
                  }
                  return item
              }
              ))
          } else{            
              const newItem = {
              id: props.item.id,
              name : props.item.name,
              price:props.item.price,
              qty : parseInt(qty)
  
          }
          // console.log(newItem)
          
          setCart([...cart,newItem])
          console.log("new cart",cart)
              
          }
          setAdded(true)
          window.setTimeout(addedItem,500)

          changeQty(0)
         
          // check if already in cart
          
          
      }
      changeQty(0)


  }


    // const images = firebase.storage().ref().child('companyImages');
    useEffect(()=>{
      console.log("cart",cart)
      const getImageURL = async ()=>{
        const storage = getStorage()
        const reference = ref(storage,props.item.image) 
        // storage.ref(props.image)
        await getDownloadURL(reference).then((obtained_url) =>{
          setURL(obtained_url)
        })
      }
      // getLocalStorage()
      getImageURL();
    }
    ,[])


    return (
        <Card sx={{ width: 345,maxHeight:400 }}>
          {
            added == false?
            <>
            

            <CardMedia
          component="img"
          height="140"
          image= {url}
          alt= {props.item.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {props.item.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
          ${props.item.price}
          </Typography>
        </CardContent>
        <CardActions>

        <TextField
          id="outlined-number"
          label="Quantity"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{ inputProps: { min: 0 }}}
          value = {qty}
          style = {{"width":"100%"}}
          onChange = {handleChange}
          
        />


        </CardActions>
        {/* {qty} */}
        <Button
         onClick = {handleSubmit}
         >
          Add Cart
        </Button>

            
            
            </>
            
            :
            <div>
            <h2>Added</h2></div>



          }
        {/* <CardMedia
          component="img"
          height="140"
          image= {url}
          alt= {props.item.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {props.item.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
          ${props.item.price}
          </Typography>
        </CardContent>
        <CardActions>

        <TextField
          id="outlined-number"
          label="Quantity"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{ inputProps: { min: 0 }}}
          value = {qty}
          style = {{"width":"100%"}}
          onChange = {handleChange}
          
        />


        </CardActions>
        <Button
         onClick = {handleSubmit}
         >
          Add Cart
        </Button> */}
      </Card>
    );
}

export default MenuItem;