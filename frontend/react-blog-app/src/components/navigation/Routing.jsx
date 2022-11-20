import React from 'react'

import { Routes, Route } from 'react-router-dom';

import { Home } from '../../pages/Home'
import { About } from '../../pages/About'
import { Blogs } from '../../pages/Blogs'
import { BlogItem } from '../blog/BlogItem'
import { CreateAccountForm } from '../auth/CreateAccountForm'
import { LoginForm } from '../auth/LoginForm'
import { AdminBlogs } from '../admin/AdminBlogs'
import { AdminBlogItem } from '../admin/AdminBlogItem'
import { WriteBlogForm } from '../admin/WriteBlogForm'
import { UpdateBlogForm } from '../admin/UpdateBlogForm'

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
          <Route path='/admin/blogs'>
              <Route index element={<AdminBlogs/>} />
              <Route path=':id' element={<AdminBlogItem />} />
          </Route>
          <Route path="*" element={<Home />} />
        </Routes>
  )
}
