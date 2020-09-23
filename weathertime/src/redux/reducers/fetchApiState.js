const fetchApiState = (state = 'loading', action) => {
    switch (action.type) {
        case 'FETCH_FAILED':
            return 'failed'
            
        case 'FETCH_SUCCESSED':
            return 'successed'
        default:
            return state
    }
}

export default fetchApiState;