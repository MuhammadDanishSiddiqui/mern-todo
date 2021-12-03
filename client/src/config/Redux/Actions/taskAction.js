import axios from "axios"

function getTasksRequest()
{
    return {
        type:"GET_TASKS_REQUEST"
    }
}

function getTasksSuccess(data)
{
    return {
        type:"GET_TASKS_SUCCESS",
        payload:data
    }
}

function getTasksFailure(error)
{
    return {
        type:"GET_TASKS_FAILURE",
        payload:error
    }
}

function getTasks(filterBy="")
{
    return function(dispatch)
    {
        dispatch(getTasksRequest())
        axios({
            method: 'GET',
            url: '/task',
            headers: {
                'Content-Type': 'application/json',
            },
            params : {
                completed:filterBy
            }
          }).then(res=>{
              dispatch(getTasksSuccess(res.data))
          
          }).catch(err=>
            {
                if(!err.response)
                {
                   dispatch(getTasksFailure({message:"No internet connection"}))
                   return
                }

             dispatch(getTasksFailure(err?.response?.data))
             
          });
    }
}


export {getTasks}