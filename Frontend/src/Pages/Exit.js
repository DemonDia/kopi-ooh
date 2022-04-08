import React,{useState,useEffect} from 'react';
import {useGlobalContext} from "../Contexts/functionalContext"
import Button from '@mui/material/Button';
import { tableDb } from "../firebase-config";
import { ref, update,get, child } from "firebase/database";
function Exit(props) {
    const [haveTable,setHaveTable] = useState(false)


    useEffect(()=>{
        if(localStorage.getItem("tableNum") != null){
            setHaveTable(true)
            const tableNum = localStorage.getItem("tableNum")
            const dbRef = ref(tableDb)


          get(child(dbRef, `tables/${tableNum}`)).then((snapshot) => {
            if (snapshot.exists()) {
            
                    const updates = {}
                    updates[`tables/${tableNum}/available`] = true
                    update(dbRef, updates);
                    localStorage.setItem("tableNum",tableNum)
                    localStorage.clear();
        
                
                

            } else {
               console.log("not found")
            //    window.location.href = '/';
            }
          }).catch((error) => {
            console.error(error);
            // window.location.href = '/';
          });




        }
        else{
            setHaveTable(false)
        }




    })
        
        

//     },[])
    return (
        


        <div style = {{"marginTop":"80px"}}>

            
            {/* {
                haveTable == true? 
                <>
                <h2>Thank you for your purchase</h2>
                
                </>:
                <>
                <h2>Oops, something went wrong..</h2>
                
                </>
            } */}
            <h2>Thank you for your purchase</h2>
                {/* <Button href = "/menu" variant="contained">Order something</Button> */}

           
       </div>
            
            
        
    

    );
}

export default Exit;