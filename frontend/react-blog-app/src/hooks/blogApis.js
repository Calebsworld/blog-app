import axios from 'axios'
import { useMutation, useQuery  } from 'react-query'

export const useGetAllBlogs = () => {
    return useQuery('getAllBlogs', getAllBlogs) 
}

export const getAllBlogs = () => { 
    return axios.get('http://localhost:3500/api/blogs')  
}

export const useBlogData = blogId => {
    return useQuery(['getBlogById', blogId], getBlogById)
}

export const getBlogById = ({ queryKey }) => {
    const blogId = queryKey[1]
    return axios.get(`http://localhost:3500/api/blogs/${blogId}`)
}
