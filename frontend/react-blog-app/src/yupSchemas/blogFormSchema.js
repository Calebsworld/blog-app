import * as yup from 'yup';

export const blogSchema = yup.object().shape({
    title: yup.string().min(5).max(50).required('Title Required'),
    content: yup.string().min(5).max(5000).required('Content Required'),
    tags: yup
    .array()
    .of(yup
        .object()
        .shape({
          tag: yup.string().min(5, 'Tag must contain atleast 2 characters').max(30, 'Tag must not exceed 30 characters').required()
        })
      )
    .required('Tags required')
  
  })