import React,{useContext,useState,useEffect} from 'react'
const AppContext = React.createContext()

const AppProvider = ({children})=>{
    // states

    const [cart,setCart] = useState([])
    const [checkedOut,setCheckedOut] = useState(false)
    // const [page,setPage] = useState("")
    const [totalCost,setTotalCost] = useState(0)
    const [search,setSearch] = useState("")
    const [phoneNo,setPhoneNo] = useState("")
    const [tableNo,setTableNo] = useState(-1) //user


    // localstorage
    const getLocalStorage = () =>{
        let cartItems =  localStorage.getItem("cart")
        
        if(cartItems){
            cartItems = JSON.parse(cartItems)
            console.log("initialised",cartItems)
            return JSON.parse(localStorage.getItem("cart"))
    
        }
        else{
            return []
        }
    }
    const toTitleCase = (str) => {
        return str.replace(
          /\w\S*/g,
          function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
          }
        );
      }
    const getCheckOutStatus = () =>{
        let checkedOutStatus =  localStorage.getItem("checkedOut")
        console.log('checkedOutStatus',checkedOutStatus)

        if(checkedOutStatus){
            return checkedOutStatus
        }
        else{
            return false
        }

    }
    const fetchData = async()=>{

        const cartItems =  getLocalStorage()
        const checkedOutStatus =  getCheckOutStatus()
        setCheckedOut(checkedOutStatus)
        setCart(cartItems);

    }

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "60%",
        backgroundColor: 'white',
        // border: '2px solid #000',
        display:"grid",
        boxShadow: 24,
        p: 4,
      };
    
    // useEffect(()=>{
    //     console.log("set cart",cart)
    //     localStorage.setItem("cart",JSON.stringify(cart))
    // }
    // ,[cart])
    // useEffect(()=>{
    //     localStorage.setItem("cart",JSON.stringify(cart))
    // }
    // ,[cart])



    return(
        <AppContext.Provider
        value = {{
            cart,setCart,totalCost,setTotalCost,
            search,setSearch,phoneNo,setPhoneNo,tableNo,setTableNo,
            fetchData,
            checkedOut,setCheckedOut,
            getCheckOutStatus,toTitleCase,
            modalStyle

        }}>{children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () =>{
    return useContext(AppContext)
}
export {AppContext,AppProvider}