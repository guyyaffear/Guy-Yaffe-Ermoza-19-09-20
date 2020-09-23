const addingFav = (favObject) => {
    return {
        type: 'ADD_FAVORITE',
        payload: favObject
    }
}

export default addingFav;