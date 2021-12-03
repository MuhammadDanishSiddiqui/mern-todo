const initial = {
    isLoading: false,
    allTasks: [],
    error: "",
}

const reducer = function (state = initial, action) {
    switch (action.type) {
        case "GET_TASKS_REQUEST":
            return {
                ...state,
                isLoading: true
            }

        case "GET_TASKS_SUCCESS":
            return {
                ...state,
                isLoading: false,
                allTasks: action.payload,
                error:"",
            }
        case "GET_TASKS_FAILURE":
            return {
                ...state,
                isLoading: false,
                allTasks:[],
                error: action.payload,
            }
        default: return state
    }

}

export default reducer