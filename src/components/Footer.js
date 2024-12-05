

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import './footer.css'
const Footer = () => {
  return (
    <div className='footer-container'>
      <div className="row hy">
        <div className="col-lg-4 p-4">
          <h3 className="h-font fw-bold fs-3">HOSTLY</h3>
          <p>Wherever your journey takes you, we ensure you feel at home. 
            Discover comfort, convenience, and unforgettable experiences with every stay.</p>
        </div>
        <div className="col-lg-4 p-4">
          <h5>Links</h5>
          <a href="#" className=" text-white d-block mb-2 text-dark text-decoration-none">Home</a>
          <a href="#" className="text-white d-block mb-2 text-dark text-decoration-none">Rooms</a>
          <a href="#" className=" text-white text-whited-block mb-2 text-dark text-decoration-none">Facilities</a>
          <a href="#" className="text-white d-block mb-2 text-dark text-decoration-none">About Us</a>
        </div>
        <div className="col-lg-4 p-4">
          <h5>Follow Us</h5>
          <a href="#" className=" text-white d-inline-block mb-2 text-dark text-decoration-none">
            <FontAwesomeIcon icon={faFacebookF} /> &nbsp; Facebook
          </a> <br/>
          <a href="#" className=" text-white d-inline-block mb-2 text-dark text-decoration-none">
            <FontAwesomeIcon icon={faInstagram} /> &nbsp; Instagram
          </a> <br/>
          <a href="#" className="text-white d-inline-block text-dark text-decoration-none">
            <FontAwesomeIcon icon={faTwitter} /> &nbsp; Twitter
          </a> <br/>
        </div>
      </div>
      <h6 className="text-center bet bg-dark text-white p-3 m-0">@2024 Developed with <span role="img" aria-label="love">&#10084;&#65039;</span> by Delphine</h6>
    </div>
  );
}

export default Footer;

