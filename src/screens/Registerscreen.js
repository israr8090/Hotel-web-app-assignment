import React, { useState } from 'react'
import axios from 'axios'
import swal from 'sweetalert2';
import Loader from '../components/Loader';
import Error from '../components/Error';
import Success from '../components/Success';
import { Link } from 'react-router-dom';

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
                if(name=='' || email== '' || password=='' || cpassword==''){
                    seterror(true)                  
                }
                
                else{
                    setloading(true)
                    axios.post('https://hotal-web-app-backend.onrender.com/api/users/register', user)
                        .then(function (response) {
                            // console.log(response.data);
                            swal.fire('Congratulations', 'Registration Success', 'success')
                            .then( window.location.href = '/login' )
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
        <div className='myprofile'>
            {loading && (<Loader/>)}
            {error && (<Error/>)}
            <div className='row justify-content-center mt-5'>
                <div className='col-md-5 mt-5'>
                {/* {success && (<Success message='Registration Success'/>)} */}
                {error && (<Error  message='All Field Required'/>)}
                    <div className='bs bg-light'>
                        <h2>Register</h2>
                        <input type='text' className='form-control' placeholder='name' value={name} onChange={(e) => { setname(e.target.value) }} />
                        <input type='text' className='form-control' placeholder='email' value={email} onChange={(e) => { setemail(e.target.value) }} />
                        <input type='password' className='form-control' placeholder='password' value={password} onChange={(e) => { setpassword(e.target.value) }} />
                        <input type='password' className='form-control' placeholder='confirm password' value={cpassword} onChange={(e) => { setcpassword(e.target.value) }} />
                    </div>
                    <button className='btn btn-primary mt-3' onClick={register}>Register</button>
                    <Link to="/login" className='btn btn-light mt-3'>Allready Registered</Link>
                </div>
            </div>
        </div>
    )
}

export default Registerscreen;
