import React from 'react'
import './navbar.css'

function Navbar() {
  return (
    <div>
        <nav class="navbar navbar-expand-lg">
            <div class="container-fluid">
                
                <h1 class="navbar-brand h-font">HOSTLY</h1>
                
                <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav  ">
                    <li class="nav-item">
                    <a class="nav-link active"  href="/home">Home</a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link" href="/register">Register</a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link" href="/login">Login</a>
                    </li>
                    
                </ul>
                </div>
            </div>
    </nav>
    </div>
  )
}

export default Navbar
