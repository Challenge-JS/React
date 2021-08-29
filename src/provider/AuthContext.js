

import React, { createContext, useCallback, useState } from 'react'
import Swal from 'sweetalert2';
import { fecthConToken, fecthSinToken } from '../helpers/fetch';


export const authContext = createContext();
const initialState = {
    uid:'',
    email:'',
    checking:true,
    login:false
}

export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState(initialState);

    const login =async(email, password)=>{
        const body = await fecthSinToken('auth/',{email, password}, 'POST');
        if(body.ok){
            const {id:uid, email} = body.usuario;
            const token = body.token;
            localStorage.setItem('token', token);
            setAuth({
                login:true,
                uid,
                email
            });
        }else{
            Swal.fire('Error',body.msg,'error');
        }
        return body;
    }
    const register =async(email, password)=>{
        const body = await fecthSinToken('auth/register',{email, password}, 'POST');
        if(body.ok){
            const {id:uid, email} = body.usuario;
            const token = body.token;
            localStorage.setItem('token', token);
            setAuth({
                login:true,
                uid,
                email
            });
        }else{
            Swal.fire('Error',body.msg,'error');
        }
        return body;
    }
    const verificar =useCallback(
        async() => {
            const body = await fecthConToken('auth/renew');
            if(body.ok){
            const {id:uid, email } = body.usuario;
            const token = body.token;
            localStorage.setItem('token', token);
            setAuth({
                login:true,
                uid,
                checking:false,
                email:email,
            });
        }else{
            setAuth({
                login:'',
                uid:'',
                checking:false,
                email:''
              
            });
        }
        return body;
        },
        [],
    );

    const logout=()=>{
        localStorage.removeItem('token');
        setAuth({
            login:'',
            uid:'',
            checking:false,
            email:'',
           
        });
    }
    
    
    return (
        <authContext.Provider value={
            {
                auth,
                setAuth,
                login,
                verificar,
                logout,
                register
            }
                }>
            {children}
        </authContext.Provider>
    )
}
