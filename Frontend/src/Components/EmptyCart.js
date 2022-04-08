import React from 'react';
import Button from '@mui/material/Button';
function EmptyCart(props) {
    return (
        <div>
            <h3>Your cart is empty, order something!</h3>
            <Button href = "/menu" variant="contained">Order something</Button>
        </div>
    );
}

export default EmptyCart;