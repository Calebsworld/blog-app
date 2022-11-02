import React from 'react'

import { BlogsList } from '../components/blog/BlogsList'

import Spinner from 'react-bootstrap/Spinner';

import { QueryClient, useQuery } from 'react-query'
import axios from 'axios'
 
 const queryClient = new QueryClient()

export const Blogs = () => {

  const { isLoading, isError, data:blogs, error} = useQuery('getAllBlogs', async () => 
    await axios.get('http://localhost:3500/api/admin/posts')
  );

  if (isLoading) {
    return ( 
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
    )
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }
  
  return (
      <BlogsList blogs={blogs.data} />
    )
  

  
  
}

