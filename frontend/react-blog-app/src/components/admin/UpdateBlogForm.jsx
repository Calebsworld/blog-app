import { useEffect, useState } from 'react';
import { useLocation, NavLink, Navigate, useNavigate } from 'react-router-dom';

import { Header } from '../Header';

import { useMutation, useQueryClient } from 'react-query'

import { updateBlog } from '../../hooks/adminApis'
import { useBlogData } from '../../hooks/blogApis';

import { blogSchema } from '../../yupSchemas/blogFormSchema';
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export const UpdateBlogForm = () => {

const queryClient = new useQueryClient()

const navigate = useNavigate()

const [blog, setBlog] = useState(null);

const location = useLocation();
const id = location.state;  
const { error, isLoading, isError, data, isSuccess } = useBlogData(id)

useEffect(() => {
  if (isSuccess) {
    let title = data.data.title 
    let content = data.data.content
    let tags = JSON.parse(data.data.tags)
    setBlog({title, content, tags}) 
  }
}, [])

useEffect(() => {
  reset(blog);
}, [blog]);

const { 
  register, 
  handleSubmit, 
  formState,
  control, 
  reset
} 
= useForm({
  mode: 'onChange',
  resolver: yupResolver(blogSchema)
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
const updateBlogMutation = useMutation(updateBlog, {
  onSuccess: () => {
    queryClient.invalidateQueries('getAllBlogs')
    reset();
    navigate('/admin/blogs')
  },
})

const onSubmit = async data => {
  console.log(data)
  const fd = createFormDataObj(data)
  updateBlogMutation.mutate({ id: id, blogData: fd });
} 

  return (
    <Container>
      <Header Header='Update Blog Post'/>
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
              <Button as={NavLink} to={'/admin/blogs'} className='me-2' variant="secondary"> Cancel </Button>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  </Container>
  )
}




