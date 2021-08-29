import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { authContext } from '../../provider/AuthContext';

import './auth.css';
export const LoginPage = () => {
    const {login} = useContext(authContext)
const [form, onChange] =  useForm({
    email:'test@tes.com',
    password:'123456'
});
const {email, password} = form;
const onSubmit = (e)=>{
    e.preventDefault();
    login(email, password);
}
    return (
        <div className="center">
            <form onSubmit={onSubmit} className="formulario">
           <h1>Sign in</h1>
           <input name="email" value={email} onChange={onChange} type="text" placeholder="username" />
           <input name="password" value={password} onChange={onChange} type="password" placeholder="password" />
           <button className="btn-form">Login</button>
           <Link className="link" to="/register">Register</Link>
        </form>
        
        </div>
    )
}
