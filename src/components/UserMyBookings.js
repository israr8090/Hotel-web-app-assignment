import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Tag } from 'antd';
import Swal from 'sweetalert2'

import Loader from '../components/Loader';
// import Error from '../components/Error';

// ---My Booking Tab Function--------------------------------------------------------
function MyBookings() {
    const [bookings1, setbookings1] = useState([])
    const [loading, setloading] = useState();
    const [error, seterror] = useState();

    const user = JSON.parse(localStorage.getItem('currentUser'));

    // fatching Bookings 
    useEffect(() => {
        async function fetchData() {
            try {
                // You can await here
                setloading(true)
                const response = await axios.post('https://hotal-web-app-backend.onrender.com/api/bookings/getbookingsbyuserid', { userid: user._id })
                // console.log(response.data)
                setbookings1(response.data)
                // console.log(bookings1)
                setloading(false)
            } 
            catch (error) {
                seterror(true)
                console.error(error.message)
                setloading(false)
                Swal.fire('Oops', 'Something Went Wrong', 'error')
            }
        }
        fetchData();
    }, []);

    // ////----------cancel booking function------
    async function cancelBooking(bookingid, roomid) {
        try {
            setloading(true);
            const result = (await axios.post('api/bookings/cancelbooking', { bookingid, roomid })).data;
            console.log(result)
            setloading(false)
            Swal.fire('Congrats', 'Your Booking has been cancelled', 'success').then(result => {
                window.location.reload();
            })
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <div className='row myprofile-bookings'>
            <div className='col-md-8 ml-5'>
                {loading && (<Loader />)}
                {bookings1 && (bookings1.map(booking => {
                return( 
                        <div key={booking._id} className='bs bookings-cards'>
                            <h1>{booking.room}</h1> 
                            <p><b>booking-ID</b>  : {booking._id}</p>
                            <p><b>Check-In</b> : {booking.fromdate}</p>
                            <p><b>Check-Out</b> : {booking.todate}</p>
                            <p><b>Amount</b> : {booking.totalamount}</p>
                            <p><b>Status </b>: {booking.status === 'cancelled' ? (<Tag color="orange">CANCELLED</Tag>) : (<Tag color="green">CONFIRMED</Tag>)} </p>

                            {booking.status !== 'cancelled' && (
                                <div className='text-right'>
                                    <button className='btn btn-primay' onClick={() => { cancelBooking(booking._id, booking.roomid) }} >CANCEL BOOKING</button>
                                </div>
                            )}
                        </div>
                    )}))}
               
            </div>
        </div>
    )
};

export default MyBookings;