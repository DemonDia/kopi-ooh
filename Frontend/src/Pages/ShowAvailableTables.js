import React,{useEffect, useState} from 'react';
import { ref,onValue } from 'firebase/database';
import { tableDb } from '../firebase-config';
import  { isWidthUp } from '@material-ui/core/withWidth';
import { ImageListItem,ImageList } from '@material-ui/core';
import CanTakeaway from '../Components/CanTakeaway';
import { db } from '../firebase-config';
import { doc, getDoc } from 'firebase/firestore';
import { signInWithEmailAndPassword,signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase-config';
function ShowAvailableTables() {
    const [tables,setTables] = useState([])
    const [currTime,setCurrTime] = useState("")


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


      const timer =() =>{
        var currentTime = new Date()
       var hours = currentTime.getHours()
       var minutes = currentTime.getMinutes()
       var sec = currentTime.getSeconds()
       if (minutes < 10){
           minutes = "0" + minutes
       }
       if (sec < 10){
           sec = "0" + sec
       }
       var t_str = hours + ":" + minutes + ":" + sec + " ";
       if(hours > 11){
           t_str += "PM";
       } else {
          t_str += "AM";
       }
       setCurrTime(t_str)
       setTimeout(timer,1000);
    }


    useEffect(()=>{
        timer();

        onAuthStateChanged(auth, async(user) => {
            if (user) {


            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
            
            if (docSnap.exists()) {
                window.location.href = "/admin/home"

                } 

            } 
            else{
                var tableNum = localStorage.getItem("tableNum")

                if( tableNum != null){
                    window.location.href = '/'+tableNum;
                }
                else{
                    const tablesDataRef = ref(tableDb,"tables");
                    onValue(tablesDataRef,(snapshot)=>{
                        const data = snapshot.val()
                        // setTables(data)
                        setTables(data.filter(table => (table.available == true && table.tableId != 0)))
                        // console.log(data)
                    })


                }
            }


          })



        });

        


        
    return (
        <div 
        
        style = {{ "margin":"10px","marginTop":"80px",
        "boxShadow":"0px 0px 5px rgba(0, 0, 0, 0.4)", "justifyContent":"center","display":"grid",
        "alignContent":"center"
        }}
        
        
        >
            <h1>No of Available tables: {tables.length} </h1>
            <h2>Current time: {currTime} </h2>
            <CanTakeaway/>
        </div>
    );
}

export default ShowAvailableTables;