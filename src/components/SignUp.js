import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export default function SignUp(props) {
    const [credentials, setCredentials] = useState({name:"",email:"",password:""})
    const navigate=useNavigate()
    const onChange=(e)=>{
        setCredentials(prev=>({...prev,[e.target.name]:e.target.value}))
    }
    const handleOnSubmit=async (e)=>{
        e.preventDefault()
        console.log(credentials)
        const response=await fetch("api/auth/createUser",{
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password})
        })
        const data= await response.json()
        console.log(data)
        if(data.success){
            localStorage.setItem("authToken",data.authToken)
            //redirect to home
            navigate('/')
            setCredentials({name:"",email:"",password:""})
            props.showAlert("Congratulations!","Account Created Sucessfully, Write your first Note","success")
        }
        else{
           props.showAlert("Try Again","Invalid Credentials","danger")
        }
    }
    return (
        <>
            <form className="d-flex flex-column justify-content-center" style={{ height: "80vh", width: (window.innerWidth <= 477 ? "90%" : "50%")}} onSubmit={handleOnSubmit}>
            <h2>Get started to <span className="logoColor">iNoteBook</span> by Creating an Account</h2>
                <div className="mb-3">
                    <label htmlFor="Name" className="form-label">Name</label>
                    <input type="text" name="name" className="form-control" id="Name" aria-describedby="emailHelp" value={credentials.name} onChange={onChange}/>
                    <div id="emailHelp" className="form-text">We'll never share your email and password with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="Email" className="form-label">Email address</label>
                    <input type="email" name="email" className="form-control" id="Email" aria-describedby="emailHelp" value={credentials.email} onChange={onChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="Password" className="form-label">Password</label>
                    <input type="password" name="password" className="form-control" value={credentials.password} id="Password" onChange={onChange} required minLength={8} />
                </div>
                <button type="submit" className="btn btn-primary ms-3" style={{ width: (window.innerWidth <= 768 ? "30%" : "20%") }}>Sign Up</button>
                <div className="mt-3">
                    <span>already have an account, then <Link to="/login">log in</Link></span>
                </div>
            </form>
        </>
    )
}