import { Grid, Typography } from '@material-ui/core'
import React from 'react'
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Link } from 'react-router-dom';
import EcommList from "../../assets/data/EcommData";
import EcommCard from '../core/EcommCard';

const useStyles = makeStyles(theme => ({
    headline: {
        borderBottom: '1px solid black',
        paddingBottom: '5px',
        color: '#FG67TG',
        
    },
    
  }));

const EcommSection = () => {

    const classes = useStyles();

    const ecommMakerCard = ecommMakerObj => {
        return (
          <Grid item xs={12} sm={4}>
            <EcommCard {...ecommMakerObj} />
          </Grid>
        );
      };

    return (
        <div>
        <Grid container>
            <Grid item xs={1}></Grid>
            <Grid container item xs={10} direction='column' spacing={2}>
            <div className={classes.headLine} >
                <h3><a className={classes.headLine}>Shop</a></h3>
            </div>
            <Grid item container style={{display: 'flex', justifyContent: 'space-between'}}>
                <Typography>
                    25% OFF on ALL Products
                </Typography>
                <Link to='/ecomm' className='link'>
                <Button className={classes.liitem} variant="contained" color="primary"
              >
                Visit Shop
                </Button>
                </Link>
            </Grid>
                <Grid container spacing={2}>
                    {EcommList.map(ecommMakerObj => ecommMakerCard(ecommMakerObj))}
                </Grid>
            </Grid>
            <Grid item xs={1}></Grid>
        </Grid>
        </div>
    )
}

export default EcommSection
