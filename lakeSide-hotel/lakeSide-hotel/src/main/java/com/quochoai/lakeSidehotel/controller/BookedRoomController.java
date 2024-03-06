package com.quochoai.lakeSidehotel.controller;

import com.quochoai.lakeSidehotel.exception.InvaildBookingRequestException;
import com.quochoai.lakeSidehotel.exception.ResourceNotFoundException;
import com.quochoai.lakeSidehotel.model.BookedRoom;
import com.quochoai.lakeSidehotel.model.Room;
import com.quochoai.lakeSidehotel.response.BookedResponce;
import com.quochoai.lakeSidehotel.response.RoomResponce;
import com.quochoai.lakeSidehotel.service.IBookedRoomService;
import com.quochoai.lakeSidehotel.service.IRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
//@CrossOrigin() //chia sẽ tài nguyên
@RequiredArgsConstructor
@RestController
@RequestMapping("/bookings")
public class BookedRoomController {
    private final IBookedRoomService iBookedRoomService;
    private final IRoomService iRoomService;

    @GetMapping("/all-bookings")
    public ResponseEntity<List<BookedResponce>> getAllBookings() {
        List<BookedRoom> bookings = iBookedRoomService.getAllBookings();
        List<BookedResponce> bookingResponse = new ArrayList<>();
        for (BookedRoom room : bookings) {
            BookedResponce bookedResponce = getBookingResponse(room);
            bookingResponse.add(bookedResponce);
        }
        return ResponseEntity.ok(bookingResponse);
    }

    private BookedResponce getBookingResponse(BookedRoom booking) {
        Room theRoom = iRoomService.getRoomById(booking.getRoom().getId()).get();
        RoomResponce room = new RoomResponce(theRoom.getId(), theRoom.getRoomType(), theRoom.getRoomPrice());
        return new BookedResponce(booking.getBookingID(),
                booking.getCheckInDate(),
                booking.getCheckOutDate(),
                booking.getGetFullName(),
                booking.getGustEmail(),
                booking.getNumOfAdults(),
                booking.getNumOfChilren(),
                booking.getTotalNumOfGuest(),
                booking.getBookingConfirmationCode(), room
        );
    }

    @GetMapping("/confirmation/{confirmationCode}")
    public ResponseEntity<?> getBookngByConfirmationCode(String confirmationCode) {
        try {
            BookedRoom bookedRoom = iBookedRoomService.findByBookingConfirmationCode(confirmationCode);
            BookedResponce bookedResponce = getBookingResponse(bookedRoom);
            return ResponseEntity.ok(bookedResponce);
        } catch (ResourceNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }
    }

    @PostMapping("/room/{roomId}/booking")
    public ResponseEntity<?> saveBooking(@PathVariable Long roomId
            ,@RequestBody BookedRoom bookedRoom ){
        try {
            String confirmationCode = iBookedRoomService.saveBooking(roomId, bookedRoom);
            return ResponseEntity.ok("Room booked successfully, Your booking confirmation code is : " + confirmationCode);
        }
        catch (InvaildBookingRequestException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/booking/{bookingId}/delete")
    public void cancelBooking(@PathVariable Long bookingId){
        iBookedRoomService.cancelBooking(bookingId);
    }
}