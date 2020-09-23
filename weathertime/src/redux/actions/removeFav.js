const removeFav = (key) => {
    return {
        type: 'REMOVE_FAVORITE',
        payload: key
    }
}

export default removeFav; 