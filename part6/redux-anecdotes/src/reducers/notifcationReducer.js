const notificationReducer = (state = '', action) => {
    switch (action.type) {
        case 'SET-MSG':
            return action.data.message
        case 'REMOVE-MSG':
            return ''
    }
    return state
}

export const setMessage = (message) => {
    return {
        type: 'SET-MSG',
        data: {message}
    }
}

export const removeMessage = () => {
    return {
        type: 'REMOVE-MSG'
    }
}

export default notificationReducer