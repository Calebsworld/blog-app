import React from 'react'

import { useLocation } from 'react-router-dom';

import { UpdateBlogForm } from './UpdateBlogForm'

import { useBlogData } from '../../hooks/blogApis';


export const UpdateBlogDetail = () => {
 
    const location = useLocation();
    const id = location.state;  
    const { data } = useBlogData(id)

    if (data) {
        return (
            <UpdateBlogForm blog = { data.data } id = {id} />
        )
    }
  
    return (
        <h1>Loading...</h1>
    )
}
