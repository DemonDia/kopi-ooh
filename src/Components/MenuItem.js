import * as React from 'react';
import {useState} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';

function MenuItem(props) {
    const [qty,changeQty] = useState(0)
    return (
        <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
          alt= {props.item.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.item.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
          ${props.item.price}
          </Typography>
        </CardContent>
        <CardActions>
        <TextField
          id="outlined-number"
          label="Number"
          type="number"
          inputProps={{ min: 1 }}
          InputLabelProps={{
            shrink: true,
          }}
        />
          {/* <Button size="small">Share</Button>

          <Button size="small">Learn More</Button> */}
        </CardActions>
      </Card>
    );
}

export default MenuItem;