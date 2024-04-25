import React from 'react'
import {Link} from 'react-router-dom'

function Landingscreen() {
  return (
    <div className='landing '>
        <div className='col-md-12 text-center'>
            <h2 style={{color:'white', fontSize:'80px'}} >BaBa's Rooms</h2>
            <h1 style={{color:'white'}}>"Be benefit-driven: Consider what guests or meeting planners will benefit from booking with you."</h1>

            <Link to='/home'>
                <button className='btn btn-primay landing-btn'>Get Started</button>
            </Link>
        </div>
    </div>
  )
}

export default Landingscreen