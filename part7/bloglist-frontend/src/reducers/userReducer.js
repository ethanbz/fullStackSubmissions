const userReducer = (state = null, action) => {
    switch(action.type) {
        case 'SET-USER':
            return action.user
    }
    return state
}

export const setUser = (user) => {
    return {
        type: 'SET-USER',
        user
    }
}

export default userReducer