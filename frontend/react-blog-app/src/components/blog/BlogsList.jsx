import React from 'react'

import { BlogItem } from './BlogItem'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export const BlogsList = ( { blogs } ) => {

    if (blogs.length === 0) {
        return (
            <div>
                <h2>No blog posts found!</h2>
            </div>
          )
    }
    return (
    <ul>
        {blogs.map(blog => {
            return <BlogItem key={blog.post} blog={blog} />
            }) 
        }
    </ul>
  )
}

