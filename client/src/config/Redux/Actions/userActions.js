import axios from "axios"

function getUserRequest()
{
    return {
        type:"GET_USER_REQUEST"
    }
}

function getUserSuccess(data)
{
    return {
        type:"GET_USER_SUCCESS",
        payload:data
    }
}

function getUserFailure(error)
{
    return {
        type:"GET_USER_FAILURE",
        payload:error
    }
}

function getUser()
{
    return function(dispatch)
    {
      return new Promise ((resolve,reject)=>{
        dispatch(getUserRequest())
        axios({
            method: 'GET',
            url: '/user/profile',
            headers: {
                'Content-Type': 'application/json',
            },
          }).then(res=>{
              dispatch(getUserSuccess(res.data))
              resolve(res.data)
          }).catch(err=>
            {
                if(!err.response)
                {
                   dispatch(getUserFailure({message:"No internet connection"}))
                   reject({message:"No internet connection"})
                   return
                }

             dispatch(getUserFailure(err?.response?.data))
             reject(err?.response?.data)
             
          });
      }) 
    }
}


export {getUser}