import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
//import Notification from '../components/notification'; notifications couldn't choose where to put it

function ProductDetails() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  //const [openNotification, setOpenNotification] = useState(false);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${productId}`)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setProduct(data)
      })
      .catch(error => console.error(error));
  }, [productId]);

//   const handleCloseNotification = () => {
//     setOpenNotification(false);
//   };

  const addToCart = () => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    navigate('/homePage');
    //setOpenNotification(true);

  };

  // const rating = product.rating.rate === true ? product.rating.rate : "No ratings yet";

  return (
    <Box padding="20px">
      <Typography variant="h4">{product.title}</Typography>
      <img src={product.image} alt={product.title} style={{ width: '200px' }} />
      <Typography variant="body1">{product.description}</Typography>
      <Typography variant="h6">Category: {product.category}</Typography>
      <Typography variant="h6">Price: ${product.price}</Typography>
      {/* <Typography variant="h6">Rating: {rating}</Typography> */}
      <Button 
        variant="contained" 
        color="primary" 
        onClick={addToCart} 
        sx={{ marginTop: '20px' }}>
        Add to Cart
      </Button>
      {/* <Notification
        open={openNotification}
        message="Product added to cart!"
        onClose={handleCloseNotification}
      /> */}
    </Box>
  );
}

export default ProductDetails;
