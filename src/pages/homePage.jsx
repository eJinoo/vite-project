import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material';
import ProductCard from '../components/product_card';
import Notification from '../components/notification';


function HomePage(){
    const [products, setProducts] = useState([]);
    const [openNotification, setOpenNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(response => response.json())
            .then(json => {
                setProducts(json);
                console.log(json, 'products');
            })
            .catch(error => console.error(error));
    
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            if (cart.length > 0) {
              setNotificationMessage('Product added to cart!');
              setOpenNotification(true);
            }
        },
     []);

     const handleCloseNotification = () => {
        setOpenNotification(false);
      };

    return (
        <Box display="grid" gridTemplateColumns="repeat(4, 1fr)" gap="20px">
        {
            products.map((productObject, index) => <ProductCard key={index} data={productObject} />)
        }
            <Notification
            open={openNotification}
            message={notificationMessage}
            onClose={handleCloseNotification}
            />
        </Box>
    )
}

export default HomePage;