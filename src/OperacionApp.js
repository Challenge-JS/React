import React from 'react'
import { AuthProvider } from './provider/AuthContext'
import { OperacionProvider } from './provider/OperacionContext'
import { AppRoute } from './routes/AppRoute'

export const OperacionApp = () => {
    return (
        <AuthProvider>
            <OperacionProvider>
                <AppRoute/>
            </OperacionProvider>
        </AuthProvider>
    )
}
