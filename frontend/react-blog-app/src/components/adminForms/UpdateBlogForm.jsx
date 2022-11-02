import React from 'react'

import { Header } from '../Header';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

export const UpdateBlogForm = () => {
  return (
    <Container >
      <Header Header='Update Blog Post'/>
      <Row>
        <Col lg={6} className='mx-auto mt-4'>
          <Form >
            <Form.Group className="mb-3" controlId="formBasicTitle">
             <Form.Label>Title</Form.Label>
             <Form.Control type="text" placeholder="Enter title" />
            </Form.Group>

            <FloatingLabel controlId="formBasicContent" label="Content">
              <Form.Control
                as="textarea"
                placeholder="Enter your content for your blog post"
                style={{ height: '100px' }}
              />
            </FloatingLabel>

            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Select file as an image for your posts</Form.Label>
              <Form.Control type="file" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicTags">
              <Form.Label>Tags</Form.Label>
              <Form.Control type="text" placeholder="Enter hashtags" />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
        </Form>
      </Col>
    </Row>
  </Container>
    
   
  )
}


