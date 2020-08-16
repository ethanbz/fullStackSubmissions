import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import userService from '../services/users'

const Users = () => {
    const [users, setUsers] = useState(null)
    const fetchUsers = async () => {
            const users = await userService.getAll()
            setUsers(users)
        }
    useEffect(() => {
        fetchUsers()
    }, [])

    return (
        <>
        <h2>Users</h2>
        {users && <table>
            <tbody>
                <tr>
                <th></th>
                <th>blogs created</th>
                </tr>
                
                {users.map(user => <tr key={user.id}><td><Link to={`/users/${user.id}`}>{user.name}</Link></td><td>{user.blogs.length}</td></tr>)}
            </tbody>
        </table>}
        </>
    )
}

export default Users