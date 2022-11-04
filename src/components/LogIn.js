import { useState } from "react"
import { useNavigate,Link } from "react-router-dom"

export default function Login(props) {
    const [userData, setUserData] = useState({email:"",password:""})
    const navigate=useNavigate()
    const onChange=(e)=>{
        setUserData(prev=>({...prev,[e.target.name]:e.target.value}))
    }
    const handleOnSubmit=async (e)=>{
        e.preventDefault()
        const response=await fetch("api/auth/login",{
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify({email:userData.email,password:userData.password})
        })
        const data= await response.json()
        if(data.success){
            localStorage.setItem("authToken",data.authToken)
            //redirect to home
            navigate('/')
            setUserData({email:"",password:""})
            props.showAlert("Yeahh!!","You have logged in","success")
        }
        else{
            props.showAlert("Be Carefull","Invalid Credentials","warning")
        }
    }
    return (
        <>
            <form className="d-flex flex-column justify-content-center" style={{height:"90vh" , width:(window.innerWidth<=477?"90%":"50%")}} onSubmit={handleOnSubmit}>
                <h2>Log In to <span className="logoColor">iNoteBook</span></h2>
                <div className="mb-3">
                        <div id="emailHelp" className="form-text mb-3">Your email and password is still secured with us and always will be</div>
                    <label htmlFor="Email" className="form-label">Email address</label>
                    <input type="email" name="email" className="form-control" id="Email" aria-describedby="emailHelp"value={userData.email} onChange={onChange}  required />
                </div>
                <div className="mb-3">
                    <label htmlFor="Password" className="form-label">Password</label>
                    <input type="password" name="password" className="form-control" value={userData.password} id="Password" onChange={onChange} required minLength={5}/>
                </div>
                <button type="submit" className="btn btn-primary ms-3" style={{width:(window.innerWidth<=768?"30%":"20%")}} onSubmit={handleOnSubmit}>Log In</button>
                <div className="mt-3">
                    <span>If you are a new user, then <Link to="/signup">sign up</Link></span>
                </div>
            </form>
        </>
    )
}