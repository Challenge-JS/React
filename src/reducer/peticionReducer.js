const initialState={
    cheking:true,
    operaciones:[],
    open:false,
    ingresos:0,
    egresos:0
}

export const peticionReducer = (state=initialState,action) => {
    switch (action.type) {
        case 'getOperaciones':
            return {
                ...state,
                operaciones:action.payload.operaciones,
                ingresos:action.payload.ingresos,
                egresos:action.payload.egresos
            }
        case 'newOperacion': 
            return {
                ...state,
                operaciones:[...state.operaciones,action.payload],
                ingresos: action.payload.tipo === 'INGRESO' ? parseInt(state.ingresos) + parseInt(action.payload.monto) : state.ingresos ,
                egresos: action.payload.tipo === 'EGRESO' ? parseInt(state.egresos) + parseInt(action.payload.monto) : state.egresos,

            }
        case 'editOperacion':
            return {
                ...state,
                operaciones:state.operaciones.map(o=>o.id === action.payload.id ? action.payload : o),
                ingresos: action.payload.tipo === 'INGRESO' ? parseInt(state.ingresos) + parseInt(action.payload.monto) - parseInt(action.last) : state.ingresos ,
                egresos: action.payload.tipo === 'EGRESO' ? parseInt(state.egresos) + parseInt(action.payload.monto) - parseInt(action.last) : state.egresos,
            }
        case 'deleteOperacion':
            return {
                ...state,
                operaciones:state.operaciones.filter(o=>o.id !== action.payload.id),
                ingresos: action.payload.tipo === 'INGRESO' ? parseInt(state.ingresos) - parseInt(action.last) : state.ingresos ,
                egresos: action.payload.tipo === 'EGRESO' ? parseInt(state.egresos) - parseInt(action.last) : state.egresos,
            }
    
        default:
            return state;
    }
}
