import React, { useState } from 'react'
import axios from 'axios'
import Loader from '../components/Loader';
import Error from '../components/Error';
import Success from '../components/Success';

//--user registration logic
function Registerscreen() {
    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [cpassword, setcpassword] = useState('');
    const [loading, setloading] = useState(false);
    const [error, seterror] = useState();
    const [success, setsuccess] = useState(); 

    //--function for user data send to backend
    function register() {
        if (password === cpassword) {
            const user = { name, email, password, cpassword };
            try {
                setloading(true)
                axios.post('/api/users/register', user)
                    .then(function (response) {
                        // console.log(response.data);
                    })
                    .catch(function (error) {
                        console.error(error.message);
                    });
                setloading(false)
                setsuccess(true)
                setname('')
                setemail('')
                setpassword('')
                setcpassword('')
            } 
            catch (error) {
                setloading(false)
                console.log(error)
                seterror(true)
            }
        } else {
            alert('password not matched')
        }
    }

    return (
        <div>
            {loading && (<Loader/>)}
            {error && (<Error/>)}
            <div className='row justify-content-center mt-5'>
                <div className='col-md-5 mt-5'>
                {success && (<Success message='Registration Success'/>)}
                    <div className='bs'>
                        <h2>Register</h2>
                        <input type='text' className='form-control' placeholder='name' value={name} onChange={(e) => { setname(e.target.value) }} />
                        <input type='text' className='form-control' placeholder='email' value={email} onChange={(e) => { setemail(e.target.value) }} />
                        <input type='password' className='form-control' placeholder='password' value={password} onChange={(e) => { setpassword(e.target.value) }} />
                        <input type='password' className='form-control' placeholder='confirm password' value={cpassword} onChange={(e) => { setcpassword(e.target.value) }} />
                    </div>
                    <button className='btn btn-primary mt-3' onClick={register}>Register</button>
                </div>
            </div>
        </div>
    )
}

export default Registerscreen;
