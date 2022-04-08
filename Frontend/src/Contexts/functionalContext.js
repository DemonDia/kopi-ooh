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
            getCheckOutStatus

        }}>{children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () =>{
    return useContext(AppContext)
}
export {AppContext,AppProvider}