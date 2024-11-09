import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Card, CardContent, CardMedia, IconButton } from '@mui/material';
import { RemoveShoppingCart } from '@mui/icons-material';
import Notification from '../components/notification';
import { useNavigate } from 'react-router-dom';

function ShoppingCart() {
  const [cart, setCart] = useState([]);
  const [openNotification, setOpenNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = storedCart.map(item => ({
        ...item,
        quantity: item.quantity || 1,
      }));
    setCart(updatedCart);
  }, []);

  const increaseQuantity = (productId) => {
    const updatedCart = cart.map((item) => {
      if (item.id === productId) {
        item.quantity += 1;
      }
      return item;
    });
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const decreaseQuantity = (productId) => {
    const updatedCart = cart.map((item) => {
      if (item.id === productId && item.quantity > 1) {
        item.quantity -= 1;
      }
      return item;
    });
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeItemFromCart = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCart(updatedCart);
    setNotificationMessage('Item removed from cart!');
    setOpenNotification(true);
  };

  const clearCart = () => {
    localStorage.removeItem('cart');
    setCart([]);
    setNotificationMessage('Cart cleared!');
    setOpenNotification(true);
  };

  const calculateTotal = () => {
    return cart.reduce((total, product) => total + (product.price * product.quantity), 0).toFixed(2);
  };

  const handleCheckout = () => {
    setNotificationMessage('Checkout successful! Thank You for your purchase.');
    setOpenNotification(true);
    navigate('*')
  };

  return (
    <Box padding="20px">
      <Typography variant="h4" gutterBottom>
        Your Cart
      </Typography>
      
      {cart.length === 0 ? (
        <Typography variant="h6">Your cart is empty</Typography>
      ) : (
        cart.map((product, index) => (
          <Card key={index} sx={{ display: 'flex', marginBottom: '20px' }}>
            <CardMedia
              component="img"
              sx={{ width: 150 }}
              image={product.image}
              alt={product.title}
            />
            <CardContent sx={{ flex: 1 }}>
              <Typography variant="h6">{product.title}</Typography>
              <Typography variant="body2" color="text.secondary">
                ${product.price} x {product.quantity}
              </Typography>
            </CardContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <IconButton 
                color="primary" 
                onClick={() => increaseQuantity(product.id)} 
                sx={{ marginBottom: '5px' }}
              >
                + 
              </IconButton>
              <IconButton 
                color="primary" 
                onClick={() => decreaseQuantity(product.id)} 
                sx={{ marginBottom: '5px' }}
              >
                - 
              </IconButton>
              <IconButton 
                color="error" 
                onClick={() => removeItemFromCart(index)} 
                sx={{ alignSelf: 'flex-start', marginTop: '10px', marginRight: '10px' }}
              >
                <RemoveShoppingCart />
              </IconButton>
            </Box>
          </Card>
        ))
      )}

      {cart.length > 0 && (
        <>
          <Typography variant="h5" sx={{ marginTop: '20px' }}>
            Total: ${calculateTotal()}
          </Typography>
          <Button 
            variant="contained" 
            color="secondary" 
            sx={{ marginTop: '20px' }} 
            onClick={clearCart}
          >
            Clear Cart
          </Button>
          <Button 
            variant="contained" 
            color="primary" 
            sx={{ marginTop: '20px' }} 
            onClick={handleCheckout}
          >
            Checkout
          </Button>
        </>
      )}
      <Notification
        open={openNotification}
        message={notificationMessage}
        onClose={() => setOpenNotification(false)}
      />
    </Box>
  );
}

export default ShoppingCart;
