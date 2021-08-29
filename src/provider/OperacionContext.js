import { createContext, useReducer } from "react";
import React from 'react'

import { usePeticion } from "../hooks/usePeticion";
import { peticionReducer } from "../reducer/peticionReducer";
import { fecthConToken } from "../helpers/fetch";
import Swal from "sweetalert2";


export const operacionContext = createContext();
const initialState={
    cheking:true,
    operaciones:[],
    open:false,
    ingreso:0,
    egreso:0
}

export const OperacionProvider = ({children}) => {
    const [state, dispatch] = useReducer(peticionReducer, initialState);
    const js = 'operacion';

    const {peticion} = usePeticion(dispatch);

    const getOperaciones =async()=>{
        const body = await fecthConToken('operacion/');
        if(body.ok){
            dispatch({
                type:'getOperaciones',
                payload:body
            })
        }
    }

    const newOperacion =(data)=>peticion('newOperacion','operacion/',js,data,'POST');

    const deleteOperacion =async(data)=>{
        const body = await fecthConToken(`operacion/${data.id}`,{},'DELETE');
        if(body.ok){
            dispatch({
                type:'deleteOperacion',
                payload:data,
                last:data.monto
            })
        }else{
            Swal.fire('Error',body.msg,'error');
        }
    }; 
    const editOperacion =async(data)=>{
        const body = await fecthConToken(`operacion/${data.id}`,data,'PUT');
        if(body.ok){
            dispatch({
                type:'editOperacion',
                payload:body.operacion,
                last:body.lastMonto
            })
        }else{
            Swal.fire('Error',body.msg,'error');
        }
    }; 

    

    return (
        <operacionContext.Provider value={
            {
                state,
                dispatch,
                getOperaciones,
                newOperacion,
                deleteOperacion,
                editOperacion,
            }
            }>
            {children}
        </operacionContext.Provider>
    )
}
