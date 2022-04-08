import React from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

function CheckoutItem(props) {
    console.log(props.item)
    var totalPrice = props.item.price * props.item.qty
    return (
        <TableRow>
            <TableCell align="left">{props.item.name}</TableCell>
            <TableCell align="center">{props.item.qty}</TableCell>
            <TableCell align="center">${totalPrice.toFixed(2)}</TableCell>

        </TableRow>
    );
}

export default CheckoutItem;