package com.quochoai.lakeSidehotel.service;

import com.quochoai.lakeSidehotel.model.BookedRoom;

import java.util.List;

public interface IBookedRoomService {
    List<BookedRoom> getAllBookings();
    void cancelBooking(Long bookingId);
    List<BookedRoom> getAllBookingByRoomId(Long roomId);
    String saveBooking(Long roomId, BookedRoom bookingRequest);
    BookedRoom findByBookingConfirmationCode(String confirmationCode);
    List<BookedRoom> getAllBookingsByRoomId(Long roomId);
}
