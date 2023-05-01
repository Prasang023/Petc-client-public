import { useState ,useEffect } from "react";
import firebase from "firebase"
import Checkbox from '@mui/material/Checkbox';

const id = localStorage.getItem('userId')

function GetLike(){
    const [data,setdata] = useState([])
    useEffect(()=>{
        firebase.firestore()
        .collection('products').doc('vets').collection('profile').doc(id).collection('likes')
        .onSnapshot(snapshot => setdata(snapshot.docs.map(doc=>doc.data())))
    },[])
    return data
}



export default function Test(){
    const data = GetLike()
    const l = data[0]?.like
    console.log(l)
    // const [checked, setChecked] = useState(l);
    const [checked, setChecked] = useState(true);

    const handleChange = (event) => {
        setChecked(event.target.checked);

        const unsubscribe = firebase
            .firestore()
            .collection('products').doc('vets').collection('profile').doc(id).collection('likes').doc(id)
            .set({
                like:event.target.checked
            })
    };
    
    return (
        <div style={{display:'flex' , flexDirection:'column' , alignItems:'center' , justifyContent:'center'}}> 
            <p>This is Test page</p>
            <br />
            <Checkbox
            checked={checked}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled' }}
            />
        </div>
    )
}