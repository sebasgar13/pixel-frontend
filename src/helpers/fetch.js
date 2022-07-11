

export const fetchSinToken = async(endpoint, data, method = 'GET') => {
    const url = `https://pixels-backend-prueba.herokuapp.com/api/${endpoint}`;
    if(method === 'GET'){
        const resp = await fetch(url);
        return await resp.json();
    } else {
        const resp = await fetch(url, {
            method,
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        //console.log(resp);
        return await resp.json();
    }
}

export const fetchConToken = async(endpoint, data, method = 'GET') => {
    const url = `https://pixels-backend-prueba.herokuapp.com/api/${endpoint}`;
    const token = localStorage.getItem('token') || '';
    if(method === 'GET'){
        const resp = await fetch(url, {
            headers: {
                'x-token': token
            }
        });
        //console.log(resp);
        return await resp.json();
    } else {
        const resp = await fetch(url, {
            method,
            headers: {
                'Content-type': 'application/json',
                'x-token': token
            },
            body: JSON.stringify(data)
        })
        //console.log(resp);
        return await resp.json();
    }
}