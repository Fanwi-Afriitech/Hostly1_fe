import React from 'react'
import "./bookingscreen.css"

const Aboutusscreen = () => {
    return (
        <div>
            {/* About Us Header Section */}
            <div className="my-5 px-4 ">
                <h2 className="text-center  fw-bold h-font nowt">ABOUT US</h2>
                <p className="text-center mt-3">
                    At Hostly, we believe in creating exceptional experiences for every traveler.
                    Our mission is to make every journey feel like home by providing comfortable,
                    secure, and stylish accommodations tailored to your needs.
                </p>
            </div>

            {/* Mission Section */}
            <div className="container">
                <div className="row justify-content-between align-items-center">
                    <div className="col-lg-6 col-md-12 mb-4 order-md-1 order-2 order-lg-1">
                        <h3 className="mb-3">OUR MISSION</h3>
                        <p>
                            Our mission is to make every journey feel like home by providing comfortable, secure, and stylish accommodations tailored to your needs.
                            From cozy apartments to luxurious villas, we offer a wide range of options designed to make your stay unforgettable. With a focus on convenience, innovation, and exceptional customer service,
                            Hostly is your trusted partner in exploring new destinations and making cherished memories.
                            Wherever you go, we're here to make your travel simple, seamless, and full of comfort.
                        </p>
                    </div>
                    <div className="col-lg-5 col-md-12 mb-4 order-md-2 order-1 order-lg-2 text-center">
                        <img src="images/about/abt.jpg" className="w-100 img-fluid" alt="About Us"/>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-lg-3 col-md-6 col-sm-12 mb-4 px-3">
                        <div className="bg-white rounded shadow p-4 border-top border-4 text-center box">
                            <img src="images/about/customers.svg" width="70px" alt="Customers"/>
                            <h4 className="mt-3">200+ CUSTOMERS</h4>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-12 mb-4 px-3">
                        <div className="bg-white rounded shadow p-4 border-top border-4 text-center box">
                            <img src="images/about/hotel.svg" width="70px" alt="Rooms"/>
                            <h4 className="mt-3">100+ ROOMS</h4>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-12 mb-4 px-3">
                        <div className="bg-white rounded shadow p-4 border-top border-4 text-center box">
                            <img src="images/about/rating.svg" width="70px" alt="Reviews"/>
                            <h4 className="mt-3">150+ REVIEWS</h4>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-12 mb-4 px-3">
                        <div className="bg-white rounded shadow p-4 border-top border-4 text-center box">
                            <img src="images/about/staff.svg" width="70px" alt="Staff"/>
                            <h4 className="mt-3">100+ STAFFS</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Aboutusscreen;
