import React,{useContext,useState} from 'react'
const AppContext = React.createContext()

const AppProvider = ({children})=>{
    // states
    const [loading,setLoading] = useState(false)
    const [cart,setCart] = useState([])
    // const [page,setPage] = useState("")
    const [totalCost,setTotalCost] = useState(0)
    const [search,setSearch] = useState("")
    const [phoneNo,setPhoneNo] = useState(null)
    const [tableNo,setTableNo] = useState(-1) //user


    // localstorage
    const getLocalStorage = () =>{
        let cartItems = localStorage.getItem("cart")
        if(cartItems){
            cartItems = JSON.parse(cartItems)
            console.log("initialised",cartItems)
            return JSON.parse(localStorage.getItem("cart"))
    
        }
        else{
            return []
        }
    }
    // fetchdata
    const fetchData = async()=>{
        setLoading(true);
        const cartItems = getLocalStorage()
        setCart(cartItems);
        setLoading(false);
    }
    useEffect(()=>{
        fetchData()
    },[])
    
    useEffect(()=>{
        localStorage.setItem("cart",JSON.stringify(cart))
    }
    ,[cart])



    return(
        <AppContext.Provider
        value = {{
            loading,setLoading,cart,setCart,totalCost,setTotalCost,
            search,setSearch,phoneNo,setPhoneNo,tableNo,setTableNo

        }}>{children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () =>{
    return useContext(AppContext)
}
export {AppContext,AppProvider}