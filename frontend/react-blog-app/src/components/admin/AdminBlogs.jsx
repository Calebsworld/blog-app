import React from 'react'

import { QueryClient} from 'react-query'

import { useGetAllBlogs } from '../../hooks/blogApis';
import { AdminBlogsList } from './AdminBlogsList';

import Spinner from 'react-bootstrap/Spinner';




const queryClient = new QueryClient()

export const AdminBlogs = () => {
    
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
      <AdminBlogsList blogs={blogs.data} />
    )
}

