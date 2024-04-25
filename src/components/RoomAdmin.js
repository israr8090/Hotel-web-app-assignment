import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Tabs } from 'antd';
import swal from 'sweetalert2'

import Loader from '../components/Loader';
import Error from '../components/Error';

function Rooms() {
    const [rooms, setrooms] = useState([])
    const [loading, setloading] = useState();
    const [error, seterror] = useState();

    useEffect(() => {
        async function fatch() {
            try {
                setloading(true)
                const data = (await axios.get("/api/rooms/getallrooms")).data;
                setrooms(data)
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
                    <h1>Rooms</h1>
                    {loading && (<Loader />)}
                    <table className='table table-bordered table-dark'>
                        <thead className='bs thead-dark'>
                            <tr>
                                <th>Room Id</th>
                                <th>Name</th>
                                <th>Type</th>
                                <th>Rent Per Day</th>
                                <th>Max Count</th>
                                <th>Phone Number</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rooms.length && (rooms.map(room => {
                                return <tr>
                                    <td>{room._id}</td>
                                    <td>{room.name}</td>
                                    <td>{room.type}</td>
                                    <td>{room.rentperday}</td>
                                    <td>{room.maxcount}</td>
                                    <td>{room.phonenumber}</td>
                                </tr>
                            }))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
};

export default Rooms;