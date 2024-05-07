import React, { useState, useEffect } from 'react'
import axios from "axios";
import swal from 'sweetalert2';
import moment from 'moment';
import Stripe from 'react-stripe-checkout';
import { Carousel } from 'react-bootstrap';
import { useParams } from 'react-router-dom'

import Loader from '../components/Loader';
import Error from '../components/Error';


function Bookingscreen() {
  const { roomid, fromdate, todate } = useParams();
  const [loading, setloading] = useState();
  const [room, setroom] = useState();
  const [error, seterror] = useState();

  const [totalamount, settotalamount] = useState();
  const [totaldays, setTotalDays] = useState(0); // State to hold total days

  useEffect(() => {
    //------checking user login or not-----------------
    if (!localStorage.getItem('currentUser')) {
      window.location.href = '/login'
    }

    //--------------------
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

  //--------------------for stripe payment--------------------------------
  // const handleToken = async (totalAmount, token) => {
    //   const bookingDetalis = {
      //     room,
      //     roomid,
      //     userid: JSON.parse(localStorage.getItem('currentUser'))._id,
      //     fromdate,
      //     todate,
      //     totalamount,
      //     totaldays,
      //   };
      //   try {
        //     await axios.post('/api/bookings/bookroom', {
          //       bookingDetalis,
          //       token: token.id
          //     });
          //   } catch (error) {
            //     console.log(error)
            //   }
            // };
            // const tokenHandler = (token) => {
              //   handleToken(100, token);
              // }
              
              // async function onToken(token) {
                //   console.log(token)
                //   ////--Book Room -----------------------------
                //   const bookingDetalis = {
                  //     room,
                  //     roomid,
                  //     userid: JSON.parse(localStorage.getItem('currentUser'))._id,
                  //     fromdate,
                  //     todate,
                  //     totalamount,
                  //     totaldays,
                  //     email: token.email
                  //   };
                  //   console.log(bookingDetalis)
                  
  //   try {
  //     const result = await axios.post('/api/bookings/bookroom', bookingDetalis);
  //     console.log(result.data)
  //     console.log("hello")
  //     // swal.fire('Congratulations', 'Your Room Booked Successfully', 'success')
  //     //   .then( window.location.href = '/bookings' )
  //   }
  //   catch (error) {
  //     console.log(error)
  //     // swal.fire('Ops!', 'Somthing Went Wrong', 'error')
  //     //   .then(result => { window.location.href = '/bookings' })
  //   }
  // }
  //--------------------for stripe payment--------------------------------
  
  



  return (
    <div className='m-5'>

      {loading ? (<Loader />) : room ? (<div>

        <div className='row justify-content-between margin-top bs'>
          <div className='col-md-5'>
            <h1>{room.roomname}</h1>
            {/* <img src={room.imageurls != null && room.imageurls[0]} className='bigimg' alt='roomimg' /> */}
            {/* React-bootstrap carousel */}
            <Carousel prevLabel='' nextLabel=''>
              {room.imageurls.map(url => {
                return <Carousel.Item>
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
              {/* <Stripe
                amount={totalamount * 100}
                currency='INR'
                stripeKey='pk_test_51P6CRMSHZjHE7fTlMqQsHghrIkLWkuBwx3HEQ0bXw27NJU7NEjLRqIU3JAT8CPxHppxuDQA5qCNIOycAayCOvRZz00Fh6sy5Hd'
                token={onToken}>
                <button className='btn btn-primary mr-2'>Pay Now</button>
              </Stripe> */}

              {/* <Stripe
                stripeKey='pk_test_51P6CRMSHZjHE7fTlMqQsHghrIkLWkuBwx3HEQ0bXw27NJU7NEjLRqIU3JAT8CPxHppxuDQA5qCNIOycAayCOvRZz00Fh6sy5Hd'
                token={tokenHandler} /> */}

              <button className='btn btn-primary mr-2' onClick={bookRoom}>Pay Now</button>
              <button className='btn btn-primary' onClick={returnBack}>Back</button>
            </div>

          </div>
        </div>

      </div>) : (<Error />)}

    </div>
  )
}

export default Bookingscreen