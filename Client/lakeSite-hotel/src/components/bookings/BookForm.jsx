import React, { useEffect, useState } from "react";
import { bookRoom, getRoomById } from "../utils/ApiFunction";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { Form } from "react-bootstrap";
import BookingSumary from "./BookingSumary";
const BookForm = () => {
  const [isValidated, setIsValidates] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [roomPrice, setRoomPrice] = useState(0);
  const [booking, setBooking] = useState({
    gustName: "",
    gustEmail: "",
    checkInDate: "",
    checkOutDate: "",
    numberOfAdults: "",
    numberOfChildren: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBooking({ ...booking, [name]: value });
    setErrorMessage("");
  };

  const [roomInfo, setRoomInfo] = useState({
    photo: "",
    roomType: "",
    roomPrice: "",
  });

  const getRoomPrinceById = async (roomId) => {
    try {
      const result = await getRoomById(roomId);
      setRoomPrice(result.roomPrice);
    } catch (error) {
      throw new Error(error);
    }
  };
  const roomId = useParams();
  useEffect(() => {
    getRoomPrinceById(roomId.roomId);
  }, [roomId]);

  const calculatePayment = () => {
    const checkInDate = moment(booking.checkInDate);
    const checkOutDate = moment(booking.checkOutDate);
    const diffInDays = Math.abs(checkOutDate.diff(checkInDate, 'days'));
    const paymentPerDay = roomPrice ? roomPrice : 0;
    return diffInDays * paymentPerDay;
  };

  const isGuestValid = () => {
    const adultCount = parseInt(booking.numberOfAdults);
    const childrenCout = parseInt(booking.numberOfChildren);
    const totalCount = adultCount + childrenCout;
    return totalCount >= 1 && adultCount >= 1;
  };

  const isCheckOutDateValid = () => {
    if (
      !moment(booking.checkOutDate).isSameOrAfter(moment(booking.checkInDate))
    ) {
      setErrorMessage("Check out date must come before check in date");
      return false;
    } else {
      setErrorMessage("");
      return true;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (
      form.checkValidity() === false ||
      !isGuestValid ||
      !isCheckOutDateValid
    ) {
      e.stopPropagation();
    } else {
      setIsSubmit(true);
    }
    setIsValidates(true);
  };
  const navigator = useNavigate();
  const handleBooking = async (e) => {
    try {
      const confirmation = await bookRoom(roomId.roomId, booking);
      setIsSubmit(true);
      navigator("/", { state: { message: confirmation } });
    } catch (error) {
      setErrorMessage(error.message);
      navigator("/", { state: { error: errorMessage } });
    }
  };

  return (
      <div className="container mb-5">
        <div className="row">
          <div className="col-md-6">
            <div className="card card-body mt-5">
              <h4 className="card card-title"> Reserve Room</h4>
              <Form noValidate validated={isValidated} onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label htmlFor="guestName">Full name :</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    id="guestName"
                    name="guestName"
                    value={booking.guestName}
                    placeholder="Enter your full name"
                    onChange={handleInputChange}
                  ></Form.Control>
                  <Form.Control.Feedback type="invalid">
                    Please enter your fullname
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                  <Form.Label htmlFor="guestEmail">Email :</Form.Label>
                  <Form.Control
                    required
                    type="email"
                    id="guestEmail"
                    name="guestEmail"
                    value={booking.guestEmail}
                    placeholder="Enter your email"
                    onChange={handleInputChange}
                  ></Form.Control>
                  <Form.Control.Feedback type="invalid">
                    Please enter your email address
                  </Form.Control.Feedback>
                </Form.Group>

                <fieldset style={{ border: "2px" }}>
                  <legend>Lodging period</legend>
                  <div className="row">
                    <div className="col-6">
                      <Form.Group>
                        <Form.Label htmlFor="checkInDate">
                          Check-In date :
                        </Form.Label>
                        <Form.Control
                          required
                          type="date"
                          id="checkInDate"
                          name="checkInDate"
                          value={booking.checkInDate}
                          placeholder="check-in Date"
                          onChange={handleInputChange}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">
                          Please select a check-in date
                        </Form.Control.Feedback>
                      </Form.Group>
                    </div>
                    <div className="col-6">
                      <Form.Group>
                        <Form.Label htmlFor="checkOutDate">
                          Check-Out date :
                        </Form.Label>
                        <Form.Control
                          required
                          type="date"
                          id="checkOutDate"
                          name="checkOutDate"
                          value={booking.checkOutDate}
                          placeholder="check-out Date"
                          onChange={handleInputChange}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">
                          Please select a check-out date
                        </Form.Control.Feedback>
                      </Form.Group>
                    </div>
                    {errorMessage && (
                      <p className="error-message text-danger">
                        {errorMessage}
                      </p>
                    )}
                  </div>
                </fieldset>
                <fieldset>
                  <legend>Number of Guest</legend>
                  <div className="row">
                    <div className="col-6">
                      <Form.Label htmlFor="numberOfAdults">
                        Adultes :
                      </Form.Label>
                      <Form.Control
                        required
                        type="number"
                        id="numberOfAdults"
                        name="numberOfAdults"
                        value={booking.numberOfAdults}
                        placeholder="0"
                        min={1}
                        onChange={handleInputChange}
                      ></Form.Control>
                      <Form.Control.Feedback type="invalid">
                        Please select at least 1 adults
                      </Form.Control.Feedback>
                    </div>
                  </div>
                  <div className="col-6">
                      <Form.Label htmlFor="numberOfChildren">
                        Children :
                      </Form.Label>
                      <Form.Control
                        required
                        type="number"
                        id="numberOfChildren"
                        name="numberOfChildren"
                        value={booking.numberOfChildren}
                        placeholder="0"
                        onChange={handleInputChange}
                      ></Form.Control>
                    </div>
                </fieldset>

                <div className="form-group mt-2 mb-2">
                    <button className="btn btn-hotel"
                    type="submit"
                    >Continue</button>

                </div>
              </Form>
            </div>
          </div>
          <div className="col-md-6">
                {isSubmit && (
                    <BookingSumary 
                    booking={booking}
                    payment={calculatePayment()}
                    isFormValid={isValidated}
                    onConfirm={handleBooking}
                    />
                )}
          </div>
        </div>
      </div>
  );
};
export default BookForm;
