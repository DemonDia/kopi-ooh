import React, { useEffect } from 'react';
import Exit from '../Pages/Exit';
import Error from '../Pages/Error';
import { useGlobalContext } from '../Contexts/functionalContext';
const ProtectedExit = () => {
    const [fetchData] = useGlobalContext()
    useEffect(()=>{
        fetchData()
// check for status
    },[])
    return (
        <div>
            
        </div>
    );
};

export default ProtectedExit;