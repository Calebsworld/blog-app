import * as yup from 'yup';

export const writeBlogSchema = yup.object().shape({
    title: yup.string().min(5).max(50).required('Title Required'),
    content: yup.string().min(5).max(5000).required('Content Required'),
    image: yup.mixed()
    .test('required', "You need to provide a file", (value) =>{
      return value && value.length
    })
     .test("fileSize", "The file is too large", (value, context) => {
        return value && value[0] && value[0].size <= 20000000;
     })
    .test("fileType", "Incorrect file type", (file) => {
        return file && ["image/png", "image/jpg", "image/jpeg"].includes(file[0].type)
    }),
  })