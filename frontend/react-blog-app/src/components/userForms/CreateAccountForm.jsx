import React from 'react'

import { useState } from 'react'

import { Header } from '../Header';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faUser, faKey, faCircleCheck } from '@fortawesome/free-solid-svg-icons'

import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { useMutation, QueryClient } from 'react-query'
import { postUser } from './../../api/authApi';

// const queryClient = new QueryClient()

export const CreateAccountForm = () => {

  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const schema = yup.object().shape({
    email: yup.string().email('Must be a valid email').required('Email Required'),
    username: yup.string().required('Username Required'),
    password: yup.string().min(6).max(25).required('Password Required'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], "Passwords Don't Match").required('Password Required')
  })

  const {
    register,
    handleSubmit,
    watch,
    formState: errors
  } = useForm({
    resolver: yupResolver(schema)
  });
  
  const postUserMutation = useMutation(userData => {
    return postUser(userData);
  })

  const onSubmit = userData => {
    postUserMutation.mutate(userData);
    setEmail('')
    setUsername('')
    setPassword('')
    setConfirmPassword('')
  }

  return (

    <Container>

      <div>
        {postUserMutation.isLoading ? (
          'Adding user...'
        ) : (
          <>
            {postUserMutation.isError ? (
              <div>An error occurred: {mutation.error.message}</div>
            ) : null}

            {postUserMutation.isSuccess ? <div>User added!</div> : null}


          </>
        )}

      </div>

       <Header Header='User Sign-up'/>
      <Row>
        <Col lg={6} className='mx-auto mt-4'>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group onChange={(e) => setEmail(e.target.value)} className="mb-3" >
              <Form.Label className='lead'>
                <FontAwesomeIcon icon={faEnvelope} className='me-1' />
              Email
              </Form.Label>
              <Form.Control type="text" placeholder="name@example.com" value={email} id='email' {...register('email')} />
              <p className='text-danger mt-1'>{errors.email?.message}</p>
            </Form.Group>
              
            <Form.Group onChange={(e) => setUsername(e.target.value)} className="mb-3">
              <Form.Label className='lead'>
                <FontAwesomeIcon icon={faUser} className='me-1'/>  
              Username
              </Form.Label>
              <Form.Control className='lead' type="text" placeholder="Username" value={username} id="username" {...register('username')} />
              <p className='text-danger mt-1'>{errors.username?.message}</p>
            </Form.Group>

            <Form.Group onChange={(e) => setPassword(e.target.value)} className="mb-3">
              <Form.Label className='lead'>
                <FontAwesomeIcon icon={faKey} className='me-1' />
              Password
              </Form.Label>
              <Form.Control type="password" placeholder="******" value={password} id='password' {...register('password')} />
              {errors.password?.message ? <p className='text-danger mt-1'>{errors.password?.message}</p> : 
              <p className='mt-1'>Password must be between 6-25 characters</p>
              }
            </Form.Group>

            <Form.Group onChange={(e) => setConfirmPassword(e.target.value)} className="mb-3">
              <Form.Label className='lead'>
                <FontAwesomeIcon icon={faCircleCheck} className='me-1' />
              Confirm Password
              </Form.Label>
              <Form.Control className='lead' type="password" placeholder="******" value={confirmPassword} id='confirmPassword' {...register('confirmPassword')} />
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


