import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'


export const Register = () => {
    const nav=useNavigate()
    const [register, setRegister] = useState({
        id: 1,
        email: "",
        password: "",  
        role:"user"

    })
    const [status, setStatus] = useState("")
    const[error,setError]=useState("")
    const handleChange=(e)=>{
        const {name,value}=e.target
        setRegister({
            ...register,
            [name]:value
        })

    }
    const handleRegister=async(e)=>{
        e.preventDefault();
        if(!register.email || !register.password){
            setError("Either email or password is empty")
            setStatus("")
            return

        }
        if(register.password.length<=8){
            setError("passward will be in minimum 8 character")
            setStatus("")
            return
        }
        try{
            const insert=await axios.get('http://localhost:3001/users')
            const insertdata=insert.data
            const reg={
                ...register,
                id:insertdata.length>0?insertdata.length+1:1
            }
            const match=insertdata.find(data=>data.email===register.email);
            if(match){
                setStatus("Already Registered")
                setError("")
                setTimeout(() => {
                    nav('/')
                    
                }, 3000);
                setRegister({
                    email: "",
                    password: "",  
                    role:"user"
                })
            }
            else{
                await axios.post('http://localhost:3001/users',reg)
                setStatus("Register Sucessfully")
                setError("")
                setTimeout(() => {
                    nav('/')
                }, 3000);
                setRegister({
                    email: "",
                    password: "",  
                    role:"user"
                })

            }
        }
        catch(error){
            console.error("Not registered")
        }
        
    }


    
  return (
    <div className='login-page'>
        <form className='form' >
        <h4 className='logo-login'>Fashion<span style={{ color: "Blue", fontSize: "35px", fontFamily: "monospace" }}>Now</span></h4>
        <h1 className='heading'>Register</h1>
        <div className='field'>
        <i class="bi bi-envelope-at-fill input-icon "></i>
        <input className='input-field' type="text" placeholder='E-mail' name='email'  value={register.email} onChange={handleChange}/>
        </div>
        <div className='field'>
        <i class="bi bi-lock input-icon"></i>
        <input className='input-field' type="password" placeholder='Create-Password' name='password'  value={register.password} onChange={handleChange}/>
        </div>
        <div className='btn'>
        <button className="button1"  onClick={handleRegister}>Register</button><br />
        </div>
        {error && <p style={{color:"red"}}>{error}</p>}
        {status && <p style={{color:"green"}}>{status}</p>}
        <p style={{color:"#ffff",textAlign:"center"}}>Existing user? <a href='/'>Login here</a></p>
        </form>

    </div>
  )
}
