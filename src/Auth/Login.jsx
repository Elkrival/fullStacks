import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';

export default function Login(){
    const history = useHistory()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const handleEmail = (e) =>{
        setEmail(e.target.value)
    }
    const handlePassword = (e) =>{
        setPassword(e.target.value)
    }
    const handleLogin = (e) => {
        e.preventDefault();
        const options = {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': "Application/json"
            }
        }
        return fetch('login', options).then(res => res.json()).then(data => {
            if(data.user) {
                localStorage.setItem('token', data.token);
                return history.push('/main-page')
            }
        })
    }
    const routeToRegister = (e) =>{
        e.preventDefault()
        return history.push('/register-user')
    }
    return(
        <div className="container">
  <div className="row">
    <div className="col">
    <h1 className="display-4">Login to the Ultimate Drawing Pad</h1>
    </div>
  </div>
      &nbsp;
  <div className="row">
    <div className="col">
    </div>
    <div className="col">
        <form>
            <div className="form-group">
                <label htmlFor="emailInput">Email address</label>
                <input onChange={(e) => handleEmail(e)} type="email" className="form-control" id="emailInput" aria-describedby="emailHelp" placeholder="Enter email" />
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group row">
                <label htmlFor="password">Password</label>
                <input onChange={(e) => handlePassword(e)} type="password" className="form-control" id="password" placeholder="Password"/>
            </div>
            <div className="form-check row">
                <input type="checkbox" className="form-check-input" id="rememberCheck" />
                <label className="form-check-label" htmlFor="rememberMe">Remember Me</label>
            </div>
            <div className="row">
                <div className="col">
                        <button  className="btn btn-primary" onClick={(e) => routeToRegister(e)} >Register</button>          
                </div>
                <div className="col">
                        <button className="btn btn-primary" onClick={(e) => handleLogin(e)}>Submit</button>       
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