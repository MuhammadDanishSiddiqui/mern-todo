import axios from "axios"

function signupUser (body)
{

    return new Promise((resolve,reject)=>{
        axios({
            method: 'POST',
            url: '/user',
            headers: {
                'Content-Type': 'application/json',
            },
            data: JSON.stringify(body)
          }).then(res=>{
              resolve(res.data)
          }).catch(err=>
            {
                if(!err.response)
                {
                    return reject({message:"No internet connection"})
                }

             reject(err?.response?.data)
          });
    })
}

function loginUser (body)
{
    return new Promise((resolve,reject)=>{
        axios({
            method: 'POST',
            url: '/user/login',
            headers: {
                'Content-Type': 'application/json',
            },
            data: JSON.stringify(body)
          }).then(res=>{
              resolve(res.data)
          }).catch(err=>
            {
                if(!err.response)
                {
                   return reject({message:"No internet connection"})
                }

             reject(err?.response?.data)
          });
    })
}

function logOutUser ()
{
    return new Promise((resolve,reject)=>{
        axios({
            method: 'POST',
            url: '/user/logout',
            headers: {
                'Content-Type': 'application/json',
            },
          }).then(res=>{
              resolve(res.data)
          }).catch(err=>
            {
                if(!err.response)
                {
                   return reject({message:"No internet connection"})
                }

             reject(err?.response?.data)
          });
    })
}


export {signupUser,loginUser,logOutUser}