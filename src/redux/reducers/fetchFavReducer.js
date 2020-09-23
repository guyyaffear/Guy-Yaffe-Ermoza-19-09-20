const initialState = []

const favorites = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_FAVORITES':
            return action.payload
        case 'ADD_FAVORITE':
            console.log(action.payload);
            return [...state ,action.payload];
        case 'REMOVE_FAVORITE':
            return state.filter(weather => action.payload !== weather.cityKey)
        default:
            return state
    }
}

export default favorites;