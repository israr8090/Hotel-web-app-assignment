import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Tabs, Divider, Flex, Tag } from 'antd';
import Swal from 'sweetalert2'

import MyBookings from '../components/UserMyBookings';

function Profilescreen() {
    const user = JSON.parse(localStorage.getItem('currentUser'));

    //--if User is not logedin--
    useEffect(() => {
        if (!user) {
            window.location.href = '/login';
        }
    }, []);

    const onChange = (key) => {
        console.log(key);
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
            <Tabs defaultActiveKey="1" items={items} onChange={onChange} className='ml-3 margin-top' />;
        </>
    )
}

export default Profilescreen; 




