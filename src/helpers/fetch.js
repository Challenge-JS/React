const baseURL = 'http://localhost:8080/api'; 

export const fecthSinToken = async(endpoint, data, method='GET')=>{
    const url = `${baseURL}/${endpoint}`;
    if(method==='GET'){
        const resp = await fetch(url);
        return await resp.json();
    }else{
        const resp =  await  fetch(url, {
            method,
            headers:{
                'Content-type':'Application/json'
            },
            body:JSON.stringify(data)
        })
        return await resp.json();
    }
}
export const fecthConToken = async(endpoint, data, method='GET')=>{
    const url = `${baseURL}/${endpoint}`;
    const token = localStorage.getItem('token');
    if(method==='GET'){
        const resp = await fetch(url, {
            method,
            headers:{
                'Content-type':'Application/json',
                'x-token': token
            }
        });
        return await resp.json();
    }else{
        const resp =  await  fetch(url, {
            method,
            headers:{
                'Content-type':'Application/json',
                'x-token': token
            },
            body:JSON.stringify(data)
        })
        return await resp.json();
    }
}