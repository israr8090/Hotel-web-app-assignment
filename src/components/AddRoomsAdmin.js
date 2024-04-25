import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Tabs } from 'antd';
import swal from 'sweetalert2'

import Loader from '../components/Loader';
import Error from '../components/Error';

function AddRooms() {
    const [loading, setloading] = useState();
    const [error, seterror] = useState();
    const [roomname, setroomname] = useState('')
    const [rentperday, setrentperday] = useState()
    const [maxcount, setmaxcount] = useState()
    const [description, setdescription] = useState()
    const [phonenumber, setphonenumber] = useState()
    const [type, settype] = useState()
    const [imageurl1, setimageurl1] = useState()
    const [imageurl2, setimageurl2] = useState()
    const [imageurl3, setimageurl3] = useState()

    async function addRoom() {

        const newroom = {
            roomname,
            rentperday,
            maxcount,
            description,
            phonenumber,
            type,
            imageurls: [imageurl1, imageurl2, imageurl3]
        };
        // console.log(newroom)
        try {
            setloading(true)
            const result = await axios.post('api/rooms/addroom', newroom)
            // console.log(result)
            setloading(false)
            swal.fire('Congratulations', 'Your New Room Added Successfully', 'success')
                .then(result => { window.location.href = '/home' })
        } catch (error) {
            seterror(true)
            console.log(error)
            setloading(false)
            swal.fire('Ops!', 'Somthing Went Wrong', 'error')
        }
    }

    return (
        <>
            <div className='row'>
                {loading && (<Loader />)}

                <div className='col -md-5'>

                    <input type='text' className='form-control' placeholder='Room Name'
                        value={roomname} onChange={(e) => { setroomname(e.target.value) }} />

                    <input type='text' className='form-control' placeholder='Rent Per Day'
                        value={rentperday} onChange={(e) => { setrentperday(e.target.value) }} />

                    <input type='text' className='form-control' placeholder='Max Count'
                        value={maxcount} onChange={(e) => { setmaxcount(e.target.value) }} />

                    <input type='text' className='form-control' placeholder='Description'
                        value={description} onChange={(e) => { setdescription(e.target.value) }} />

                    <input type='text' className='form-control' placeholder='Phone Number'
                        value={phonenumber} onChange={(e) => { setphonenumber(e.target.value) }} />

                </div>
                <div className='col -md-5'>
                    <input type='text' className='form-control' placeholder='Type'
                        value={type} onChange={(e) => { settype(e.target.value) }} />

                    <input type='text' className='form-control' placeholder='Image URL 1'
                        value={imageurl1} onChange={(e) => { setimageurl1(e.target.value) }} />

                    <input type='text' className='form-control' placeholder='Image URL 2'
                        value={imageurl2} onChange={(e) => { setimageurl2(e.target.value) }} />

                    <input type='text' className='form-control' placeholder='Image URL 3'
                        value={imageurl3} onChange={(e) => { setimageurl3(e.target.value) }} />

                    <div className='text-right'>
                        <button className='btn btn-primary mt-2' onClick={addRoom} >Add Room</button>
                    </div>

                </div>
            </div>
        </>
    )
};

export default AddRooms