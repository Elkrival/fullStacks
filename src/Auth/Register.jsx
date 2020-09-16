import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';

export default function Register(){
    const history = useHistory()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const handleEmail = (e) => {
        setEmail(e.target.value)
    }
    const handlePassword = (e) => {
        setPassword(e.target.value)
    }
    const registerUser = (e) =>{
        e.preventDefault()
        const options = {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        return fetch("register", options).then(res => res.json()).then(data => {
            if(data.token) {
                localStorage.setItem('token', data.token);
                return history.push('/main-page')
            }
         
        })
    }
    const returnToLogin = () =>{
        return history.push('/')
    }
    return(
        <div className="container">
  <div className="row">
    <div className="col">
    <h1 className="display-4"> Register a new account</h1>
    </div>
  </div>
      &nbsp;
  <div className="row">
    <div className="col">
    </div>
    <div className="col">
    <form>
            <div className="form-group">
                <label htmlFor="registerEmailInput">Email address</label>
                <input onChange={(e) => handleEmail(e)} type="email" className="form-control" id="registerEmail" aria-describedby="registerEmailHelp" placeholder="Enter email" />
                <small id="registerEmailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
                <label htmlFor="registerPassword">Password</label>
                <input onChange={(e) => handlePassword(e)} type="password" className="form-control" id="registerPassword" placeholder="Password"/>
            </div>
            <div className="row">
                <div className="col">
                        <button onClick={() => returnToLogin()} className="btn btn-primary">Back to Login</button>          
                </div>
                <div className="col">
                        <button type="submit" className="btn btn-primary" onClick={(e) => registerUser(e)}>Submit</button>   
                </div>
            </div>
        </form>
    </div>
    <div className="col">
    </div>
    <div className="row">
    <div className="col">
    </div>
    <div className="col">
    </div>
  </div>
  </div>
</div>

    )
}