import React from 'react'

import { QueryClient} from 'react-query'

import { useGetAllBlogs } from '../hooks/blogApis';
import { BlogsList } from '../components/blog/BlogsList'

import Spinner from 'react-bootstrap/Spinner';

export const Blogs = () => {

  const queryClient = new QueryClient()
  
  const { isLoading, isError, data:blogs, error} = useGetAllBlogs();
  
  if (isLoading) {
    return (
    <div className='mt-3'>  
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>  
    )
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }
  
  return (
      <BlogsList blogs={blogs.data} />
    )
  

  
  
}

