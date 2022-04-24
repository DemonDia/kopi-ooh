import React,{useState,useEffect} from 'react';
import {useParams} from "react-router-dom"
// once qr code is scanned, go to menu/cart
import { tableDb } from "../firebase-config";
import { ref, child, get, update } from "firebase/database";

import CircularProgress from '@mui/material/CircularProgress';


function Scan(props) {
    const {tableNum} = useParams()
    const [table,takeTable] = useState([]) //of table details
    const [obtainedTable,setObtainedTable] = useState(false)
    useEffect(()=>{
        console.log(tableNum)
        // check if user has tableNo
        if(localStorage.getItem("tableNum") != null){
             // yes: redirect to menu
            window.location.href = '/menu';
        }
        else{
            const dbRef = ref(tableDb)
            get(child(dbRef, `tables/${tableNum}`)).then((snapshot) => {
                if (snapshot.exists()) {
                
                    console.log(snapshot.val())
                    if(snapshot.val().available == true){
                        const updates = {}
                        updates[`tables/${tableNum}/available`] = false
                        update(dbRef, updates);
                        localStorage.setItem("tableNum",tableNum)
                        window.location.href = '/menu';
            
                    }
                    else{
                        console.log("noo")
                        window.location.href = '/';
                    }
                    
                    takeTable(snapshot.val())

                } else {
                   console.log("not found")
                   window.location.href = '/';
                }
              }).catch((error) => {
                console.error(error);
                window.location.href = '/';
              });

     
// check if available:




            // no: 

                // check if table number is valid
                    // not valid: stuck --> trigger scan
                    // valid: 
                        // check if taken
                            // yes: say error --> trigger scan
                            // no: update firebase database as taken & put in localstorage --> redirect to menu           
        }
           

            

    },[])
    return (
        <div style = {{"marginTop":"80px"}}>
            <h1>Scan</h1>
            <CircularProgress thickness = {2} size = {200} color = {"error"}/>
            <h3>Loading</h3>
            {/* {table.tableId} */}
        </div>
    );
}

export default Scan;