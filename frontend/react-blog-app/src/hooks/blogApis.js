import axios from 'axios'
import { useMutation, useQuery  } from 'react-query'

export const useGetAllBlogs = () => {
    return useQuery('getAllBlogs', getAllBlogs, {
        staleTime: 10000,
    }) 
}

export const getAllBlogs = async () => { 
    const blogs = await axios.get('http://localhost:3500/api/blogs')  
    console.log(blogs)
    return blogs
}

export const useBlogData = blogId => {
    return useQuery(['getBlogById', blogId], getBlogById, {
        staleTime: Infinity
    })
}

export const getBlogById = async ({ queryKey }) => {
    const blogId = queryKey[1]
    return await axios.get(`http://localhost:3500/api/blogs/${blogId}`)
}
