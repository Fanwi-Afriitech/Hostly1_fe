import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "./bookingscreen.css"
import Loader from '../components/Loader';
import moment from 'moment';
import StripeCheckout from 'react-stripe-checkout';
import Swal from 'sweetalert2'

const Bookingscreen = () => {
    const [room, setRoom] = useState(null);
    const [loading, setloading] = useState(true);
    const [error, seterror] = useState(false);
    const { roomid,fromdate,todate } = useParams();

     // Create new variables for formatted dates
     const formattedFromDate = moment(fromdate, 'DD-MM-YYYY');
     const formattedToDate = moment(todate, 'DD-MM-YYYY');
     const totaldays = moment.duration(formattedToDate.diff(formattedFromDate)).asDays() + 1;

    const [totalamount, settotalamount]=useState()

    useEffect(() => {
        const fetchData = async () => {
            try {
                setloading(true)
                const response = await axios.post('https://hostly-be.onrender.com/api/rooms/getroombyid', { roomid });
                setRoom(response.data);
                settotalamount(response.data.rentperday * totaldays)
                setloading(false)
            } catch (error) {
                seterror(true)

                setloading(false)
            }
        };

        fetchData();
    }, [roomid]);



     const onToken = async (token) => {
        console.log(token);
        const bookingDetails={
            room,
            userid: JSON.parse(localStorage.getItem('currentUser'))._id,
            fromdate,
            todate,
            totalamount,
            totaldays,
            token

       }
       try {
        setloading(true)
         const result= await axios.post('https://hostly-be.onrender.com/api/bookings/bookroom',bookingDetails)
         setloading(false)
         Swal.fire('Congratulations',' Room successfully booked','sucess').then(result=>{
            window.location.href='/bookings'
         })
       } catch (error) {
         setloading(false)
         Swal.fire('somthing went wrong','error')
       }
    };

    return (
        <div className='m-5'>
            {loading ? (<h1><Loader/></h1>) : error ? (<h1>Error..</h1>) : (<div>
                <div className='row mt-5 justify-content-center bs'>
                    <div className='col-md-5'>
                        <h1>{room.name}</h1>
                        {room.imageurls && room.imageurls.length > 0 && (
                        <img src={room.imageurls[0]} alt="Room" className="bigimg" />
                        )}
                    </div>
                    <div className='col-md-6'>
                       <div  style={{textAlign:'right'}} >
                            <h1>Booking Details</h1>
                            <hr />
                            <p className='bookp'>Name: &nbsp;{JSON.parse(localStorage.getItem('currentUser')).name}</p>
                            <p>From date: {fromdate}</p>
                            <p>To date: {todate}</p>
                            <p>Maxcount: {room.maxcount}</p>
                       </div>

                       <div style={{textAlign:'right'}}>
                        <h1>Amount</h1>
                        <hr/>
                        <p>Rent per day: {room.rentperday}</p>
                        <p>Totaldays: {totaldays}</p>
                        <p>Total amount:{totalamount}</p>
                       </div>

                       <div  style={{float:"right"}}>
                        
                        <StripeCheckout
                        token={onToken}
                        amount={totalamount *100}
                        currency='USD'
                        stripeKey="pk_test_51BTUDGJAJfZb9HEBwDg86TN1KNprHjkfipXmEDMb0gSCassK5T3ZfxsAbcgKVmAIXF7oZ6ItlZZbXO6idTHE67IM007EwQ4uN3"
                        
                        >
                          <button className='btn btn-primary' >Pay Now</button>
                        </StripeCheckout>
                    
                        </div>
                    </div>

                </div>
            </div>
            )}
        </div >
    )
}

export default Bookingscreen
