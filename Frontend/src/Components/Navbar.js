import * as React from 'react';
import {useState} from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Link from '@mui/material/Link';
import {

    useTheme,
    useMediaQuery,
  } from "@material-ui/core";
function Navbar(props) {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);


    return (
        <Box sx={{ flexGrow: 1 }}>
         
        <AppBar position="fixed" style = {{"backgroundColor":"#631F1F"}}>
          <Toolbar>
            {isMobile?
            <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick = {()=>setIsDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>:<></>
            }
            <Typography variant="h6" component="p" >
              Kopi-Ohh
            </Typography>

            {isMobile?
              <Drawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} 
              >
              <List style = {{"width":"300px","color":"white","backgroundColor":"#5C3131"}}  > 

    
                <ListItem button style = {{"width":"300px"}} >
                <Link href="/menu" color="inherit">Menu</Link>
                </ListItem>
    
                <ListItem button  style = {{"width":"300px"}}>
                <Link href="/cart" color="inherit">Cart</Link>
                </ListItem>

              </List>
            </Drawer>
            :
            <div>
            
            <Button>
              <Link href="/menu" color="inherit" style = {{"color":"white"}}>
                Menu
              </Link>
            </Button>

            <Button>
              <Link href="/cart" color="inherit" style = {{"color":"white"}}>
                Cart
              </Link>
            </Button>

     
            </div>
            }



            {/* <Button color="inherit">Login</Button> */}
          </Toolbar>
        </AppBar>
      </Box>
    );
}

export default Navbar;