import React,{useEffect,useState} from 'react';
import { ref,onValue } from 'firebase/database';
import { tableDb } from '../firebase-config';
import { TableContainer, TableRow } from '@mui/material';
import { Table } from '@mui/material';
import { TableHead } from '@mui/material';
import { TableBody } from '@mui/material';
import { TableCell } from '@mui/material';
import TableStatusRow from './TableStatusRow';
import Paper from '@material-ui/core/Paper';

function TableStatus(props) {
    const [tables,setTables] = useState([])
    const [highestTableNum,setHighestTableNum] = useState([])
    const setupTables = () =>{
        
    }
    useEffect(()=>{

        const tablesDataRef = ref(tableDb,"tables");
        onValue(tablesDataRef,(snapshot)=>{
            const data = snapshot.val()
            // setTables(data)
            setTables(data)
            // console.log(data)
        })



        });
        
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
    
                            </TableCell>
                        


                        </TableRow>
                    </TableHead>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" colSpan={1}>Table Number</TableCell>
                            <TableCell align="center" colSpan={1}>Availability</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            
                            
                            tables.map(table =>{
                                return(
                                   <TableStatusRow table = {table} key = {table.id}/>
                                    // <UseTableRow indivStaff = {item} key = {indivStaff.id}/>
                                )
                                
                            })
                        }


                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default TableStatus;