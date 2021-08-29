import { fecthConToken } from "../helpers/fetch";
import Swal from "sweetalert2";
export const usePeticion  = (dispatch)=>{

    const peticion = async(type,ruta,js,data,method = 'GET')=>{
   
        const reJS = `${js}s`;
    
        const body = await fecthConToken(ruta,data,method);
        if(body.ok){
            dispatch({
                type,
                payload:(method === 'GET') ? body[reJS] : (method === 'DELETE') ? data : body[js]
            });
          
            
            return true;
        }else{
            Swal.fire('Error',body.msg,'error');
            return false;
        }
    }
    return {peticion};

}