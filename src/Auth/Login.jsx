import React, { useEffect, useState } from 'react'
import { NavLink }   from "react-router-dom";

export default function Login(){
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
                <label for="emailInput">Email address</label>
                <input type="email" className="form-control" id="emailInput" aria-describedby="emailHelp" placeholder="Enter email" />
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group row">
                <label for="password">Password</label>
                <input type="password" className="form-control" id="password" placeholder="Password"/>
            </div>
            <div className="form-check row">
                <input type="checkbox" className="form-check-input" id="rememberCheck" />
                <label className="form-check-label" for="rememberMe">Remember Me</label>
            </div>
            <div className="form-group row">
                <div className="col">
                    <NavLink to="/main-page" activeClassName="selected">
                        <button type="submit" className="btn btn-primary">Submit</button>          
                    </NavLink>
                </div>
                <div className="col">
                    <NavLink to="/register" activeClassName="selected">
                        <button type="submit" className="btn btn-primary">Register</button>          
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