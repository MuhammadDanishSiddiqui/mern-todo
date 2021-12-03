import { AiOutlineUser,AiOutlineMail ,AiOutlineLock} from 'react-icons/ai'
import {
    Navigate,
    useNavigate 
  } from "react-router-dom";

 import {signupUser} from "../services/userServices" 
 import {useState} from "react"
 


function SingUp() {
    const navigate = useNavigate ()
    const [user, setUser] = useState({name:"",email:"",password:""})
    const [isLoading,setIsLoading]=useState(false)

    function handleChange(e)
    { 
   setUser({...user,[e.target.name]:e.target.value})
    }

    async function register(e)
    {
     
        e.preventDefault()
        setIsLoading(true)
        try {
            const response = await signupUser(user)
            setIsLoading(false)
            setUser({name:"",email:"",password:""})
            alert(response.message)
            navigate("/login")

        } catch (error) {
            setIsLoading(false)
           if(error?.errors?.email?.message)
           {
              return alert(error.errors.email.message)
           }
           if(error?.errors?.password?.message)
           {
              return alert(error.errors.password.message)
           }
           else if(error.message){
            return alert(error.message)
           }
           else {
               console.log(error)
           }
          
        }
     
        
        
    }
    return (
        <>
        {/* {props.user && <Navigate to="/"/> } */}
        <div className="user_form">
            <h1>Register</h1>
            <form method="POST" onSubmit={register} className="form_wrapper">
                <div>
                    <div>
                        <AiOutlineUser style={{ fontSize: "20px", color: "blue", resize: "none" }} />
                    </div>

                    <input disabled={isLoading} value={user.name} name="name" placeholder="Name" required onChange={e=>handleChange(e)}/>
                </div>
                <div>
                    <div>
                        <AiOutlineMail style={{ fontSize: "20px", color: "blue", resize: "none" }} />
                    </div>

                    <input disabled={isLoading} value={user.email} name="email" placeholder="Email" required onChange={e=>handleChange(e)}/>
                
                </div>
                <div>
                    <div>
                        <AiOutlineLock style={{ fontSize: "20px", color: "blue", resize: "none" }} />
                    </div>

                    <input disabled={isLoading} value={user.password} name="password" type="password" placeholder="Password" required onChange={e=>handleChange(e)}/>
                </div>

               {isLoading ? <h4 style={{alignSelf:"flex-end"}}>Loading...</h4> : <button className="register">Register</button> } 

            </form>

        </div>
        </>
    )
}

export default SingUp
