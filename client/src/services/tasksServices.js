import axios from "axios"

function addTask (body)
{

    return new Promise((resolve,reject)=>{
        axios({
            method: 'POST',
            url: '/task',
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

function updateTask (id,body)
{
    return new Promise((resolve,reject)=>{
        axios({
            method: 'PATCH',
            url: `/task/${id}`,
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

function deleteTask (id)
{
    return new Promise((resolve,reject)=>{
        axios({
            method: 'DELETE',
            url: `/task/${id}`,
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



export {addTask,updateTask,deleteTask}