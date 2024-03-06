import React, { useEffect, useState } from "react";
import { getAllRooms } from "../utils/ApiFunction";
import {Link} from "react-router-dom"
import {Card, Carousel, Col, Container, Row} from "react-bootstrap"

const RoomCarousel = () =>{
    const [room, setRoom] = useState([
        {
            id:"",
            roomType : "",
            roomPrice : "",
            photo : ""
        }
    ])
    const[errorMessage, setErrorMessage] = useState("")
    const[sucessMessage, setSuccessMessage] = useState("")
    const[isLoading, setIsLoading] = useState(false)

    useEffect(()=>{
        setIsLoading(true)
        getAllRooms().then((data)=>{
            setRoom(data)
            setIsLoading(false)
        }).catch((error)=>{
            setErrorMessage(error.message)
            setIsLoading(false)
        })
    },[])
    if( isLoading ){
        return(
            <div className="mt-5">Loading...</div>
        )
    }

    if( errorMessage ){
        return(
            <div className="mt-5 text-danger mb-5">Error : {errorMessage}</div>
        )
    }
    return (
        <div className="bg-light mb-5 mt-5 shadow">
            <Link to={"/browse-all-rooms"} className="hotel-color text-center">
                Browse all rooms
            </Link>
            <Container >
                <Carousel indicators={false}>
                    {[...Array(Math.ceil(room.length / 4))].map((_,index)=>(
                        <Carousel.Item key={index}>
                            <Row>
                                {room.slice(index*4, index*4 + 4).map((rooms)=>(
                                    
                                    <Col key={rooms.id} className="mb-4" xs={12} md={6} lg={3}>
                                        <Card>
                                            <Link to={`/book-room/${rooms.id}`} className="link-item">
                                                <Card.Img 
                                                variant="top"
                                                src={`data:image/png;base64, ${rooms.photo}`}
                                                alt="Room Photo"
                                                className="w-100"
                                                style={{height : "200px"}}
                                                >
                                                </Card.Img>
                                                </Link>
                                                <Card.Body>
                                                    <Card.Title className="hotel-color">
                                                        {rooms.roomType}
                                                    </Card.Title>
                                                    <Card.Title className="room-price">${rooms.roomPrice}/night</Card.Title>
                                                    <div className="flex-shrink-0">
                                                        <Link className="btn btn-sm btn-hotel" to={`/book-room/${rooms.id}`}>
                                                        Book now
                                                        </Link>
                                                    </div>
                                                </Card.Body>
                                            
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </Carousel.Item>
                            
                        ))}
                </Carousel>
            </Container>
        </div>
    )
}

export default RoomCarousel;