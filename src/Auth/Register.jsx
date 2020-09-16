import React, { useEffect, useState } from 'react'
import { NavLink }   from "react-router-dom";

export default function Register(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const handleEmail = (e) => {
        setEmail(e.target.value)
    }
    const handlePassword = (e) => {
        setPassword(e.target.value)
    }
    const submitCredentials = () =>{
        const options = {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: { 
                'Content-Type': 'Application/json'
            }
        }
        return fetch('register', options).then(res => res.json()).then(data => {
            console.log(data)
            return data
        })
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
                <label for="emailInput">Email address</label>
                <input onChange={(e) => handleEmail(e)} type="email" className="form-control" id="emailInput" aria-describedby="emailHelp" placeholder="Enter email" />
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
                <label for="password">Password</label>
                <input onChange={(e) => handlePassword(e)} type="password" className="form-control" id="password" placeholder="Password"/>
            </div>
            <div className="form-group row">
                <div className="col">
                        <button onClick={() => submitCredentials()} type="submit" className="btn btn-primary">Submit</button>          
                </div>
                <div className="col">
                    <NavLink to="/" activeClassName="selected">
                        <button type="submit" className="btn btn-primary">Back to Login</button>          
                    </NavLink>
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