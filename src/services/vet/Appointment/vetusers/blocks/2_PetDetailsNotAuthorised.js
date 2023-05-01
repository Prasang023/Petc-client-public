import { TextField } from '@material-ui/core'
import * as React from 'react';
import { useTheme } from '@mui/material/styles';

const names = [
    '',
    'Cat',
    'Dog',
    'Bird',
    'Rabbit',
    'Cattle',
    'Turtle',
    'Other'
  ];

const PetDetailsNotAuthorised = () => {
    const theme = useTheme();
    // const petData = FetchPetList();
    
    
  const [petType, setPetType] = React.useState('');
  const [petname, setpetname] = React.useState('');

  const [desc, setdesc] = React.useState('');

  localStorage.setItem('petType' ,petType)
  localStorage.setItem('desc', desc);
  localStorage.setItem('petName' ,petname)

    return ( 
        <div style={{ display: 'flex', flexDirection: 'column' }}>

            <div style={{ margin: "10px 0px", marginBottom: '20px' }}>

            <TextField
                        id="outlined-multiline-flexible"
                        label="PetName"
                        fullWidth
                        value={petname}
                        name="petName"
                        onChange={(e)=>setpetname(e.currentTarget.value)}
                        style={{ margin: '10px 0px' }}
                    />
            <div>
            <label>Select Species: </label>
            <select style={{ backgroundColor: 'transparent', border: 'thin solid #ccc', padding: '5px', borderRadius: '5px'}} value={petType} onChange={(e)=>setPetType(e.target.value)}>
                {
                    names.map((item, i)=>{
                        return <option ket={i}>{item}</option>
                    })
                }
            </select>
            </div>

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
        </div>
     );
}
 
export default PetDetailsNotAuthorised;