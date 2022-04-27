import React,{useState,useEffect} from 'react';
import { db } from "../firebase-config";
import { collection,getDocs, onSnapshot } from "firebase/firestore";
import MenuItem from "../Components/MenuItem"
import  { isWidthUp } from '@material-ui/core/withWidth';
import { ImageListItem,ImageList } from '@material-ui/core';
import {useGlobalContext} from "../Contexts/functionalContext"
import TextField from '@mui/material/TextField';


function Menu(props) {
    
    const [items,setItems] = useState([])
    const itemsCollectionRef = collection(db,"items")
    const {search,setSearch,fetchData} = useGlobalContext()
    useEffect(()=>{
      // check if u got table no; if dh then u kena kick
      if(localStorage.getItem("tableNum") == null){
        window.location.href = '/';
      }
      else{
        fetchData()


        // console.log(items)

      }

    },[])
    const getItems = async ()=>{
           
      const data = await getDocs(itemsCollectionRef)
      // console.log(data.docs)
      const arr = data.docs.map((doc)=> ({...doc.data(),id:doc.id}))
      console.log("a",arr)
      setItems(arr)
      // console.log(staff)
  
  }
    useEffect(()=>{
      const unsubscribe =  onSnapshot(itemsCollectionRef, snapshot =>{

        getItems()
          // getAllItems()

      })
      return ()=>{
          console.log("unsubscribed")
          unsubscribe()
          
          
      }
   },[])


    const getGridListCols = () => {
        if (isWidthUp('xl')) {
          return 4;
        }
    
        if (isWidthUp('lg')) {
          return 3;
        }
    
        // if (isWidthUp('md')) {
        //   return 2;
        // }
    
        return 2;
      }


    return (
        <div style = {{"marginTop":"80px"}}>
             <h1>Menu</h1>
             {/* <CircularProgress thickness = {2} size = {200} /> */}
             <TextField type = "text" label="Search for coffee" variant="outlined" 
             placeholder = "Type in coffee name" value = {search} onChange = {(e)=>setSearch(e.target.value)}
             style = {{"width":"80%"}}/>
             <ImageList gap={0} rowHeight={"auto"} cols={getGridListCols } style = {{"margin":"auto",
            "justifyContent":"center"}}>
             {
                 items.filter((item=> (item.name.toLowerCase().includes(search.toLowerCase())))).map((item)=>{
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