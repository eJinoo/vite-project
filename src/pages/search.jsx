import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField} from '@mui/material';
import ProductCard from '../components/product_card';

function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        setFilteredProducts(data);
      })
      .catch(error => console.error(error));
  }, []);

  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    
    const results = products.filter(product =>
      product.title.toLowerCase().includes(query) || product.category.toLowerCase().includes(query)
    );
    setFilteredProducts(results);
  };

  return (
    <Box padding="20px">
      <Typography variant="h4" gutterBottom>
        Search Products
      </Typography>

      <TextField
        label="Search by name or category"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={handleSearchChange}
        sx={{
            marginBottom: '20px',
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'white'
            },
          }}
      />

      <Box display="flex" flexWrap="wrap" gap="20px">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Box key={product.id} width={{ xs: '100%', sm: '48%', md: '23%' }}>
              <ProductCard data={product} />
            </Box>
          ))
        ) : (
          <Typography variant="h6" color="text.secondary">No products found</Typography>
        )}
      </Box>
    </Box>
  );
}

export default Search;
