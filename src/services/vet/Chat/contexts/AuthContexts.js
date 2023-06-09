import React, { useContext, useState , useEffect} from 'react';

import { useHistory } from 'react-router-dom';

// import {auth } from '../firebase'
import firebase from 'firebase'

const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({children}) => {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)

    const history = useHistory();

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) =>{
            setUser(user);
            setLoading(false);
            // if (user)  history.push('/vetService/chats')
        })
        
        
    }, [user,history])

    const value = {user}

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}