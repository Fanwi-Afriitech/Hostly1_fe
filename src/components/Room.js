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


      {/* <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header >
          <Modal.Title>{room.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>

            <Carousel prevLabel='' nextLabel=''>
                        { room.imageurls && room.imageurls.length >0 ?
                        (room.imageurls.map(url,index)=>{
                            return <Carousel.Item key={index}>
                            <img
                            className="d-block w-100 bigimg"
                            src={url}
                            alt={`Slide ${index + 1}`}
                            />
                            </Carousel.Item>
                        }
                      ):(
                        <p>no image available</p>
                      )
                {"}"}
              
            </Carousel>
            <p>{room.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          
        </Modal.Footer>
      </Modal> */}
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
          <p>{room.description}</p>
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
