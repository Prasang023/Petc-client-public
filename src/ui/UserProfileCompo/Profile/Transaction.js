import {  useState  , useEffect} from "react";
import { Button } from '@material-ui/core'
import { TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import firebase from 'firebase'

const Transaction = (props) => {
    const { userData } = props;
    const [open, setOpen] = useState(false);
    const [address, setAddress] = useState({
        name: '',
        houseno: '',
        area:'',
        city:'',
        landmark:'',
        state:'',
        pincode:'',
    });

    function GetTransactions(){
      const [data,setdata] = useState([])
      const id = firebase.auth().currentUser.uid
      useEffect(()=>{
        firebase
        .firestore()
        .collection('users').doc(id).collection('payments')
        .onSnapshot((snapshot) => setdata(snapshot.docs.map(doc => doc.data())))   
       },[])
      
      
      return data
    }

    const transactions = GetTransactions()
    function handleChange(e) {
        const {name, value} = e.target
        if(name === 'pincode'){
            let x=String(value)
            if(isNaN(x.charAt((x.length) - 1)) )
            return;
        }
        setAddress({
            ...address,
            [name]: value
        })
    }

    const addAddress = () => {
        // Add address to database address array
    }

    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

    //  console.log(userData) 
    const deleteAddress = (item) =>{
        const address = (userData.address)?.filter(address =>(address!==item).map(filteredAddress => filteredAddress))
        // Update database with new list of addresses
    }
    console.log(transactions)
  return <div style={{ width: '100%' }}>
      <h3>Transaction History</h3>
              {/* <div style={{ display: 'flex', justifyContent: 'space-between'}}>
              <p >Vet consultation<br/><p style={{ color: '	#808080' }}>24th feb</p></p> 
              <p>Rs. 249 item.time.seconds</p>
              </div> */}
                {transactions?.map((item) =>
                  (<div style={{ display: 'flex', justifyContent: 'space-between', margin: '5px 0px', width: '100%' }}>
                  <p >{item.name}Vet Consultation<br/><p style={{ color: '	#808080' }}>{item.paymentId}<br/>{(item.time).toString()}</p></p> 
                  <p>Rs. {item.price}</p>
                  </div>)
                
                )}
                {/* <div style={{ display: 'flex', justifyContent: 'space-between', margin: '3px 0px'}}>
              <p >{item.name}<br/>
              <p style={{ color: '	#808080' }}>{item.time.seconds}</p>
              </p> 
              <p>{item.price}</p>
              <p>{item.appointmentId}</p>
              </div> */}
  </div>;
};

export default Transaction;
