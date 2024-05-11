import React, { useEffect } from 'react'
import { Tabs } from 'antd';

//-import components from components folder
import Bookings from '../components/Bookings'
import Rooms from '../components/RoomAdmin'
import Users from '../components/UserReport'
import AddRooms from '../components/AddRoomsAdmin'

function Adminscreen() {
    ////--checking is user is admin or not
    useEffect(() => {
        if (!JSON.parse(localStorage.getItem('currentUser')).isAdmin) {
            window.location.href = '/home'
        }
    }, []);

    ////--using tab from andt--------
    const onChange = (key) => {
        console.log(key);
    };
    const items = [
        {
            /////--------Checking Bookings Report----------------------------------------
            key: '1',
            label: 'Bookings',
            children: <Bookings />,
        },
        {
            //////------CHecking Rooms Report--------------------------------------------
            key: '2',
            label: 'Rooms',
            children: <Rooms />,
        },
        {
            ///////-----Adding A New Room----------------------------------------
            key: '3',
            label: 'Add Room',
            children: <AddRooms />,
        },
        {
            ////////----User Report Function----------------------------------------------
            key: '4',
            label: 'Users',
            children: <Users />,
        },
    ];

    return (
        <div className='mt-lg-5  ml-3 mr-3 bs'>
            <h2 className='text-center' style={{ fontSize: '30px' }}><b>Admin Panel</b></h2>
            <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        </div>
    );
};

export default Adminscreen;