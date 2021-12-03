const initial = {
    isLoading: false,
    user: {},
    error: "",
    isAuth:false
}

const reducer = function (state = initial, action) {
    switch (action.type) {
        case "GET_USER_REQUEST":
            return {
                ...state,
                isLoading: true
            }

        case "GET_USER_SUCCESS":
            return {
                ...state,
                isLoading: false,
                user: action.payload,
                error:"",
                isAuth:true
            }
        case "GET_USER_FAILURE":
            return {
                ...state,
                isLoading: false,
                user:{},
                error: action.payload,
                isAuth:false
            }
        default: return state
    }

}

export default reducer