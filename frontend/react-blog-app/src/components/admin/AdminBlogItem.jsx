import React from 'react'

import { NavLink } from 'react-router-dom';

import { deleteBlog } from '../../hooks/adminApis'
import { useMutation, useQueryClient } from 'react-query'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button'

export const AdminBlogItem = ({ blog }) => {

  const queryClient = new useQueryClient()
  
  const tags = blog.tags.map(tag => {
    return JSON.parse(tag)
  }) 

  const deleteBlogMutation = useMutation(deleteBlog, {
    onSuccess: () => {
      queryClient.invalidateQueries('getAllBlogs')
    },
  })   

  const handleDelete = id => {
    deleteBlogMutation.mutate(id)
  }
  
    return (
        <Container>
          <Row>
            <Col lg={6} className='mx-auto mt-4'>
                <Card style={{ width: '18rem' }}>
                  <Card.Body>
                  <Card.Title> { blog.title} </Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">Leslie Stephens</Card.Subtitle>
                  <Card.Text> { blog.content} </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    {tags.map(tag => {
                    return (
                    <ListGroup.Item key={tag.rowKey}> #{ tag.tag } </ListGroup.Item>
                    )
                    })}  
                </ListGroup>
                <Card.Body>
                    <Button as={NavLink} to={'/admin/update'} state={blog._id} className='me-2' variant="primary"> Update </Button>
                    <Button onClick={() => handleDelete(blog._id)} variant="danger"> Delete </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>   
      )
}


