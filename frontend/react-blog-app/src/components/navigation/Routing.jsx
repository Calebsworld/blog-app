import React from 'react'

import { Routes, Route } from 'react-router-dom';

import { Home } from '../../pages/Home'
import { About } from '../../pages/About'
import { Blogs } from '../../pages/Blogs'
import { BlogItem } from '../blog/BlogItem'
import { CreateAccountForm } from '../userForms/CreateAccountForm'
import { LoginForm } from '../userForms/LoginForm'
import { WriteBlogForm } from '../adminForms/WriteBlogForm'
import { UpdateBlogForm } from '../adminForms/UpdateBlogForm'

export const Routing = () => {
  return (
    <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} /> 
          <Route path='/blogs'>
            <Route index element={<Blogs />} />
            <Route path=':id' element={<BlogItem />} />
          </Route>
          <Route path='/user/register' element={<CreateAccountForm />} />
          <Route path='/user/login' element={<LoginForm />} />
          <Route path='/admin/write' element={<WriteBlogForm />} />
          <Route path='/admin/update' element={<UpdateBlogForm />} />
          <Route path="*" element={<Home />} />
        </Routes>
  )
}
