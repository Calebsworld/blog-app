import React from 'react'

import { Header } from '../components/Header'
import { BlogsList } from '../components/blog/BlogsList'

import { QueryClient, useQuery, useQueryClient } from 'react-query'
import axios from 'axios'

import Spinner from 'react-bootstrap/Spinner';

export const Home = () => {

  const queryClient = useQueryClient();

  const { 
    isLoading, 
    isError, 
    data:blogs, 
    error} = useQuery('getAllBlogs', async () => 
      await axios.get('http://localhost:3500/api/blogs')
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
    <div>
      <Header Header="Lele's garden blog" />
      <BlogsList blogs={blogs.data} />
    </div>
  )
}
