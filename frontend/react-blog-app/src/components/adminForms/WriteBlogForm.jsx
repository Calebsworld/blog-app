import React from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'

import { Header } from '../Header';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

export const WriteBlogForm = () => {
  
  const { 
    register, 
    handleSubmit, 
    formState:{errors},
    watch,
    control 
  } 
  = useForm({
      defaultValues: {
        title: '',
        content: '',
        tags: []
      }
    });
  
  const {
    fields,
    append, 
    prepend,
    remove
  }
  = useFieldArray({
    name: 'tags',
    control
  })
    
  const onSubmit = data => {
    console.log(data)
  }
 

  

  return (
    <Container>
      <Header Header='Write New Blog Post'/>
      <Row>
        <Col lg={6} className='mx-auto mt-4'>
          <Form onSubmit={handleSubmit(onSubmit)} >
            <Form.Group className="mb-3" controlId="formBasicTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" placeholder="Enter title" 
                {...register('title',
                  { required:'title is required',
                    minLength: {
                      value: 5,
                      message: 'min length is 5'
                    }  
                  }
                )} 
              />
              <p className='text-danger'>{errors.title?.message}</p>
            </Form.Group>

            <FloatingLabel controlId="formBasicContent" label="Content">
              <Form.Control
                as="textarea"
                placeholder="Enter your content for your blog post"
                style={{ height: '100px' }}
                {...register('content', 
                  { required:'content is required', 
                    minLength: {
                      value: 5,
                      message: 'min length is 5'
                    }  
                  }
                )}
              />
              <p className='text-danger'>{errors.content?.message}</p>
            </FloatingLabel>

            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Select file as an image for your posts</Form.Label>
              <Form.Control type="file" 
                {...register('image', 
                  {required:'image is required'}
                )} 
              />
              <p className='text-danger'>{errors.file?.message}</p>
            </Form.Group>
            
            { fields.map((field, index) => {  
              return (
                <section key={field.id} >
                   <Form.Group className="mb-3" controlId="formBasicTags">
                    <Form.Label>Tags</Form.Label>
                    <Form.Control type="text" placeholder="Please enter tags" 
                      {...register(`tags${index}`)} 
                    />
                    <p className='text-danger'>{errors.tags?.message}</p>
                  </Form.Group>
                </section> 
               
              )
            })}    
                
                  

            <Button
             className='m-1' 
              onClick={() => {
                append([])
              }} 
              variant="primary" 
              type="button">
              append
            </Button>
            
            <Button 
              onClick={() => {
              append([])
            }} 
            variant="primary" type="button">
            prepend
            </Button>
            <br></br>
            <Button
              className='m-1' 
              variant="primary" 
              type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}


