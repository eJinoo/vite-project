import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

function Navbar() {
  return (
    <AppBar position="fixed" sx={{ top: 0 }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Umozon
        </Typography>
        <Button color="inherit" component={Link} to="/homePage">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/Search">
          Search
        </Button>
        <Button color="inherit" component={Link} to="/shopping_cart">
          Cart
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
