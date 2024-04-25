// Importing----------------
import React, { useState, useEffect } from 'react';
import axios from "axios";
import moment from 'moment'

//--importing components-
import Room from '../components/Room';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import Error from '../components/Error';

//--import from antd for date picker
import { DatePicker } from "antd";
const { RangePicker } = DatePicker

function Homescreen() {
  //--useState hooks---
  const [rooms, setrooms] = useState([]);
  const [loading, setloading] = useState();
  const [error, seterror] = useState();
  const [fromdate, setfromdate] = useState();
  const [todate, settodate] = useState();
  const [duplicaterooms, setduplicaterooms] = useState([]);
  const [searchkey, setsearchkey] = useState('')
  const [type, settype] = useState('all')

  //--useEffect Hook
  useEffect(() => {
    const fetchData = async () => {
      try {
        setloading(true);
        const { data } = await axios.get('api/rooms/getallrooms'); //fatch data from Db
        setrooms(data);
        setduplicaterooms(data)
        // console.log(data)
        setloading(false)
      } catch (error) {
        seterror(true);
        console.error(error.message);
        setloading(false);
      }
    }
    fetchData();
  }, []);


  //--funciton for filger Rooms by date--
  function filterByDate(dates) {

    setfromdate((dates[0]).format('DD-MM-YYYY'))
    settodate((dates[1]).format('DD-MM-YYYY'))

    var temprooms = []
    var availability = false

    for (const room of duplicaterooms) {
      if (room.currentbookings.length > 0) {
        for (const booking of room.currentbookings) {
          if (!moment(dates[0]).isBetween(booking.fromdate, booking.todate) &&
            !moment(dates[1]).isBetween(booking.fromdate, booking.todate)) {
            if (
              (dates[0]).format('DD-MM-YYYY') !== booking.fromdate &&
              (dates[0]).format('DD-MM-YYYY') !== booking.todate &&
              (dates[1]).format('DD-MM-YYYY') !== booking.fromdate &&
              (dates[1]).format('DD-MM-YYYY') !== booking.todate
            ) {
              availability = true;
            }
          }
        }
      }
      if (availability === true || room.currentbookings.length === 0) {
        temprooms.push(room)
      }
      setrooms(temprooms)
    }
  };

  ////--function Search Rooms By name--
  function filterBySearch() {
    const temprooms = duplicaterooms.filter(room => room.roomname.toLowerCase().includes(searchkey.toLowerCase()))
    setrooms(temprooms)
  }

  ////---function for filter by Type of Room--
  function filterByType(e) {
    settype(e)
    if (e !== 'all') {
      const temprooms = duplicaterooms.filter(room => room.type.toLowerCase() == e.toLowerCase())
      setrooms(temprooms)
    }
    else {
      setrooms(duplicaterooms)
    }
  };

  return (
    <>
      <div className='container'>
        <div className='row bs margin-top bg-filter'>
          <div className='col-md-3'>
            <RangePicker format='DD-MM-YYYY' onChange={filterByDate} />
          </div>
          <div className='col-md-5'>
            <input type='text' className='form-control' placeholder='search rooms'
              value={searchkey} onChange={(e) => { setsearchkey(e.target.value) }} onKeyUp={filterBySearch} />
          </div>
          <div className='col-md-3'>
            <select className='form-control' value={type} onChange={(e) => { filterByType(e.target.value) }}>
              <option value='all'>All</option>
              <option value='delux'>Delux</option>
              <option value='non-delux'>Non-Delux</option>
            </select>
          </div>

        </div>

        <div className="row justify-content-center mt-5">
          {loading ? (<Loader />) : (rooms.map(room => {
            return <Room room={room} fromdate={fromdate} todate={todate} />
          }))}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Homescreen;
