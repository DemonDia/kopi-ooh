import React from 'react';
import { TableRow } from '@mui/material';
import { TableCell } from '@material-ui/core';
function TableStatusRow(props) {
    return (
        <TableRow>
            <TableCell align="center">
            {props.table.tableId}
            </TableCell>
            <TableCell align="center">
                {props.table.available == true?
                <>Available</>
                :
                <>Taken</> }
            </TableCell>

        </TableRow>
    );
}

export default TableStatusRow;