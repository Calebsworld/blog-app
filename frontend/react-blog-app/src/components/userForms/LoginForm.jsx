import React from 'react'

import { Header } from '../Header';

import '../../css/LoginForm.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faKey, faCircleCheck } from '@fortawesome/free-solid-svg-icons'

import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { QueryClient, useQuery } from 'react-query'
import axios from 'axios'

export const LoginForm = () => {
  
  const queryClient = new QueryClient();

  const schema = yup.object().shape({
    username: yup.string().required('Username Required'),
    password: yup.string().required('Password Required').min(6).max(25),
    confirmPassword: yup.string().required('Password Required').oneOf([yup.ref('password'), null], "Passwords Don't Match")
  })  

  const { 
    register, 
    handleSubmit, 
    watch, 
    formState } = useForm({
      resolver: yupResolver(schema)
  });
  
  const { errors } = formState 

  const onSubmit = data => {
    console.log(data)
  }

  return (
    <Container className='loginForm-container p-5 mt-5'>
      <Header Header='User Login'/>
      <Row >
        <Col lg={4} className='mx-auto mt-4' >
          <Form onSubmit={handleSubmit(onSubmit)}>
            
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label className='lead'>
                <FontAwesomeIcon icon={faUser} className='me-1'/>  
              Username
              </Form.Label>
                <Form.Control className='lead' type="text" placeholder="Username" {...register('username')} />
                <p className='text-danger mt-1'>{errors.username?.message}</p>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className='lead'>
                <FontAwesomeIcon icon={faKey} className='me-1' />
              Password
              </Form.Label>
              <Form.Control className='lead' type="password" placeholder="******" {...register('password')} />
              {errors.password?.message ? <p className='text-danger mt-1'>{errors.password?.message}</p> : 
              <p className='mt-1'>Password must be between 6-25 characters</p>
              }
              
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className='lead'>
                <FontAwesomeIcon icon={faCircleCheck} className='me-1' />
              Confirm Password
              </Form.Label>
              <Form.Control className='lead' type="password" placeholder="******" {...register('confirmPassword')} />
              {errors.confirmPassword?.message ? <p className='text-danger mt-1'>{errors.confirmPassword?.message}</p> : 
              <p className='mt-1'>Password must be between 6-25 characters</p>
              }
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

