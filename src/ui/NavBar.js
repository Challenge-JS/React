import { Button } from 'antd'
import React, { useContext } from 'react'
import { authContext } from '../provider/AuthContext'

export const NavBar = () => {
    const {logout} = useContext(authContext)
    return (
        <nav>
            <h1>Challenge</h1>
            <Button style={{backgroundColor:'#EA2027', color:'white'}} onClick={logout} >LOGOUT</Button>
        </nav> 
    )
}
