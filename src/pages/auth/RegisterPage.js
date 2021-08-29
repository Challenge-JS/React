import React from 'react'
import { Link } from 'react-router-dom';
import './auth.css';
export const RegisterPage = () => {
    return (
        <div className="center">
            <form className="formulario">
           <h1>Sign up</h1>
           <input type="text" placeholder="username" />
           <input type="password" placeholder="password" />
           <button className="btn-form">Register</button>
           <Link className="link" to="/">Login</Link>
        </form>
        </div>
    )
}
