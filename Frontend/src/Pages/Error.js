import React from 'react';
import Button from '@mui/material/Button';
import { CircularProgress } from '@mui/material';
function Error(props) {
    return (
        <div style = {{"marginTop":80}}>
             <h1>Page not found. Please try again</h1>
             <h2>You can perhaps scan a QR code?</h2>
        </div>
    );
}

export default Error;