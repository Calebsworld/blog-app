import axios from 'axios'

export const authApi = axios.create({
    baseURL: `/api/auth`
})

export const postUser = async userData => {
    return await authApi.post('/user', userData)  
}



