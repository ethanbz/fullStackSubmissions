const notificationReducer = (state = '', action) => {
    switch(action.type) {
        case 'SET-MSG':
            return action.message
        case 'REMOVE-MSG':
            return ''
    }
    return state
}

const set = (message) => {
    return {
        type: 'SET-MSG',
        message
    }
}

const remove = () => {
    return {
        type: 'REMOVE-MSG'
    }
}

export const setMessage = (message) => {
    return async dispatch => {
        dispatch(set(message))
        setTimeout(() => {
            dispatch(remove())
        }, 5000)
    }
}

export default notificationReducer