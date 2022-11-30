import React from 'react'
import { useEffect, useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';

import { Header } from '../Header';

import { updateBlog } from '../../hooks/adminApis'

import { useMutation, useQueryClient } from 'react-query'

import { Controller, useForm } from 'react-hook-form'
import { blogSchema } from '../../yupSchemas/blogFormSchema';
import { yupResolver } from '@hookform/resolvers/yup';

import { v4 as uuidv4 } from 'uuid';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export const UpdateBlogForm = ({ blog, id }) => {

const queryClient = new useQueryClient()

let navigate = useNavigate()

const [tag, setTag] = useState('');
const [tagsList, setTagsList] = useState(blog.tags || []);

useEffect(() => {
  reset({ title: blog.title, content: blog.content })
}, [])


const { 
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
      image: ''
    }
   });
      
const { errors } = formState;

const addTagToTagsArray = tag => {
  if (tag.length > 0) {
    const id = uuidv4();
    const tagObject = { id, name: tag }
    setTagsList([...tagsList, tagObject])
    setTag('')
  }
}

const removeTagFromTagsArray = tag => {
  const filteredArray = tagsList.filter(t => tag !== t)
  setTagsList(filteredArray)
}

const resetFormState = () => {
    setTag('')
    setTagsList([])
    reset();
}

const createFormDataObj = data => {
  const form = document.getElementById('form')
  const formData = new FormData(form);
  const completeFormData = new FormData();
  completeFormData.append('title', formData.get('title'));
  completeFormData.append('content', formData.get('content'));
  completeFormData.append('image', formData.get('image'));
  completeFormData.append('tags[]', JSON.stringify(tagsList))
  return completeFormData;
}

const onSubmit = async data => {
  const fd = createFormDataObj(data)
  const blogDataObject = { id, blogData: fd }
  updateBlogMutation.mutate(blogDataObject);
} 

const updateBlogMutation = useMutation(updateBlog, {
  onSuccess: () => {
    queryClient.invalidateQueries('getAllBlogs')
    resetFormState();
    navigate('/admin/blogs')
  },
})

  return (
    <Container>
      <Header Header='Update New Blog Post'/>
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
            
            <Form.Group className="mb-3" controlId="formTags">
              <Form.Label>Tags</Form.Label>
                  <Form.Control
                    type='text'
                    name='tag'
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    placeholder="Add tag"
                  />
                  <div className='mt-2'>
                    {
                      tagsList.map(tag => {
                        return (
                          <div>
                            <span 
                              key={tag.id}> 
                              {tag.name} 
                            </span>
                            <Button
                            className='mt-2' 
                            onClick={() => removeTagFromTagsArray(tag)}
                            type='button'
                            variant='danger'
                          >
                          Delete tag
                          </Button>
                        </div>
                        )
                      })
                    }
                  </div>
                  <Button
                    className='mt-2' 
                    onClick={() => addTagToTagsArray(tag)}
                    type='button'
                    variant='primary'
                  >
                  Add tag
                  </Button>
              </Form.Group>
              
              <Row className='mt-5'>
              <Col>
                <Button
                  className='m-1' 
                  variant="primary" 
                  type="submit">
                  Submit
                </Button>
                <Button 
                  as={NavLink} to={'/admin/blogs'}
                  variant="secondary" 
                  type="button" 
                  className='ms-1'>
                  Cancel
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

