import axios from 'axios'
import { useMutation, useQuery  } from 'react-query'

const blogsApi = axios.create({
    baseURL: '/api/blogs'
})

export const useGetAllBlogs = () => {
    return useQuery('getAllBlogs', getAllBlogs, {
        staleTime: 10000,
    }) 
}

export const getAllBlogs = async () => { 
    const blogs = await blogsApi.get('/posts');  
    return blogs
}

export const useBlogData = blogId => {
    return useQuery(['getBlogById', blogId], getBlogById, {
        staleTime: Infinity
    })
}

export const getBlogById = async ({ queryKey }) => {
    const blogId = queryKey[1]
    return await blogsApi.get(`posts/${blogId}`)
}
