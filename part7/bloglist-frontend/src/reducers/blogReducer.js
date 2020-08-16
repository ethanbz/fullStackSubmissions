import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
    switch(action.type) {
        case 'INIT': 
            const blogs = action.data
            return blogs
        case 'LIKE':
            const likedBlog = action.data
            return state.map(blog => blog.id === likedBlog.id ? likedBlog : blog)
        case 'REMOVE':
            const deletedBlog = action.data
            return state
    }
    return state
}

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INIT',
            data: blogs
        })
    }
}

export const likeBlog = (blog) => {
    return async dispatch => {
        const likedBlog = await blogService.likeBlog(blog)
        dispatch({
            type: 'LIKE',
            data: likedBlog
        })
    }
}

export const deleteBlog = (blog) => {
    return async dispatch => {
        const deletedBlog = await blogService.remove(blog)
        dispatch({
            type: 'REMOVE',
            data: deletedBlog
        })
    }
}

export default blogReducer