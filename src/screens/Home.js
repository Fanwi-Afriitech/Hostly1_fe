
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Room from '../components/Room';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween'; 
import { DatePicker, Space } from 'antd';
import './home.css'
import Loader from '../components/Loader';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; // basic Swiper styles
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';

import 'swiper/css/effect-fade';
import 'swiper/css/autoplay';
import { Autoplay, EffectFade } from 'swiper/modules';
import Footer from '../components/Footer';






dayjs.extend(isBetween);
const { RangePicker } = DatePicker;

const Home = () => {
  
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
       
        <div >
                {/* <!-- Carousel --> */}
                
            {/* Swiper Component */}
            <Swiper
                 modules={[Autoplay, EffectFade]}
                spaceBetween={30}
                effect={"fade"}
                loop={true}
                autoplay={{
                    delay: 3500,
                    disableOnInteraction: false
                }}
                className="mySwiper"
            >
                <SwiperSlide className='swiper-slide'><img src="/images/carousel/1.png" alt="Carousel 1" className="w-100 d-block" /></SwiperSlide>
                <SwiperSlide><img src="/images/carousel/4.png" alt="Carousel 2" className="w-100 d-block" /></SwiperSlide>
                <SwiperSlide><img src="/images/carousel/2.jpg" alt="Carousel 3" className="w-100 d-block" /></SwiperSlide>
                <SwiperSlide><img src="/images/carousel/5.png" alt="Carousel 4" className="w-100 d-block" /></SwiperSlide>
            </Swiper> 
            {/* implementing the date range filter */}
            <div className='row mt-5 bs ral '>
            <h5>Check Booking Availability</h5>
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
                    return <div className='col-md-9 mt-2 '>
                        <Room room={room} fromdate={fromdate} todate={todate} />
                    </div>
                }))}


            </div>
         {/* <!-- Reach us --> */}
    <h2 class="mt-2 pt-4 mb-4  text-center fw-bold h-font">REACH US</h2>
    <div class="container">
        <div class="row rch">
            <div class="col-lg-8 col-md-8 p-4 mb-lg-0 mb-3 bg-white rounded">
                <iframe height="320px" class="w-100 rounded" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.9167084301002!2d36.876638974709394!3d-1.218089135554836!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f15f826d2697b%3A0x283746033cb1b5a5!2sUnited%20States%20International%20University%20Africa!5e0!3m2!1sen!2ske!4v1728632094684!5m2!1sen!2ske"  loading="lazy" ></iframe>

            </div>
            <div class="col-lg-4 col-md-4">
               <div class="bg-white p-4 rounded mb-4">
                    <h5>Call Us</h5>
                    <a href="tel: +254796632214" class="d-inline-block mb-2 text-decoration-none text-dark">
                        <i class="bi bi-telephone-fill"></i>(254) 796632214
                    </a>
               </div>
                <div class="bg-white p-4 rounded mb-4">
                    <h5>Follow Us</h5>
                    <a href="#" className=" text-black d-inline-block mb-2 text-dark text-decoration-none">
                        <FontAwesomeIcon icon={faFacebookF} /> &nbsp; Facebook
                    </a> <br/>
                    <a href="#" className=" text-black d-inline-block mb-2 text-dark text-decoration-none">
                        <FontAwesomeIcon icon={faInstagram} /> &nbsp; Instagram
                    </a> <br/>
                    <a href="#" className="text-black d-inline-block text-dark text-decoration-none">
                        <FontAwesomeIcon icon={faTwitter} /> &nbsp; Twitter
                    </a> <br/>
             
               </div>
            </div>
        </div>
    </div>

   
 
           
        </div>
    )
}

  


export default Home
