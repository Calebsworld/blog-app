import React from 'react'
import { useEffect } from 'react';

import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { useMutation, QueryClient } from 'react-query'
import { postUser } from '../../hooks/authApis';

import { Header } from '../Header';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faUser, faKey, faCircleCheck } from '@fortawesome/free-solid-svg-icons'




export const CreateAccountForm = () => {

  const queryClient = new QueryClient()

  const schema = yup.object().shape({
    email: yup.string().email('Must be a valid email').required('Email Required'),
    username: yup.string().required('Username Required'),
    password: yup.string().min(6, 'Password must contain atleast 6 characters').max(25, 'Password must not exceed 25 characters').required('Password required'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], "Confirm password doesn't match").required('Confirm password required')
  })

  const {
    handleSubmit,
    formState,
    reset,
    control
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema), 
    defaultValues: {
      email: '',
      username: '',
      password: '',
      confirmPassword: ''
    }
  });
  
  const { errors, isSubmitSuccessful, isDirty } = formState

  const postUserMutation = useMutation(userData => {
    return postUser(userData);
  })

  const onSubmit = data => {
    console.log(data)
    postUserMutation.mutate(data)
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [formState, reset]);

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

       <Header Header='Create Account'/>
      <Row>
        <Col lg={6} className='mx-auto mt-4'>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" >
              <Form.Label className='lead'>
                <FontAwesomeIcon icon={faEnvelope} className='me-1' />
              Email
              </Form.Label>
              <Controller
                  name="email"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, onBlur, value, name, ref } }) => (
                    <Form.Control
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      type="email"
                      placeholder="name@example.com"
                      isInvalid={errors.username}
                    />
                  )}
                />
              {errors.email?.type === "required" && (
                <Form.Control.Feedback type="invalid">
                  Email required
                </Form.Control.Feedback>
              )}
            </Form.Group>
              
            <Form.Group className="mb-3">
              <Form.Label className='lead'>
                <FontAwesomeIcon icon={faUser} className='me-1'/>  
              Username
              </Form.Label>
              <Controller
                  name="username"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, onBlur, value, name, ref } }) => (
                    <Form.Control
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      type="text"
                      placeholder="Username"
                      isInvalid={errors.username}
                    />
                  )}
                />
              {
                
              }
              {errors.username?.type == "required" ? 
                (
                  <Form.Control.Feedback type="invalid">
                    {errors.username?.message}
                  </Form.Control.Feedback>
                ) :
                  <p>Username must contain zero spaces</p>
              }
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className='lead'>
                <FontAwesomeIcon icon={faKey} className='me-1' />
              Password
              </Form.Label>
                <Controller
                  name="password"
                  control={control}
                  rules={{ required: true, min:6, max:25 }}
                  render={({ field: { onChange, onBlur, value, name, ref } }) => (
                    <Form.Control
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      type="password"
                      placeholder="******"
                      isInvalid={errors.password}
                    />
                  )}
                />
              {errors.password?.type == "min" && (
                <Form.Control.Feedback type="invalid">
                  Password must contain atleast 6 characters
                </Form.Control.Feedback>
              )}
              {errors.password?.type == "max" && (
                <Form.Control.Feedback type="invalid">
                  Password must not exceed 25 characters
                </Form.Control.Feedback>
              )}
            </Form.Group> 
          
            <Form.Group className="mb-3">
              <Form.Label className='lead'>
                <FontAwesomeIcon icon={faCircleCheck} className='me-1' />
              Confirm Password
              </Form.Label>
              <Controller
                  name="confirmPassword"
                  control={control}
                  rules={{
                    required: true, 
                    validate: {
                      confirmPasswordMatches: password => password === confirmPassword 
                    } 
                  }}
                  render={({ field: { onChange, onBlur, value, name, ref } }) => (
                    <Form.Control 
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      type="password"
                      placeholder="******"
                      isInvalid={errors.confirmPassword}
                    />
                  )}
                />
                {errors.confirmPassword?.message ? ( 
                  <Form.Control.Feedback type="invalid">
                    Confirm password must match password
                  </Form.Control.Feedback> )
                 : <p></p> 
              }
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
            <Button onClick={() => reset()} variant="secondary" type="button" className='ms-1'>
              Reset
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
    
    
  )
}


