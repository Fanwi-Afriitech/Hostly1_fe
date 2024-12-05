import React, { useState, useEffect } from 'react'

import axios from 'axios';
import './profbook.css'
import Loader from '../components/Loader';
import Errors from '../components/Errors';
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;





const Profilescreen = () => {
    const user = JSON.parse(localStorage.getItem('currentUser'))

    useEffect(() => {
        if (!user) {
            window.location.href('/login')
        }

    }, [])

    return (
        <div className='ml-3 mt-3'>
            <Tabs defaultActiveKey="1" >
                <TabPane tab="Profile" key="1">
                    <div className="tab-pane-container">
                        <h1 className="tab-pane-title">My Profile</h1>
                        <br />
                        <div className="profile-info">
                            <h3>Name: <span>{user.name}</span></h3>
                            <h3>Email: <span>{user.email}</span></h3>
                            <h3>Admin: <span>{user.isAdmin ? 'Yes' : 'No'}</span></h3>
                        </div>
                    </div>
                </TabPane>
                <TabPane tab="Bookings" key="2"><Mybookings /></TabPane>

            </Tabs>

        </div>
    )
}

export default Profilescreen



export function Mybookings() {
    const user = JSON.parse(localStorage.getItem('currentUser'))
    const [bookings, setbookings] = useState([])
    const [loading, setloading] = useState(false);
    const [error, seterror] = useState();
    useEffect(() => {
        const fetchBookings = async () => {
            try {
                setloading(true)
                const rooms = await axios.post('https://hostly-be.onrender.com/api/bookings/getbookingsbyuserid', { userid: user._id });
                console.log(rooms.data);
                setbookings(rooms.data)
                setloading(false)
            } catch (error) {
                console.log(error);
                setloading(false)
                seterror(true)
            }
        };

        fetchBookings();
    }, []);

    return (
        <div>
            <div className='row'>
                <div className='col-md-6'>
                    {loading && (<Loader />)}
                    {bookings && (bookings.map(booking => {
                        return (
                            <div className='bs' >
                                <h4>{booking.room}</h4>
                                <p><b>BookingId:</b>{booking._id}</p>
                                <p><b>CheckIn:</b> {booking.fromdate}</p>
                                <p><b>CheckOut:</b> {booking.todate}</p>
                                <p><b>Amount:</b>{booking.totalamount}</p>
                                <p><b>Status:</b>{booking.status=='booked' ? 'CONFIRMED' : 'CANCELLED'}</p>

                                <div className='text-end'>
                                <button className='btn btn-primary ' >CANCEL BOOKING</button>
                                </div>
                            </div>
                        );
                    }))}
                </div>
            </div>
        </div>
    )
}

