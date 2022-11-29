
import axios from "axios"
import joi from "joi"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {Helmet} from "react-helmet"


export function Login({Loginver}){

    let  [clickedbtn ,setclickedbtn] = useState(false)

    let [user,setUser]= useState({
        email:"",
        password:"", 
    })
    let [sendUserResponse,setSendUser]= useState()
    
    const [joiErorr,setJoiError]= useState(null)
    
    let navgite= useNavigate()




    function getSpecificError(key){
 
        if (joiErorr != null){
    
            for (let i = 0; i < joiErorr.length; i++) {
            if (joiErorr[i].context.key ==key){
                return  joiErorr[i].message
            }
            
            return ""
            }
    
        }
    
       
    
    }








    
    
    function getUser(e){
      
        let inputValue =e.target.value
        let propertyName= e.target.id
         let newUser= {...user}
         newUser[propertyName]=inputValue
         setUser(newUser)
         setJoiError(null)
         setSendUser(null)
    }

    async function  senduser(){
        let {data} = await axios.post("https://routeegypt.herokuapp.com/signin",user)
        setclickedbtn(false)
        if (data.message=="success"){
            localStorage.setItem("tkn",data.token)
           Loginver()
           navgite( '/home' )
           console.log(" i am navgatied to home now ")

           
        }
        else{
           console.log("email already registered")
        setSendUser(data.message)

        }
       
       }
    
    function setValidate(e){
        //prevent refresh
    e.preventDefault()
    setclickedbtn(true)
     
    const schema = joi.object({
        email:joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
        password: joi.string().min(6).max(20).alphanum()
    
    }
    

    )
   
    
    
    
    
    
    let joiResponse =schema.validate(user,{abortEarly:false})
    if (joiResponse.error==undefined){
        senduser()
      
    }
    else{
        let errlist=joiResponse.error.details
        setclickedbtn(false)
     
        setJoiError(errlist)
    }
    }
    
        return <>

<Helmet>


<title>Log in</title>
<meta name="description" content="log in form " />
</Helmet>
        <div className="container w-50 py-5">
    
            <form onSubmit={setValidate}>
        <h3 className="mb-5">Login form</h3>
    
    
    
   
        <label htmlFor="email mt-3">Email</label>
        <input type="email" onChange={getUser} id="email" className=" form-control my-3" placeholder="email"/>
    {getSpecificError('email')? <div className="alert alert-danger "> {getSpecificError('email')}</div>: ''}

        <label htmlFor="password">password </label>
        <input type="password" onChange={getUser} id="password" className=" form-control my-3" placeholder="password "/>
        {getSpecificError('password')? <div className="alert alert-danger ">{getSpecificError('password')}</div>: ''}
        <button  className="btn btn-outline-info ">{clickedbtn == false? "Log in" : <i className="fa-solid fa-spinner fa-spin"></i>}</button>
    {sendUserResponse== undefined?"" : <div className="alert alert-danger my-2">{sendUserResponse}</div>}
    
    
    
    
            </form>
        </div>
        
        
        </>
}