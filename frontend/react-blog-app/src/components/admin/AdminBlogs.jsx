import React from 'react'

import { AdminBlogsList } from './AdminBlogsList';

import Spinner from 'react-bootstrap/Spinner';

import { QueryClient, useQuery } from 'react-query'
import axios from 'axios'

const queryClient = new QueryClient()

export const AdminBlogs = () => {
    
    const { isLoading, isError, data:blogs, error} = useQuery('getAllBlogs', async () => 
    await axios.get('http://localhost:3500/api/blogs')
  );

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

