
const tempUnit = (state = false, action) => {
    switch (action.type) {
        case 'TOGGLE_UNIT':
            return !state
        default:
            return state
    }
}

export default tempUnit;