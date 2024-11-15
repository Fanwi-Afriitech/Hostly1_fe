import React, { useState, useEffect } from 'react'
import axios from 'axios';
import './adminscreen.css'
import Loader from '../components/Loader';
import { Tabs } from 'antd';


const Adminscreen = () => {

    if (JSON.parse(localStorage.getItem('currentUser')).isAdmin) {
        window.location.href('/home')
    }
    const tabItems = [
        {
            key: '1',
            label: 'Bookings',
            children: <Bookings />,
        },
        {
            key: '2',
            label: 'Rooms',
            children: <Rooms />,
        },
        {
            key: '3',
            label: 'Add Room',
            children: <Addroom />,
        },
        {
            key: '4',
            label: 'Users',
            children: <Users />,
        },
    ];
    return (
        <div className='mt-3 ml-3 mr-3 bs'>
            <h1 className='text-center'>Admin Panel</h1>
            <Tabs defaultActiveKey="1" items={tabItems} />


        </div>
    )
}

export default Adminscreen

//creating components for each booking

export function Bookings() {

    const [bookings, setbookings] = useState([])
    const [loading, setloading] = useState(true);
    const [error, seterror] = useState();
    useEffect(() => {
        const fetchBookings = async () => {
            try {

                const response = await axios.get('http://localhost:5000/api/bookings/getallbookings');
                setbookings(response.data)
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
        <div className='row'>
            <div className='col-md-12'>
                <h1>Bookings</h1>
                {loading && (<Loader />)}
                {/* creating table */}
                <table className='table table-bordered  styled-table'>
                    <thead className='bs'>
                        <tr>
                            <th>Booking id</th>
                            <th>User id</th>
                            <th>Room</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody >
                        {bookings.length > 0 && (bookings.map((booking, index) => {
                            return (
                                <tr key={booking._id} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>

                                    <td>{booking._id}</td>
                                    <td>{booking.userid}</td>
                                    <td>{booking.room}</td>
                                    <td> {booking.fromdate}</td>
                                    <td> {booking.todate}</td>

                                    <td>{booking.status}</td>


                                </tr>
                            );
                        }))}
                    </tbody>

                </table>


            </div>

        </div>
    )
}
//Create room component
export function Rooms() {

    const [rooms, setrooms] = useState([])
    const [loading, setloading] = useState(true);
    const [error, seterror] = useState();
    useEffect(() => {
        const fetchRooms = async () => {
            try {

                const response = await axios.get('http://localhost:5000/api/rooms/getallrooms');

                setrooms(response.data)
                setloading(false)
            } catch (error) {
                console.log(error);
                setloading(false)
                seterror(true)
            }
        };

        fetchRooms();
    }, []);
    return (
        <div className='row'>
            <div className='col-md-12'>
                <h1>Rooms</h1>
                {loading && (<Loader />)}
                {/* creating table */}
                <table className='table table-bordered  styled-table'>
                    <thead className='bs'>
                        <tr>
                            <th>Room id</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Rent per day</th>
                            <th>Max count</th>
                            <th>Phone Number</th>
                        </tr>
                    </thead>
                    <tbody >
                        {rooms.length > 0
                            ? rooms.map((room, index) => {
                                return (
                                    <tr key={room._id} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>

                                        <td>{room._id}</td>
                                        <td>{room.name}</td>
                                        <td>{room.type}</td>
                                        <td> {room.rentperday}</td>
                                        <td> {room.maxcount}</td>

                                        <td>{room.phonenumber}</td>


                                    </tr>
                                )}
                        ):(
                        <tr>
                            <td colSpan="6" style={{ textAlign: 'center' }}>No rooms available</td>
                        </tr>
                        )
                    }
                    </tbody>

                </table>


            </div>

        </div>
    )
}
//Create user component
export function Users() {

    const [users, setusers] = useState([])
    const [loading, setloading] = useState(true);
    const [error, seterror] = useState();
    useEffect(() => {
        const fetchUsers = async () => {
            try {

                const response = await axios.get('http://localhost:5000/api/users/getallusers');

                setusers(response.data)
                setloading(false)
            } catch (error) {
                console.log(error);
                setloading(false)
                seterror(true)
            }
        };

        fetchUsers();
    }, []);
    return (
        <div className='row'>
            <div className='col-md-12'>
                <h1>Users</h1>
                {loading && (<Loader />)}
                {/* creating table */}
                <table className='table table-bordered  styled-table'>
                    <thead className='bs'>
                        <tr >
                            <th>User id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>isAdmin</th>

                        </tr>
                    </thead>
                    <tbody >
                        {users && (users.map((user, index) => {
                            return (
                                <tr key={user._id} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>

                                    <td>{user._id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.isAdmin ? 'YES' : 'NO'}</td>



                                </tr>
                            );
                        }))}
                    </tbody>

                </table>


            </div>

        </div>
    )
}
//create addroom component
export function Addroom() {
    const [name, setname] = useState('');
    const [rentperday, setrentperday] = useState('');
    const [maxcount, setmaxcount] = useState('');
    const [features, setfeatures] = useState('');
    const [description, setdescription] = useState('')
    const [phonenumber, setphonenumber] = useState('')
    const [type, settype] = useState('')
    const [imageurl1, setimageurl1] = useState('')
    const [imageurl2, setimageurl2] = useState('')
    const [imageurl3, setimageurl3] = useState('')

    async function addRoom() {
        const newroom = {
            name,
            rentperday,
            description,
            maxcount,
            features,
            phonenumber,
            type,
            // imageurl1,
            // imageurl2,
            // imageurl3
            imageurl: [imageurl1, imageurl2, imageurl3]
        }
        try {

            const result = await axios.post('http://localhost:5000/api/rooms/addroom', newroom)
            console.log(result.data)


        } catch (error) {
            console.log(error)
        }

    }

    return (



        // </div>
        <div className="room-form-container row">
            <div className='col-md-5'>
                <input type='text' className='form-control' placeholder='Room Name'
                    value={name} onChange={(e) => { setname(e.target.value) }}
                />
                <input type='text' className='form-control' placeholder='Rent per Day'
                    value={rentperday} onChange={(e) => { setrentperday(e.target.value) }}
                />
                <input type='text' className='form-control' placeholder='Max Count'
                    value={maxcount} onChange={(e) => { setmaxcount(e.target.value) }} />
                <input type='text' className='form-control' placeholder='Features'
                    value={features} onChange={(e) => { setfeatures(e.target.value) }} />
                <input type='text' className='form-control' placeholder='Description'
                    value={description} onChange={(e) => { setdescription(e.target.value) }}
                />
                <input type='text' className='form-control' placeholder='Phone Number'
                    value={phonenumber} onChange={(e) => { setphonenumber(e.target.value) }}
                />
            </div>
            <div className='col-md-5'>
                <input type='text' className='form-control' placeholder='Type'
                    value={type} onChange={(e) => { settype(e.target.value) }}
                />
                <input type='text' className='form-control' placeholder='Image URL 1'
                    value={imageurl1} onChange={(e) => { setimageurl1(e.target.value) }}
                />
                <input type='text' className='form-control' placeholder='Image URL 2'
                    value={imageurl2} onChange={(e) => { setimageurl2(e.target.value) }}
                />
                <input type='text' className='form-control' placeholder='Image URL 3'
                    value={imageurl3} onChange={(e) => { setimageurl3(e.target.value) }}
                />

                <div className='text-end'>
                    <button className='btn btn-primary mt-2' onClick={addRoom}>  Add Room</button>
                </div>
            </div>
        </div>


    )
}



