import * as yup from 'yup';

export const updateBlogSchema = yup.object().shape({
    title: yup.string().min(5).max(50).required('Title Required'),
    content: yup.string().min(5).max(5000).required('Content Required'),
  })