import React from 'react'

import { AdminBlogItem } from './AdminBlogItem'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export const AdminBlogsList = ({ blogs }) => {
  if (blogs.length === 0) {
    return (
        <div>
            <h2>No blog posts found!</h2>
        </div>
    )}
    return (
        <Container>
            <Row className='mx-auto'>
                <Col>
                    <ul>
                        {blogs.map(blog => {
                            return <AdminBlogItem key={blog.id} blog={blog} />
                        }) 
                        }
                    </ul>
                </Col>
            </Row>
        </Container>
    )
}

