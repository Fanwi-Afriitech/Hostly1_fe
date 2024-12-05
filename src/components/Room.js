import "./room.css"
import React, { useState } from 'react'
import { Modal, Button, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
const Room = ({ room, fromdate, todate }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // Safe access to image URL
  const firstImageUrl = room?.imageurls && room.imageurls.length > 0 ? room.imageurls[0] : 'default.jpg';


  return (
    <div className="row bs">
      <div className="col-md-4">
        <img src={firstImageUrl} className="smallimg" />

      </div>
      <div className="col-md-7">
        <h1 className="h-font">{room.name}</h1>
        <b>
          {" "}
          <p>Max Count: {room.maxcount}</p>
          <p>Features: {room.features}</p>
          <p>Type: {room.type}</p>
        </b>

        <div style={{ float: "right" }}>
          {(fromdate && todate) && (
            <Link to={`/book/${room._id}/${fromdate}/${todate}`}>
              <button className="btn btn-primary m-2" >Book Now</button>
            </Link>
          )}


          <button className="btn btn-primary" onClick={handleShow}>View Details</button>
        </div>
      </div>


      
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header>
          <Modal.Title>{room.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel prevLabel='' nextLabel=''>
            {room.imageurls && room.imageurls.length > 0 ? (
              room.imageurls.map((url, index) => (
                <Carousel.Item key={index}>
                  <img
                    className="d-block w-100 bigimg"
                    src={url}
                    alt={`Slide ${index + 1}`}
                  />
                </Carousel.Item>
              ))
            ) : (
              <p>No image available</p>
            )}
          </Carousel>
          <br/>
             <h6>Ratings</h6>
              <span class="badge rounded-pill bg-light">
              <i class="fas fa-star text-warning"></i>
              <i class="fas fa-star text-warning"></i>
              <i class="fas fa-star text-warning"></i>
              <i class="fas fa-star text-warning"></i>
            </span>
          <h6  className="h-font">Description</h6>
          <p>{room.description}</p>
          <h6 className="h-font">Location</h6>
          <div class="col-lg-8 col-md-8 p-4 mb-lg-0 mb-3 bg-white rounded">
                <iframe height="320px" className="w-100 rounded" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.9167084301002!2d36.876638974709394!3d-1.218089135554836!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f15f826d2697b%3A0x283746033cb1b5a5!2sUnited%20States%20International%20University%20Africa!5e0!3m2!1sen!2ske!4v1728632094684!5m2!1sen!2ske"  loading="lazy" ></iframe>

            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  )
}

export default Room;
