import React from 'react';
import Button from '@mui/material/Button';
function EmptyCart(props) {
    return (
        <div>
            <h3>Your cart is empty, order something!</h3>
            <Button href = "/menu" variant="contained"
            style = {{"backgroundColor":"#620B0B","color":"white","margin":"10px"}}
            >Order something</Button>
        </div>
    );
}

export default EmptyCart;