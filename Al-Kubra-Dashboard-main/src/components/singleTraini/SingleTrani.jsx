import React, { useEffect, useState } from 'react';
import './singleTraini.scss';
import { useGetSingleTraine } from '../../api/traine';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { Email, Phone, LocationCity, Business } from '@mui/icons-material';

const SingleTraini = ({trainiId}) => {

  const { data, status } = useGetSingleTraine(trainiId);

  if(status === 'loading'){
    <h2>Loaidng...</h2>
  }
   

  // const { data , status} = useGetSingleTraine()
  return (
    <Card className="user-card">
    {/* <CardMedia
      component="img"
      height="140"
      image={user.image.url}
      alt={user.name}
    /> */}
    <CardContent>
      <Typography variant="h5">{data?.data.form.name}</Typography>
      <Typography color="textSecondary">
        <Email /> {data?.data.form.email}
      </Typography>
      <Typography color="textSecondary">
        <Phone /> {data?.data.form.phone}
      </Typography>
      <Typography color="textSecondary">
        <LocationCity /> {data?.data.form.district}
      </Typography>
      <Typography color="textSecondary">
        <Business /> {data?.data.form.productionCenter}
      </Typography>
    </CardContent>
  </Card>
  );
};

export default SingleTraini;
