import axios from 'axios'

export const adminApi = axios.create({
    baseURL: `http://localhost:3500/api/admin`
})

export const postBlog = async blogData => {
    return await adminApi.post('/posts', blogData)  
}