import { TextField, Button } from '@material-ui/core'
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';

import firebase from 'firebase';
import { useState, useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import uuid from 'react-uuid'
const names = [
    'Cat',
    'Dog',
    'Bird',
    'Rabbit',
    'Cattle',
    'Turtle',
    'Other'
  ];

  function FetchPetList(){
    const [data,setdata] = useState([])
    const id = firebase.auth().currentUser.uid
    useEffect(()=>{
      firebase
      .firestore()
      .collection('users').doc(id).collection('pets')
      .onSnapshot((snapshot) => setdata(snapshot.docs.map(doc => doc.data())))   
     },[])
     return data
  }

const PetDetails = () => {
    const theme = useTheme();
    const petData = FetchPetList();

    if(window.location.pathname==='/vetService/followup/vetuser')
    var followup = true
    else
    var followup = false

    var previousApp = JSON.parse(localStorage.getItem('previousAppointment'))
    

  const [petType, setPetType] = React.useState(followup?previousApp.petType:[]);
  const [petname, setpetname] = React.useState(followup?previousApp.petName:'');
  const [petId, setpetId] = React.useState(followup?previousApp.petId:null);

  const [addPetName, setaddPetName] = React.useState('');
  const [desc, setdesc] = React.useState('');
  const [addOnFalse, setaddOnFalse] = React.useState(true);

  const [age, setAge] = React.useState('');

  function AddNewPet(){

    if(!addPetName)
    return
    const userId = firebase.auth().currentUser.uid
    const petId = uuid()
    firebase.firestore()
    .collection('users').doc(userId)
    .collection('pets')
    .doc(petId)
    .set({
      petId,
      petName:addPetName,
      specie:petType
    })

    setaddOnFalse(!addOnFalse)

  }
  
  function SetPetId(name){
    const [data , setdata] = useState('');
    const id = firebase.auth().currentUser.uid
    useEffect(()=>{
      firebase
      .firestore()
      .collection('users').doc(id).collection('pets')
      .onSnapshot((snapshot) => setdata(snapshot.docs.map(doc => doc.data())))   
     },[])

     for(var i=0 ; i<data.length ; i++){
      if(data[i]['petName']===name){
        localStorage.setItem('petId' , data[i]['petId'])
        break
      }
     }
     
  }

  SetPetId(petname)
  // const handleChangetemp = (event) => {
  //   setAge(event.target.value);
  // };
  // localStorage.setItem('petName' ,petname)
  localStorage.setItem('petType' ,petType)
  localStorage.setItem('desc', desc);
  localStorage.setItem('petName' ,petname)
  localStorage.setItem('petId', petId);
  
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPetType(
      // On autofill we get a the stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  // const handleChangeName = (event) => {
  //   const arr = (event.currentTarget.value).split(" ");
  //   console.log(arr[0])
  //   setpetname(arr[0])
  // }
  //  localStorage.setItem('petId' , petData[0]?.petId)
    return ( 
        <div style={{ display: 'flex', flexDirection: 'column' }}>

            <div style={{ margin: "10px 0px", marginBottom: '20px' }}>
            <label for="petCategory" style={{ marginRight: "10px" }}>Select Pet:</label>
            <select name="petName" id="petName" style={{ backgroundColor: 'transparent', border: '1px solid #cccccc', borderRadius: '5px', padding: '12px 10px', width: '100%' }} 
            onChange={(e)=> {
              // handleChangeName(e)
            const ans = e.currentTarget.value.split(" ")
              console.log(e.currentTarget.value.split(" "))
              setpetname(ans[0])  
              setpetId(ans[1])  
               }
            } 
            // value={petname}
            disabled={petData[0]?followup:true}>
            {petData[0]?([{petName:'', petId:''},...petData].map((item) => (
                    // console.log(item),
                    <option 
                    selected={item.petName===''?true:false}
                    value={item.petName + ' ' + item.petId}
                    style={{ backgroundColor: 'transparent', border: '1px solid #cccccc' }}
                    >
                    {item.petName}
                    </option>)
                )):
                (<option >
                      No pet available, Please add a Pet
                </option>)
                    }
            </select>
            </div>
            {petData[0]?<div>
              <Button color="primary" variant='outlined' onClick={()=>setaddOnFalse(!addOnFalse)}>{addOnFalse?'Add Pet':'Close'}</Button>
            </div>:null}
            {petData[0] && addOnFalse?null:<div>
            <TextField disabled={followup} fullWidth label='Pet Name'  size="small" value={addPetName}  onChange={(e)=>setaddPetName(e.currentTarget.value)} style={{ margin: "10px 0px" }}/>
          
            <div style={{ margin: "10px 0px", marginBottom: '20px' }}>
            <label for="petCategory" style={{ marginRight: "10px" }}>Pet category:</label>
            <select name="petCategory" id="petCategory" style={{ backgroundColor: 'transparent', border: '1px solid #cccccc', borderRadius: '5px', padding: '8px 10px'}} 
            onChange={(e)=> setPetType(e.currentTarget.value)} value={petType} disabled={followup}>
            {names.map((name) => (
                    <option 
                    value={name}
                    
                    >
                    {name}
                    </option>
                ))}
            </select>
            
            </div>
            <Button color="primary" variant='outlined' onClick={AddNewPet}>Add Pet</Button>
            </div>}

            <TextField
                        id="outlined-multiline-flexible"
                        label="Description (Pet problem)"
                        multiline
                        fullWidth
                        disabled={false}
                        maxRows={4}
                        value={desc}
                        name="desc"
                        onChange={(e)=>setdesc(e.currentTarget.value)}
                        style={{ margin: '10px 0px' }}
                      />

        </div>
     );
}
 
export default PetDetails