import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { authContext } from '../../provider/AuthContext';

import './auth.css';
export const RegisterPage = () => {
    const {register} = useContext(authContext)
    const [form, onChange] =  useForm({
        email:'',
        password:''
    });
    const {email, password} = form;
    const onSubmit = (e)=>{
        e.preventDefault();
        register(email, password); 
    }
    return (
        <div className="center">
            <form onSubmit={onSubmit} className="formulario">
           <h1>Sign up</h1>
           <input name="email" value={email} onChange={onChange} autoComplete="off" type="text" placeholder="username" />
           <input name="password" value={password} onChange={onChange} type="password" placeholder="password" />
           <button className="btn-form">Register</button>
           <Link className="link" to="/">Sign in</Link>
        </form>
        
        </div>
    )
}
