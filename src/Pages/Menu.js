import React,{useState,useEffect} from 'react';
import { db } from "../firebase-config";
import { collection,getDocs } from "firebase/firestore";
import MenuItem from "../Components/MenuItem"

function Menu(props) {
    const [items,setItems] = useState([])
    const itemsCollectionRef = collection(db,"items")
    useEffect(()=>{
        const getItems = async ()=>{
            const data = await getDocs(itemsCollectionRef)
            console.log(data)
            setItems(data.docs.map((doc)=> ({...doc.data(),id:doc.id})))
            console.log(items)
        

        }
        getItems()
        console.log(items)
    },[])
    return (
        <div>
             <h1>Menu</h1>
             {
                 items.map((item)=>{
                     console.log(item)
                     return (
                         <MenuItem item = {item}/>
                        //  <div key = {item.id}>
                        //      <h2>Name: {item.name}</h2>
                        //      <h2>Price:$ {item.price}</h2>
                        //      <h4>Image: {item.image}</h4>

                        //  </div>
                     )
                 })
             }
        </div>
    );
}

export default Menu;