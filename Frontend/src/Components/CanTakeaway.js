import React from 'react';
import { Button } from '@mui/material';

function CanTakeaway() {
    const redirect_to = () =>{
        window.location.href = "/0"
    }
    return (
        <div style = {{"width":"80%","margin":"20px auto","backgroundColor":"#C4A484","padding":"20px","color":"white",
        "borderRadius":"20px","dropShadow":"0px 0px 4px rgba(0, 0, 0, 0.4);"}}>

            <h2>Welcome to Kopi-Oh!</h2>
            <h4>Please queue to dine in, or tap the button below for takeaway, thank you!</h4>

            <Button style = {{"backgroundColor":"#7C2222","margin":"20px","padding":"10px",
        "width":"60%","color":"white"}}
        onClick = {redirect_to}
        >

                Takeaway
            </Button>

            
        </div>
    );
}

export default CanTakeaway;