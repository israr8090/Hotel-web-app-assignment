import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Tabs } from 'antd';
import swal from 'sweetalert2'

import Loader from '../components/Loader';
import Error from '../components/Error';

function Users() {
    const [users, setusers] = useState([])
    const [loading, setloading] = useState();
    const [error, seterror] = useState();

    useEffect(() => {
        async function fatch() {
            try {
                setloading(true)
                const data = (await axios.get("https://hotal-web-app-backend.onrender.com/api/users/getallusers")).data;
                setusers(data)
                setloading(false)
            } catch (error) {
                seterror(true)
                console.log(error.messag)
                setloading(false)
            }
        }
        fatch()
    }, []);

    return (
        <>
            <div className='row'>
                <div className='col -md-12'>
                    <h1>Users</h1>
                    {loading && (<Loader />)}
                    <table className='table table-bordered table-dark'>
                        <thead className='bs thead-dark'>
                            <tr>
                                <th>User Id</th>
                                <th>User Name</th>
                                <th>User Email</th>
                                <th>Is Admin</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users && (users.map(user => {
                                return <tr>
                                    <td>{user._id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.isAdmin ? 'Yes' : 'No'}</td>
                                </tr>
                            }))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
};

export default Users;