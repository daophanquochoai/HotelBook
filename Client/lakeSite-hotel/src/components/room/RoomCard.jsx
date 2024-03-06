import React from "react";
import {Card, Col} from "react-bootstrap"
import {Link} from "react-router-dom"
const RoomCard = ({room}) =>{
    return(
        <Col className="mb-4" xs={12} key={room.id}>
            <Card >
                <Card.Body className="d-flex align-items-center">
                    <div className="flex-shrink-0 mr-3 mb-3 mb-md-0">
                    <Link to={`/booking-room/${room.id}`}
                        className={'btn btn-hotel btn-sm'}
                        >
                        <Card.Img 
                        src={`data:image/png;base64, ${room.photo}`}
                        alt="Room Photo"
                        style={{width:"100%", maxWidth:"200px", height: "auto"}}
                        />
                                                </Link>
                    </div>
                    <div className="flex-grow-1 ml-3 px-5">
                        <Card.Title className="hotel-color">
                            {room.roomType}
                        </Card.Title>
                        <Card.Title className="room-price">
                            {room.roomPrice} / Đêm
                        </Card.Title>
                        <Card.Text>Some room information goes here for the gust to read through</Card.Text>
                    </div>
                    <div className="flex-shrink-0 mr-3 mb-3">
                        <Link to={`/book-room/${room.id}`}
                        className={'btn btn-hotel btn-sm'}
                        >
                            Book now
                        </Link>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default RoomCard;