import React,{useEffect,useState} from 'react';
import Paper from '@mui/material/Paper';
import { TableContainer } from '@mui/material';
import { Table } from '@mui/material';
import { TableHead } from '@mui/material';
import { TableRow } from '@mui/material';
import { TableCell } from '@material-ui/core';
import { TableBody } from '@mui/material';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import { Modal } from '@mui/material';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import { InputAdornment } from '@mui/material';
import { Input } from '@mui/material';
import { collection,getDocs,setDoc,doc, addDoc,onSnapshot} from "firebase/firestore";


import { ref ,uploadBytesResumable,getDownloadURL, getStorage } from 'firebase/storage';
import { db } from "../firebase-config";
import {useGlobalContext} from "../Contexts/functionalContext"
import ItemTableRow from './ItemTableRow';


const ItemTable = () => {
    // const [progress,setProgress] = useState(0)
    const {toTitleCase,modalStyle} = useGlobalContext()
    const [items,setItems] = useState([])
    const [itemName,setItemName] = useState("")
    const [itemPrice,setItemPrice] = useState(0)
    const [image,setImage] = useState([])
    const [imageURL,setImageURL] = useState([])
    const [search,setSearch] = useState("")
    const itemRef = collection(db,"items")
    const [open, setOpen] = useState(false);

   
    const getAllItems = async ()=>{
           
        const data = await getDocs(itemRef)
        // console.log(data.docs)
        const arr = data.docs.map((doc)=> ({...doc.data(),id:doc.id}))
        console.log("a",arr)
        setItems(arr)
        console.log(items)
    
    }
    const submitItem = () =>{
        if((image.length == 1)&&(itemPrice > 0)&&(itemName !== "")){
            const itemData = {
                name:itemName,
                price:itemPrice,
                image:image[0].name
            }
            console.log(itemData)
            
            // add item inside the db
            addNewItem(itemData)
            
            // add image inside firesstore


            // console.log(image[0].name)
            uploadFiles(image[0])
            getAllItems()
            handleClose()


           
        }
        else{
            console.log("ohno")
        }

    }
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
        setItemName("")
        setItemPrice(0)
        setImage([])
        setImageURL([])
    
    };
    const addNewItem = async(itemData)=>{
        await addDoc(collection(db,"items"),itemData)
        // await setDoc(doc(db, "items"), itemData);
    }

    const uploadFiles = (file) => {
        //
        console.log(file)
        if (!file) return;
        const storage = getStorage();
        const storageRef = ref(storage,file.name) 
        const uploadTask = uploadBytesResumable(storageRef, file);
    
        uploadTask.on(
          "state_changed",
          (snapshot) => {

          },
          (error) => console.log(error),
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log("File available at", downloadURL);
            });
          }
        );
      };


    useEffect(()=>{
        if(image.length == 1){
            const newURL = [];
            image.forEach(img => newURL.push(URL.createObjectURL(img)))
            setImageURL(newURL)
            // setImageURL([imageURL.push(URL.createObjectURL(image[0]))])
            // image[0]
        }
    },
    [image])

    useEffect(()=>{
        const unsubscribe =  onSnapshot(itemRef, snapshot =>{
  
            getAllItems()
            // getAllItems()
 
        })
        return ()=>{
            console.log("unsubscribed")
            unsubscribe()
            
            
        }
     },[])



    // useEffect(()=>{
    //     getAllItems()
    // },[getDocs(itemRef)])

    useEffect(()=>{
        getAllItems()
    },[])

    
    return (
        <div style = {{"width":"90%","margin":"auto"}}>
        
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>

                            <TableCell align="center" 
                            colSpan = {2}
                            // style = {{"background":"red"}}
                            >
                                <TextField 
                                style = {{"width":"80%"}}
                                id="outlined-basic" label="Search for name" variant="outlined" 
                                value = {search}
                                onChange = {(e)=> { setSearch(e.target.value) }}
                                />
                            </TableCell>
                        
                            <TableCell align = "center"
                            colSpan = {2}>
                            <Button variant="contained" style = {{"backgroundColor":"#7C2222","margin":"20px","padding":"10px",
            "width":"60%"}} 
            onClick = {handleOpen}>Add item</Button>
                            </TableCell>


                        </TableRow>
                    </TableHead>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" colSpan={1}>Name</TableCell>
                            <TableCell align="center" colSpan={1}>Price</TableCell>
                            <TableCell align="center" colSpan={2}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            
                            
                            items.filter((item => (item.name.toLowerCase().includes(search.toLowerCase())))).map(item =>{
                                return(
                                   <ItemTableRow item = {item} key = {item.id}/>
                                    // <UseTableRow indivStaff = {item} key = {indivStaff.id}/>
                                )
                                
                            })
                        }


                    </TableBody>
                </Table>
            </TableContainer>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={modalStyle}>
                    <Typography id="modal-modal-title" variant="h5" component="h2"
                    style = {{"margin":"10px"}}>
                       Add new item
                    </Typography>
                    <TextField 
                    required
                    value = {itemName}
                    onChange = {(e)=> setItemName(e.target.value) }
                    id="outlined-basic" label="Item Name" variant="outlined" />
                    
                    <Input id="outlined-basic" 
                    required
                    value = {itemPrice}
                    type = {"number"}
                    onChange = {(e)=> setItemPrice(e.target.value) }
                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    label="Item Price" variant="outlined" />
                    <Box
                    style = {{"height":"200px","width":"200px","margin":"auto","background":"#5C3131","marginTop":"10px",
                    "borderRadius":"10px","display":"flex","alignItems":"center","justifyContent":"center"}}>
                        { 
                        imageURL.length == 1? imageURL.map(imgSrc => <img
                            style = {{"width":"100%"}} src = {imgSrc}></img>):<h5 style = {{"color":"white"}}>Add image</h5>
                        

                        
                        }
                    </Box>
                    {/* <h6>{imageURL[0]}</h6>
                    <h6>{image[0].name}</h6> */}
                    <Button
                    variant="contained"
                    component="label"
                    style = {{"backgroundColor":"#7C2222","margin":"20px","padding":"10px"}}
                    >
                    Upload File
                    <input
                        type="file"
                        hidden
                        required
                        accept="image/*"
                        onChange = {(e)=> setImage([...e.target.files])}
                    />
                    </Button>
                    
                    

                    <Button 
                   
                    variant="contained" style = {{"backgroundColor":"#7C2222","margin":"20px","padding":"10px"}}
                    onClick = {submitItem} > 
                    Add item</Button>
                    
                </Box>
                
                
            </Modal>
            
        </div>
    );
};

export default ItemTable;