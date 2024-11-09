import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function ProductCard({ data }) {
  return (
    <Link to={`/product/${data.id}`} style={{ textDecoration: 'none' }}>
      <Card sx={{ maxWidth: 345, height: 450, display: 'flex', flexDirection: 'column'}}>
        <CardMedia
          sx={{ height: '100%', width: '100%', objectFit: 'cover' }}
          image={data.image}
          title={data.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {data.title}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            ${data.price}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {data.category}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
}
