import React,{useState,useEffect} from 'react';
import { db } from "../firebase-config";
import { collection,getDocs } from "firebase/firestore";
import MenuItem from "../Components/MenuItem"
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import { ImageListItem,ImageList } from '@material-ui/core';
import {useGlobalContext} from "../Contexts/functionalContext"
function Menu(props) {
    
    const [items,setItems] = useState([])
    const itemsCollectionRef = collection(db,"items")
    const {cart,fetchData} = useGlobalContext()
    useEffect(()=>{
      // check if u got table no; if dh then u kena kick
      if(localStorage.getItem("tableNum") == null){
        window.location.href = '/';
      }
      else{
        fetchData()
        const getItems = async ()=>{
            const data = await getDocs(itemsCollectionRef)
            console.log(data)
            setItems(data.docs.map((doc)=> ({...doc.data(),id:doc.id})))
            console.log(items)
        
        }
        getItems()
        console.log(items)

      }

    },[])



    const getGridListCols = () => {
        if (isWidthUp('xl')) {
          return 4;
        }
    
        if (isWidthUp('lg')) {
          return 3;
        }
    
        if (isWidthUp('md')) {
          return 2;
        }
    
        return 1;
      }


    return (
        <div style = {{"marginTop":"80px"}}>
             <h1>Menu</h1>
             <ImageList gap={0} rowHeight={350} cols={getGridListCols} style = {{"margin":"auto",
            "justifyContent":"center"}}>
             {
                 items.map((item)=>{
                     console.log(item)
                     
                     return (
                        <ImageListItem key={item.id} cols={1} style = {{"margin":10,
                        "boxShadow":" 0px 0px 5px rgba(0, 0, 0, 0.4)"
                        }}>
                         <MenuItem item = {item}/>
                        </ImageListItem>
                     )
                     
                 })
             }
             </ImageList>
        </div>
    );
}

export default Menu;