
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Room from '../components/Room';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween'; 
import { DatePicker, Space } from 'antd';
import './homescreen.css'
import Loader from '../components/Loader';

dayjs.extend(isBetween);
const { RangePicker } = DatePicker;



const Homescreen = () => {

    const [rooms, setRooms] = useState([]);
    const [loading, setloading] = useState();
    const [error, seterror] = useState();
    const [fromdate, setfromdate] = useState()
    const [todate, settodate] = useState()
    const [duplicaterooms, setduplicaterooms] = useState([])
    const[searchkey, setsearchkey]=useState('')
    const[type,settype]=useState('all')
    useEffect(() => {
        const fetchData = async () => {
            try {
                setloading(true)
                const response = await axios.get('http://localhost:5000/api/rooms/getallrooms');

                setRooms(response.data);
                setduplicaterooms(response.data);
                setloading(false)
            } catch (error) {
                seterror(true)
                console.log(error);
                setloading(false)
            }
        };

        fetchData();
    }, []);

    function filterByDate(dates) {
        if (dates) {

            const fromdate = dayjs(dates[0]).format('DD-MM-YYYY');
            const todate = dayjs(dates[1]).format('DD-MM-YYYY');
            setfromdate(fromdate);
            settodate(todate);

            //filtering

            var temprooms = []
            var availability = false
            for (const room of duplicaterooms) {
                if (room.currentbookings.length > 0) {
                    for (const booking of room.currentbookings) {
                        if (!dayjs(dayjs(dates[0]).format('DD-MM-YYYY')).isBetween(booking.fromdate, booking.todate)
                            && !dayjs(dayjs(dates[1]).format('DD-MM-YYYY')).isBetween(booking.fromdate, booking.todate)
                        ) {
                            if (
                                dayjs(dates[0]).format('DD-MM-YYYY') !== booking.fromdate &&
                                dayjs(dates[0]).format('DD-MM-YYYY') !== booking.todate &&
                                dayjs(dates[1]).format('DD-MM-YYYY') !== booking.fromdate &&
                                dayjs(dates[1]).format('DD-MM-YYYY') !== booking.todate
                            ) {
                                availability = true
                            }
                        }
                    }
                }
                if (availability == true || room.currentbookings.length == 0) {
                    temprooms.push(room)
                }
                setRooms(temprooms)
            }
           


        }
    }
    /*search functionality */
    function filterBySearch(){
         const temprooms = duplicaterooms.filter(room=>room.name.toLowerCase().includes(searchkey.toLowerCase()))
         setRooms(temprooms)

    }
    function filterByType(e){
       if(!e=='all'){
        const temprooms = duplicaterooms.filter(room=>room.type.toLowerCase()==e.toLowerCase())
        setRooms(temprooms)
       }
       else{
        setRooms(duplicaterooms)
       }
    }
    return (
        <div className="container">
            {/* implementing the date range filter */}
            <div className='row mt-5 bs ral'>
                <div className=' col-md-3'>
                    <RangePicker onChange={filterByDate} />
                </div>
                <div className='col-md-5'>
                    <input type='text' className='form-control' placeholder='search rooms'
                    value={searchkey} onChange={(e)=>{setsearchkey(e.target.value)}} onKeyUp={filterBySearch}
                    />
                </div>
               <div className='col-md-3'>
                <select className='room-select form-control' value={type} onChange={(e)=>{filterByType(e.target.value)}} >
                        <option value='All'>All</option>
                        <option value='delux'>Delux</option>
                        <option value='non-delux'>Non-delux</option>
                    </select>

               </div>

            </div>



            <div className='row mt-5 justify-content-center'>
                {loading ? (
                    <Loader/>
                ) : (rooms.map(room => {
                    return <div className='col-md-9 mt-2'>
                        <Room room={room} fromdate={fromdate} todate={todate} />
                    </div>
                }))}


            </div>
        </div>
    )
}

export default Homescreen
