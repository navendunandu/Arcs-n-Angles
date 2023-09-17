import React, { useEffect, useState } from 'react';
import './Purchases.css';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import VerifiedIcon from '@mui/icons-material/Verified';
import { NavLink } from 'react-router-dom';
import CancelIcon from '@mui/icons-material/Cancel';
import useDownloader from 'react-use-downloader';
import { Grow } from '@mui/material';

const Purchases = () => {

  const [purchaseDetails, setPurchaseDetails] = useState([]);

  const fetchPurchaseDetails = () => {
    var id = sessionStorage.getItem("uid");
    axios.get(`http://localhost:4000/Purchases/${id}`).then((response) => {
      var data = response.data.Purchase;
      setPurchaseDetails(data);
      console.log(data);
    });
  };

  useEffect(() => {
    fetchPurchaseDetails();
  }, []);

  const { download } =
    useDownloader();

  return (

    <Box>
      <h4>Purchases</h4>
      {purchaseDetails.map((purchase) => (
        <>
          <Grow in timeout={1000}>
            <Card className='purchase_card'>
              <CardContent>
                {purchase.purchase_status == 1 && (
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    <VerifiedIcon className='purchased_icon' />Purchased on {purchase.purchase_date}
                  </Typography>
                )}
                {purchase.purchase_status == 0 && (
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    <CancelIcon className='cancelled_icon' />Cancelled on {purchase.purchase_date}
                  </Typography>
                )}
                <Typography variant="h5" component="div">
                  {purchase.plan_name}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {purchase.category_name} | {purchase.subcategory_name}
                </Typography>
                <Typography sx={{ mb: 1.5 }} variant="body2">
                  {purchase.plan_details}
                </Typography>
                <Typography sx={{ mb: 1.5, display: 'flex' }} color="text.secondary">
                  Plan by <Typography sx={{ ml: .8, color: "black", fontWeight: '500' }} color="text.dark">{purchase.architect_name}</Typography>
                </Typography>
                <Typography color="text.secondary">
                  {purchase.plan_price} ₹
                </Typography>
              </CardContent>
              <CardActions className='card_card'>
                <NavLink to={`/user/plandetails/${purchase.plan_id}`}>
                  <Button size="small" className='purchase_btn'>Show More</Button>
                </NavLink>
                {purchase.purchase_status == 1 && (
                  <Button size="small" className='purchase_btn' onClick={() => download(purchase.plan_file, purchase.plan_file)}>Get File <FileDownloadIcon /></Button>
                )}

              </CardActions>
            </Card>
          </Grow>
        </>
      ))
      }
    </Box >

  )
}

export default Purchases