import  joi  from "joi"
import { useState } from "react"
import  axios from  "axios"
import { useNavigate } from "react-router-dom"
import {Helmet} from "react-helmet"



export function Register(){

let [user,setUser]= useState({
    first_name:"",
    last_name:"",
    email:"",
    age:0,
    password:"",
})
let [sendUserResponse,setSendUser]= useState()
let  [clickedbtn ,setclickedbtn] = useState(false)
const [joiErorr,setJoiError]= useState(null)

let navgite= useNavigate()


function getUser(e){
    setJoiError(null)
    setSendUser(null)
    let inputValue =e.target.value
    let propertyName= e.target.id
     let newUser= {...user}
     newUser[propertyName]=inputValue
     setUser(newUser)
     
     
}

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




function setValidate(e){
    //prevent refresh
e.preventDefault()
 setclickedbtn(true)
const schema = joi.object({
    first_name:joi.string().min(3).max(10).alphanum().required(),
    last_name:joi.string().min(3).max(10).alphanum().required(),
    email:joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    age:joi.number().min(10).max(70).required(),
    password: joi.string().min(6).max(20).alphanum().required()

})

let joiResponse =schema.validate(user,{abortEarly: false})
if (joiResponse.error==undefined){
    senduser()

  
}
else{
    let errlist=joiResponse.error.details
 
    setJoiError(errlist)
 setclickedbtn(false)

}





}



async function  senduser(){

    let {data} = await axios.post("https://routeegypt.herokuapp.com/signup",user)
   
    setclickedbtn(false)

    if (data.message=="success"){
       navgite("/login")
    }
    else{
       console.log("email already registered")
       setSendUser(data.message)
    }
   
   }



    return <>
       
       <Helmet>


<title>Register</title>
<meta name="description" content="Registration form " />
</Helmet>
    <div className="container w-50 py-5">

        <form onSubmit={setValidate}>
    <h3 className="mb-4">Registration form</h3>




<label htmlFor="first_name">first_name</label>
    <input  type="text" onChange={getUser} id="first_name" className=" form-control  my-3" placeholder="first_name"/>
   
    {getSpecificError('first_name')? <div className="alert alert-danger "> {getSpecificError('first_name')}</div>: ''}
    <label htmlFor="last_name">last_name</label>
    <input type="text" onChange={getUser} id="last_name" className=" form-control my-3" placeholder="last_name"/>
    {getSpecificError('last_name')? <div className="alert alert-danger "> {getSpecificError('last_name')}</div>: ''}

    <label htmlFor="email">Email</label>
    <input type="email" onChange={getUser} id="email" className=" form-control my-3" placeholder="email"/>
    {getSpecificError('email')? <div className="alert alert-danger "> {getSpecificError('email')}</div>: ''}

    {sendUserResponse== undefined?'' : <div className="alert alert-danger my-2">{sendUserResponse}</div>}

    <label htmlFor="age">age </label>
    <input type="number" onChange={getUser} id="age" className=" form-control my-3" placeholder="age "/>
    {getSpecificError('age')? <div className="alert alert-danger "> {getSpecificError('age')}</div>: ''}


    <label htmlFor="password">password </label>
    <input type="password" onChange={getUser} id="password" className=" form-control my-3" placeholder="password "/>
    {getSpecificError('password')? <div className="alert alert-danger ">password must be from 6-20 characters and numbers only </div>: ''}


    <button  className="btn btn-outline-info ">{clickedbtn == false? "Register" : <i className="fa-solid fa-spinner fa-spin"></i>}</button>




        </form>
    </div>
    
    
    </>
}