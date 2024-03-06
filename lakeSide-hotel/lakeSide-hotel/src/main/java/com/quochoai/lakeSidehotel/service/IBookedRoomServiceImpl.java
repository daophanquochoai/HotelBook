package com.quochoai.lakeSidehotel.service;

import com.quochoai.lakeSidehotel.exception.InvaildBookingRequestException;
import com.quochoai.lakeSidehotel.model.BookedRoom;
import com.quochoai.lakeSidehotel.model.Room;
import com.quochoai.lakeSidehotel.repository.BookedRoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class IBookedRoomServiceImpl implements IBookedRoomService{

    private final BookedRoomRepository bookedRoomRepository;
    private final RoomServiceImpl roomService;
    @Override
    public List<BookedRoom> getAllBookings() {
        return bookedRoomRepository.findAll();
    }

    @Override
    public void cancelBooking( Long bookId){
        bookedRoomRepository.deleteById(bookId);
    }

    @Override
    public List<BookedRoom> getAllBookingByRoomId(Long roomId)  {
        return bookedRoomRepository.findByRoomId(roomId);
    }

    @Override
    public String saveBooking(Long roomId, BookedRoom bookingRequest) {
        if(bookingRequest.getCheckOutDate().isBefore(bookingRequest.getCheckInDate())){
            throw new InvaildBookingRequestException("Check-in date must come before check-out date");
        }
        Room room = roomService.getRoomById(roomId).get();
        List<BookedRoom> exitingBooings = room.getBookings();
        boolean roomIsAvailable = roomIsAvailable(bookingRequest, exitingBooings);
        if(roomIsAvailable){
            room.addBooking(bookingRequest);
            bookedRoomRepository.save(bookingRequest);
        }
        else{
            throw new InvaildBookingRequestException("Sorry, This room is not available for selected dates");
        }
        return bookingRequest.getBookingConfirmationCode();
    }

    @Override
    public BookedRoom findByBookingConfirmationCode(String confirmationCode) {
        return bookedRoomRepository.findByBookingConfirmationCode(confirmationCode);
    }

    @Override
    public List<BookedRoom> getAllBookingsByRoomId(Long roomId) {
        return bookedRoomRepository.findByRoomId(roomId);
    }

    private boolean roomIsAvailable(BookedRoom bookingRequest, List<BookedRoom> exitingBooings) {
        return exitingBooings.stream()
                .noneMatch(exitingBooing->
                        bookingRequest.getCheckInDate().equals(exitingBooing.getCheckOutDate())
                        || bookingRequest.getCheckOutDate().isBefore(exitingBooing.getCheckOutDate())
                        || (bookingRequest.getCheckInDate().isAfter(exitingBooing.getCheckInDate())

                        && bookingRequest.getCheckInDate().isBefore(exitingBooing.getCheckOutDate()))
                        || (bookingRequest.getCheckInDate().isBefore(exitingBooing.getCheckInDate())

                                && bookingRequest.getCheckOutDate().equals(exitingBooing.getCheckOutDate()))
                                || (bookingRequest.getCheckInDate().isBefore(exitingBooing.getCheckInDate())

                                && bookingRequest.getCheckOutDate().isAfter(exitingBooing.getCheckOutDate()))

                                || (bookingRequest.getCheckInDate().equals(exitingBooing.getCheckOutDate())
                                && bookingRequest.getCheckOutDate().equals(exitingBooing.getCheckInDate()))

                                || (bookingRequest.getCheckInDate().equals(exitingBooing.getCheckOutDate())
                                && bookingRequest.getCheckOutDate().equals(exitingBooing.getCheckInDate()))
                );
    }


}
