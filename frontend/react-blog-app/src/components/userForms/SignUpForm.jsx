import React from 'react'

import { Header } from '../Header';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

export const SignUpForm = () => {
  return (
    <Container>
       <Header Header='User Sign-up'/>
      <Row>
        <Col lg={6} className='mx-auto mt-4'>
          <Form>
          <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label className='lead'>
                <FontAwesomeIcon icon={faUser} className='me-1'/>  
              Username
              </Form.Label>
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                <Form.Control className='lead' type="text" placeholder="Username" />
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="text" placeholder="name@example.com" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="******" />
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


