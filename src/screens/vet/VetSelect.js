import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'

import VetCard from '../../ui/VetService/Components/VetCard'
import Header from "../../ui/Header/matnavbar";
import Footer from "../../ui/Footer/Footer";
import VetList from '../../assets/data/VetData'
import firebase from "firebase"
import Loader from "../../ui/core/Loader"

function GetData(){
  const [data, setdata] = useState([])

  useEffect(() => {
      firebase
      .firestore()
      .collection('products').doc('vets').collection('profile')
      .onSnapshot((snapshot) =>{
        setdata(snapshot.docs.map(doc => doc.data()))
      })
  }, [])
  return data
}

const VetSelect = () => {
    const data = GetData()
    console.log(data)
    const vetMakerCard = data => {
        return (
          <Grid item xs={12} sm={6} md={4} lg={3}>
            {/* <VetCard {...vetMakerObj} /> */}
            <VetCard {...data} />
          </Grid>
        );
      };

    return (
      <>
        <Header />
     
        <Grid container>
            <Grid xs={1}></Grid>
            {data.length > 0?
            <Grid item container spacing={2} xs={10}>
                    {data.map(doc => vetMakerCard(doc))}
            </Grid> :
            <div><Loader /></div>
            }
            <Grid xs={1}></Grid> 
            
        </Grid>
        <Footer />
        </>
    )
}

export default VetSelect
