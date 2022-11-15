import axios from 'axios'

export const authApi = axios.create({
    baseURL: `http://localhost:3500/api/auth`
})

export const postUser = async userData => {
    return await authApi.post('/user', userData)  
}



