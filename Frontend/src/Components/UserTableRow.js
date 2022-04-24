import React from 'react';
import { TableRow } from '@mui/material';
import { TableCell } from '@material-ui/core';
import { Button } from '@mui/material';
function UseTableRow(props) {
    return (
        <TableRow>
            <TableCell align="center" colSpan={1}>{props.indivStaff.name}</TableCell>
            <TableCell align="center" colSpan={1}>{props.indivStaff.email}</TableCell>
            <TableCell align="center" colSpan={1}>
                <Button style = {{"backgroundColor":"#AB0000","padding":"10px","color":"white"}}>
                    Dismiss
                </Button>
                </TableCell>
        </TableRow>
    );
}

export default UseTableRow;