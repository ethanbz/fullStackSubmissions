import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import userService from '../services/users'
import styled from 'styled-components'

const User = () => {
    const [user, setUser] = useState(null)
    const id = useParams().id

    const getUser = async () => {
        const user = await userService.get(id)
        setUser(user)
    }

    useEffect(() => {
        getUser()
    }, [])

    const userInfo = () => {
        if (user) 
        return (
            <>
            <Name>{user.name}</Name>
            <h3>added blogs</h3>
            <ul>
                {user.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
            </ul>
            </>
        )
    }

    return (
        <>
        {userInfo()}
        </>
    )
}

const Name = styled.h2`
    border: 1px dashed;
    padding: 8px;
    width: fit-content;
    background-color: pink;
`

export default User