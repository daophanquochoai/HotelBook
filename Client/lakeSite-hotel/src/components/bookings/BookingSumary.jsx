import moment from "moment";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const BookingSumary = ({booking, payment, isFormValid, onConfirm})=>{
    const checkInDate = moment(booking.checkInDate);
    const checkOutDate = moment(booking.checkOutDate);
    const numOfDays = checkOutDate.diff(checkInDate, 'days')
    const [isBookingConfirmed, setIsBookingConfirmed] = useState(false)
    const [isProcessingPayment, setIsProcessingPayment] = useState(false)

    const handleConfirmBooking = () =>{
        setIsProcessingPayment(true)
        setTimeout(()=>{
            setIsProcessingPayment(false)
            setIsBookingConfirmed(true)
            onConfirm();
        }, 3000)
    }
    const navigator = useNavigate();
    useEffect(()=>{
        if(isBookingConfirmed){
            navigator("/booking-success");
        }
    },[isBookingConfirmed, navigator])
    return(
        <div className="card card-body mt-5">
            <h4>Reservation Summary</h4>
            <p>Fullname : <strong>{booking.guestName}</strong></p>
            <p>Email : <strong>{booking.guestEmail}</strong></p>
            <p>Check-In Date : <strong>{moment(booking.checkInDate).format("MM Do YYYY")}</strong></p>
            <p>Check-Out Date : <strong>{moment(booking.checkOutDate).format("MM Do YYYY")}</strong></p>
            <p>Number of days : <strong>{numOfDays}</strong></p>
            <div>
                <h5>
                    Numbers of Guests
                </h5>
                <strong>
                    Adult{booking.numberOfAdults > 1 ? "s" : ""} :  {booking.numberOfAdults}
                </strong>
                <strong>
                    Children : {booking.numberOfChildren}
                </strong>
            </div>
            {payment > 0 ? (
                <>
                    <p>
                        Total Payment : <strong>{payment}</strong>
                    </p>
                    {isFormValid && !isBookingConfirmed ? (
                        <Button
                        variant="success"
                        onClick={handleConfirmBooking}
                        >
                            {isProcessingPayment ? (
                                <>
                                    <span
                                    className="spinner-border spinner-border-sm mr-2"
                                    role="status"
                                    aria-hidden="true"
                                    >
                                        </span>
                                        <span>
                                            Booking Cofirmed, redirecting to pay...
                                        </span>
                                </>
                            ):(
                                "Cofirm Booking and proceed to payment"
                            )}
                        </Button>
                    ) : isBookingConfirmed ? (
                        <div className="d-flex justify-content-center align-items-center">
                            <div className="spinner-border text-primary" role="status">
                                <span className="sr-only">

                                </span>
                            </div>
                        </div>
                    ):null}
                </>
            ):(
                <p className="text-danger">
                    Check-out date must be after check-id date.
                </p>
            )}
        </div>
    )
}

export default BookingSumary;