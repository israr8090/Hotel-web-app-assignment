import React, { useEffect, useState } from 'react'
import axios from 'axios';
// import { Tabs } from 'antd';
// import swal from 'sweetalert2'

import Loader from '../components/Loader';
// import Error from '../components/Error';


function Bookings() {
    const [bookings, setbookings] = useState([])
    const [loading, setloading] = useState();
    const [error, seterror] = useState();

    useEffect(() => {
        async function fatch() {
            try {
                setloading(true)
                const data = await axios.get("https://hotal-web-app-backend.onrender.com/api/bookings/getallbookings");
                setbookings(data.data)
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
                    {loading && (<Loader />)}
                    <h1>Bookings</h1>
                    <table className='table table-bordered table-dark'>
                        <thead className='bs thead-dark'>
                            <tr>
                                <th>Booking Id</th>
                                <th>User Id</th>
                                <th>Room</th>
                                <th>From</th>
                                <th>TO</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.length && (bookings.map(booking => {
                                return <tr>
                                    <td>{booking._id}</td>
                                    <td>{booking.userid}</td>
                                    <td>{booking.room}</td>
                                    <td>{booking.fromdate}</td>
                                    <td>{booking.todate}</td>
                                    <td>{booking.status}</td>
                                </tr>
                            }))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Bookings;