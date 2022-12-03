import React from 'react'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup'

export const BlogItem = ({ blog }) => {

  return (
    <Container>
      <Row>
        <Col lg={6} className='mx-auto mt-4'>
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={blog.imageUrl} />
            <Card.Body>
              <Card.Title> {blog.title} </Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Leslie Stephens</Card.Subtitle>
              <Card.Text> {blog.content} </Card.Text>
            </Card.Body>
          <ListGroup className="list-group-flush">
          {blog.tags.map(tag => {
            return (
              <ListGroup.Item key={tag.rowKey}> #{tag.name} </ListGroup.Item>
            )
          })}  
          </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>   
  )
}


