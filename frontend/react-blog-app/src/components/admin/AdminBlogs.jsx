import React from 'react'

import { useQueryClient} from 'react-query'

import { useGetAllBlogs } from '../../hooks/blogApis';
import { AdminBlogsList } from './AdminBlogsList';

import Spinner from 'react-bootstrap/Spinner';

export const AdminBlogs = () => {
    
const queryClient = new useQueryClient()
  
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

