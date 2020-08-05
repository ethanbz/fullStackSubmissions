import { useDispatch } from 'react-redux'

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

export const setNotification = (message, time) => {
    return async dispatch => {
        dispatch(setMessage(message))
        setTimeout(() => {
            dispatch(removeMessage())
        }, time*1000)
    }
}

export default notificationReducer