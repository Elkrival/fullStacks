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
            <div className="form-group">
                <label for="password">Password</label>
                <input type="password" className="form-control" id="password" placeholder="Password"/>
            </div>
            <div className="form-check">
                <input type="checkbox" className="form-check-input" id="rememberCheck" />
                <label className="form-check-label" for="rememberMe">Remember Me</label>
            </div>
            <NavLink to="/main-page" activeClassName="selected">
            <button type="submit" className="btn btn-primary">Submit</button>
</NavLink>
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