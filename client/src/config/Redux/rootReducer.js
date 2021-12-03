import { combineReducers } from 'redux'
import userReducer from './Reducers/userReducer'
import tasksReducer from "./Reducers/taskReducer"

const appReducer = combineReducers({
    user:userReducer,
    tasks: tasksReducer
  })
  
  const rootReducer = (state, action) => {
    if (action.type === 'USER_LOGOUT') {
        return appReducer(undefined, action)
      }
      return appReducer(state, action)
  }
  
  export default rootReducer