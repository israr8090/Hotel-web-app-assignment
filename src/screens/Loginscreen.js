import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import Error from '../components/Error';

function Loginscreen() {
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [loading, setloading] = useState(false);
    const [error, seterror] = useState();

    //--function for login--
    function login() {
        const user = { email, password };
        try {
            setloading(true)
            axios.post('https://hotal-web-app-backend.onrender.com/api/users/login', user)
                .then(function (response) {
                    // console.log(response.data);
                    setloading(false);
                    localStorage.setItem('currentUser', JSON.stringify(response.data))
                    window.location.href = '/home';
                })
                .catch(function (error) {
                    setloading(false)
                    seterror(true)
                    console.error(error.message);
                });

        } catch (error) {
            setloading(false)
            seterror(true)
            console.log(error);
        }
    }

    return (
        <div className='myprofile'>
            {loading && (<Loader/>)}
            <div className='row justify-content-center w-100 mt-5'>

                <div className='col-md-5 mt-5'>
                    {error && (<Error message= {'Invalid Creadntials'} />)}
                    <div className='bs bg-light '>
                        <h2>Login</h2>
                        <input type='text' className='form-control' placeholder='email' value={email} onChange={(e) => { setemail(e.target.value) }} />
                        <input type='password' className='form-control' placeholder='password' value={password} onChange={(e) => { setpassword(e.target.value) }} />
                    </div>
                    <button className='btn btn-primary mt-3' onClick={login}>Login</button>
                    <Link to="/register" className='btn btn-light mt-3'>create a account</Link>
                </div>

            </div>
        </div>
    )
}

export default Loginscreen;
