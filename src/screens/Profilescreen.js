import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Tabs, Divider, Flex, Tag } from 'antd';
import Swal from 'sweetalert2'

import Loader from '../components/Loader';
import Error from '../components/Error';

function Profilescreen() {
    const user = JSON.parse(localStorage.getItem('currentUser'));

    //--if User is not logedin--
    useEffect(() => {
        if (!user) {
            window.location.href = '/login';
        }
    }, []);

    const onChange = (key) => {
        // console.log(key);
    };
    const items = [
        {
            key: '1',
            label: 'Profile',
            children: <>
                <h1>My Profile</h1>,
                <br />
                <h1>Name : {user.name}</h1>
                <h1>Email : {user.email}</h1>
                <h1>isAdmin : {user.isAdmin ? 'Yes' : 'No'}</h1>
            </>
        },
        {
            key: '2',
            label: 'Bookings',
            children: <MyBookings />,
        }
    ];
    return (
        <>
            <Tabs defaultActiveKey="1" items={items} onChange={onChange} className='ml-3 mt-3' />;
        </>
    )
}

export default Profilescreen; 

// ---My Booking Tab Function--------------------------------------------------------
export function MyBookings() {
    const [bookings, setbookings] = useState([])
    const [loading, setloading] = useState();
    const [error, seterror] = useState();

    const user = JSON.parse(localStorage.getItem('currentUser'));

    // fatching Bookings 
    useEffect(() => {
        async function fetchData() {
            try {
                // You can await here
                setloading(true)
                const response = await axios.post('/api/bookings/getbookingsbyuserid', { userid: user._id })
                // console.log(response.data)
                setbookings([response.data])
                setloading(false)
            } 
            catch (error) {
                seterror(true)
                console.error(error.message)
                setloading(false)
                // Swal.fire('Oops', 'Something Went Wrong', 'error')
            }
        }
        fetchData();
    }, []);

    ////----------cancel booking function------
    // async function cancelBooking(bookingid, roomid) {
    //     try {
    //         setloading(true);
    //         const result = (await axios.post('/api/bookings/cancelbooking', { bookingid, roomid })).data;
    //         console.log(result)
    //         setloading(false)
    //         Swal.fire('Congrats', 'Your Booking has been cancelled', 'success').then(result => {
    //             window.location.reload();
    //         })
    //     } catch (error) {
    //         console.log(error.message)
    //     }
    // }

    return (
        <div className='row'>
            <div className='col-md-6'>
                {loading && (<Loader />)}
                {bookings && (bookings.map(booking => {
                return( 
                        <div className='bs'>
                            <h1>{booking.room}</h1> 
                            <p><b>bookingId</b>: {booking._id}</p>
                            <p><b>CheckIn</b>: {booking.fromdate}</p>
                            <p><b>CheckOut</b>: {booking.todate}</p>
                            <p><b>Amount</b>: {booking.totalamount}</p>
                            <p><b>Status</b>:{booking.status === 'cancelled' ? (<Tag color="orange">CANCELLED</Tag>) : (<Tag color="green">CONFIRMED</Tag>)} </p>

                            {/* {booking.status !== 'cancelled' && (
                                <div className='text-right'>
                                    <button className='btn btn-primay' onClick={() => { cancelBooking(booking._id, booking.roomid) }} >CANCEL BOOKING</button>
                                </div>
                            )} */}
                        </div>
                    )}))}
            </div>
        </div>
    )
};


