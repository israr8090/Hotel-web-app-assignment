import React, { useState, useEffect } from 'react'
import axios from "axios";
import swal from 'sweetalert2';
import moment from 'moment';
import { Carousel } from 'react-bootstrap';
import { useParams } from 'react-router-dom'
// import Stripe from 'react-stripe-checkout';

//-import components from components folder--
import Loader from '../components/Loader';
import Error from '../components/Error';

function Bookingscreen() {
  //-storing data from URL --
  const { roomid, fromdate, todate } = useParams();

  //--Defining States--
  const [loading, setloading] = useState();
  const [room, setroom] = useState();
  // const [error, seterror] = useState();

  const [totalamount, settotalamount] = useState();
  const [totaldays, setTotalDays] = useState(0); // State to hold total days

  useEffect(() => {
    //------checking user login or not-----------------
    if (!localStorage.getItem('currentUser')) {
      window.location.href = '/login'
    }

    setloading(true);
    axios.post('https://hotal-web-app-backend.onrender.com/api/rooms/getroombyid', { _id: roomid })
      .then(function (response) {
        // console.log(response.data)
        setroom(response.data);
        // Calculate total days difference
        const daysDiff = moment(todate, 'DD/MM/YYYY').diff(moment(fromdate, 'DD/MM/YYYY'), 'days');
        setTotalDays(daysDiff + 1); // Adding 1 to include both fromdate and todate
        settotalamount(response.data.rentperday * (daysDiff + 1)); // Setting total amount
        setloading(false);
      })
      .catch(function (error) {
        console.error(error.message);
        setloading(false);
      });
  }, [roomid, fromdate, todate]);

  ////-- Return Back page---------------------
  function returnBack() {
    window.location.href = '/home';
  }

  // ////--Book Room function-----------------------------
  async function bookRoom() {
    const bookingDetalis = {
      room,
      roomid,
      userid: JSON.parse(localStorage.getItem('currentUser'))._id,
      fromdate,
      todate,
      totalamount,
      totaldays,
    };
    // console.log(bookingDetalis)

    try {
      const result = await axios.post('https://hotal-web-app-backend.onrender.com/api/bookings/bookroom', bookingDetalis);
      console.log(result.data)
      swal.fire('Congratulations', 'Your Room Booked Successfully', 'success')
        .then( window.location.href = '/profile' )
    }
    catch (error) {
      console.log(error)
      swal.fire('Ops!', 'Somthing Went Wrong', 'error')
        .then(result => { window.location.href = '/home' })
    }
  };

  return (
    <div className='m-5 bookingscreen'>

      {loading ? (<Loader />) : room ? (<div>

        <div className='row justify-content-between margin-top bs1 p-3 rounded-5'>
          <div className='col-md-5'>
            <h1>{room.roomname}</h1>
            <Carousel prevLabel='' nextLabel=''>
              {room.imageurls.map(url => {
                return <Carousel.Item key={room._id}>
                  <img className='bigimg ' src={url} alt='room img' />
                </Carousel.Item>
              })}
            </Carousel>
          </div>
          <div className='col-md-5' style={{ textAlign: 'right' }}>
            <h1>Booking Details</h1>
            <hr />
            <b>
              <p>Name : {JSON.parse(localStorage.getItem('currentUser')).name} </p>
              <p>Check-In : {fromdate}</p>
              <p>Check-Out : {todate} </p>
              <p>Max Count : {room.maxcount} </p>
              <p>Total days :{totaldays}</p>
            </b>

            <div style={{ textAlign: 'right' }}>
              <b>
                <h1>Amount</h1>
                <hr />
                <p>Rent per day : {room.rentperday}/-</p>
                <p>Total Amount : {totalamount}/-</p>
              </b>
            </div>

            <div style={{ float: 'right' }}>
              <button type='button' className='btn btn-primary mr-2' onClick={bookRoom}>Pay Now</button>
              <button className='btn btn-primary' onClick={returnBack}>Back</button>
            </div>

          </div>
        </div>

      </div>) : (<Error />)}

    </div>
  )
}

export default Bookingscreen