import React from 'react'
import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { Header } from '../Header';

import { postBlog } from '../../hooks/adminApis'
import { useMutation, useQueryClient } from 'react-query'

import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { blogSchema } from '../../yupSchemas/blogFormSchema';
import { yupResolver } from '@hookform/resolvers/yup';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export const WriteBlogForm = ({ history }) => {
 
const queryClient = new useQueryClient()

let navigate = useNavigate();

  const { 
    register, 
    handleSubmit, 
    formState,
    control, 
    reset
  } 
  = useForm({
    mode: 'onChange',
    resolver: yupResolver(blogSchema),
      defaultValues: {
        title: '',
        content: '',
        image: '',
        tags: [{
          tag: ''
        }]
      }
     });
     
  const { errors, isSubmitSuccessful } = formState;

  const {
    fields,
    append, 
    remove
  }
  = useFieldArray({
    name: 'tags',
    control
  })
  
  const postBlogMutation = useMutation(postBlog, {
    onSuccess: () => {
      queryClient.invalidateQueries('getAllBlogs')
    },
  })

  const createFormDataObj = data => {
    const form = document.getElementById('form')
    const formData = new FormData(form);
    const completeFormData = new FormData();
    completeFormData.append('title', formData.get('title'));
    completeFormData.append('content', formData.get('content'));
    completeFormData.append('image', formData.get('image'));
    data.tags.forEach(tag => completeFormData.append('tags[]', JSON.stringify(tag)));
    return completeFormData;
  }

const onSubmit = async data => {
  console.log(data)
  const fd = createFormDataObj(data)
  postBlogMutation.mutate(fd);
  navigate('/admin/blogs')
} 

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [formState, reset]);

  return (
    <Container>
      <Header Header='Write New Blog Post'/>
      <Row>
        <Col lg={6} className='mx-auto mt-4'>
          <Form id='form' onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Controller
                name='title'
                control={control}
                render={({ field: { onChange, onBlur, value, name, ref } }) => (
                  <Form.Control
                    name={name}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    type="text" 
                    placeholder="Enter title"
                    isInvalid={errors.title}
                  />
                )}
              />
              {errors.title?.type == "required" && (
                <Form.Control.Feedback type="invalid">
                  Title required
                </Form.Control.Feedback>
              )}
              {errors.title?.type == "min" && (
                <Form.Control.Feedback type="invalid">
                Title must contain atleast 5 characters
                </Form.Control.Feedback>
              )}
              {errors.title?.type == "max" && (
                <Form.Control.Feedback type="invalid">
                  Title must not exceed 50 characters
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formContent">
              <Form.Label>Content</Form.Label>
              <Controller
                name='content'
                control={control}
                render={({ field: { onChange, onBlur, value, name, ref } }) => (
                  <Form.Control
                    name={name}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    as="textarea"
                    placeholder="Your friends are waiting for your thoughts..."
                    style={{ height: '100px' }}
                    isInvalid={errors.content}
                  />
                )}
              />
              {errors.content?.type == "required" && (
                <Form.Control.Feedback type="invalid">
                  Content required
                </Form.Control.Feedback>
              )}
              {errors.content?.type == "min" && (
                <Form.Control.Feedback type="invalid">
                  Content must contain atleast 5 characters
                </Form.Control.Feedback>
              )}
              {errors.content?.type == "max" && (
                <Form.Control.Feedback type="invalid">
                  Content must not exceed 50 characters
                </Form.Control.Feedback>
              )}
            </Form.Group>
    
            <Form.Group className="mb-3">
              <Form.Label>Select file as an image for your posts</Form.Label>
              <Controller
                name='image'
                control={control}
                render={({ field: { onChange, onBlur, value, name, ref } }) => (
                  <Form.Control
                    type="file"
                    id='file'
                    name={name}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    isInvalid={errors.image}
                  />
                )}
              />
              
            </Form.Group>
            
            <Row>
              <Col>
              <h4 className='pb-3'>Hashtags</h4>
                <Button
                className='m-1' 
                onClick={() => {
                  append([{
                    tag: ''
                  }])
                }} 
                variant="primary" 
                type="button">
                Add Tag
               </Button>
              </Col>
            </Row>
          
            {fields.map((field, index) => {
              return (
                <section key={field.id} className='mt-3'>
                  <Row>
                    <Col>
                      <label>
                        <input placeholder='#' name='tag' {...register(`tags.${index}.tag`)} type="text" />
                      </label>
                      {`errors.tags[${index}]?.tag?.type` == "required" && (
                        <Form.Control.Feedback type="invalid">
                          Tag required
                        </Form.Control.Feedback>
                      )}
                      {`errors.tags[${index}]?.tag?.type` && (
                        <Form.Control.Feedback type="invalid">
                          Tag must contain atleast 5 characters
                        </Form.Control.Feedback>
                      )}
                      {`errors.tags[${index}]?.tag?.type` == "max" && (
                        <Form.Control.Feedback type="invalid">
                          Tag must not exceed 30 characters
                        </Form.Control.Feedback>
                      )}
                    </Col>

                    <Col>
                      <Button
                        type='button'
                        className='btn-danger'
                        onClick={index => {
                          remove(index)
                        }}>
                        Delete
                      </Button>
                    </Col>
                  </Row>
                </section>
              )
            })}    
            <Row className='mt-5'>
              <Col>
                <Button
                  className='m-1' 
                  variant="primary" 
                  type="submit">
                  Submit
                </Button>
                <Button 
                  onClick={() => reset()} 
                  variant="secondary" 
                  type="button" 
                  className='ms-1'>
                  Reset
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}


