package com.quochoai.lakeSidehotel.controller;

import com.quochoai.lakeSidehotel.exception.PhotoRetrievalExetion;
import com.quochoai.lakeSidehotel.exception.ResourceNotFoundException;
import com.quochoai.lakeSidehotel.model.BookedRoom;
import com.quochoai.lakeSidehotel.model.Room;
import com.quochoai.lakeSidehotel.response.BookedResponce;
import com.quochoai.lakeSidehotel.response.RoomResponce;
import com.quochoai.lakeSidehotel.service.IBookedRoomService;
import com.quochoai.lakeSidehotel.service.IRoomService;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.rowset.serial.SerialBlob;
import java.io.IOException;
import java.math.BigDecimal;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/rooms")
public class RoomController {

    private final IRoomService iRoomService;
    private final IBookedRoomService iBookedRoomService;
    @PostMapping("/add/new-room")
    public ResponseEntity<RoomResponce> addNewRoom(
            @RequestParam("photo") MultipartFile photo,
            @RequestParam("roomType") String roomType,
            @RequestParam("roomPrice") BigDecimal roomPrice
    ) throws SQLException, IOException {
        Room saveRoom = iRoomService.addNewRoom(photo, roomType, roomPrice);
        RoomResponce responce = new RoomResponce(saveRoom.getId(), saveRoom.getRoomType(), saveRoom.getRoomPrice());
        return ResponseEntity.ok(responce);
    }

    @GetMapping("/room/types")
    public List<String> getRoomTypes(){
        return iRoomService.getAllRoomTypes();
    }

    @GetMapping("/all/rooms")
    public ResponseEntity<List<RoomResponce>> getAllRooms() throws SQLException{
        List<Room> rooms = iRoomService.getAllRooms();
        List<RoomResponce> roomResponces = new ArrayList<>();
        for( Room room : rooms ){
            byte[] photoByte = iRoomService.getRoomPhotoByRoomId(room.getId());
            if( photoByte != null && photoByte.length > 0){
                String base64photo = Base64.encodeBase64String((photoByte));
                RoomResponce roomResponce = getRoomResponse(room);
                roomResponce.setPhoto(base64photo);
                roomResponces.add(roomResponce);
            }
        }
        return ResponseEntity.ok(roomResponces);
    }

    @DeleteMapping("/delete/room/{roomId}")
    public ResponseEntity<Void> deleteRoom( @PathVariable Long roomId){
        System.out.println(roomId);
        iRoomService.deleteRoom(roomId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/update/{roomId}")
    public ResponseEntity<RoomResponce> updateRoom(@PathVariable Long roomId,
                                                   @RequestParam(required = false) String roomType,
                                                   @RequestParam(required = false) BigDecimal roomPrice,
                                                   @RequestParam(required = false) MultipartFile photo) throws IOException, SQLException {
            System.out.println(1);
        byte[] photoBytes = (photo!= null && !photo.isEmpty() ) ? photo.getBytes() : iRoomService.getRoomPhotoByRoomId(roomId);
        Blob photoBlob = (photo!= null && photoBytes.length > 0 ) ? new SerialBlob(photoBytes) : null;
        Room theRoom = iRoomService.updateRoom(roomId, roomType, roomPrice, photoBytes);
        theRoom.setPhoto(theRoom.getPhoto());
        RoomResponce roomResponce = getRoomResponse(theRoom);
        return ResponseEntity.ok(roomResponce);
    }

    @GetMapping("/room/{roomId}")
    public ResponseEntity<Optional<RoomResponce>> getRoomById(@PathVariable Long roomId){
        Optional<Room> theRoom = iRoomService.getRoomById(roomId);
        return theRoom.map((room)->{
            RoomResponce roomResponce = getRoomResponse(room);
            return ResponseEntity.ok(Optional.of(roomResponce));
        }).orElseThrow(()->new ResourceNotFoundException("Room not found"));
    }

    private RoomResponce getRoomResponse(Room room) {
        List<BookedRoom> bookings  = getAllBookingsByRoomId(room.getId());
//        List<BookedResponce> bookingInfo = bookings.stream()
//                .map(booking-> new BookedResponce(booking.getBookingID(),
//                        booking.getCheckInDate(),
//                        booking.getCheckOutDate(),
//                        booking.getBookingConfirmationCode())).toList();
        byte[] photoByte = null;
        Blob photoBlob = room.getPhoto();
        if ( photoBlob != null ){
            try{
                photoByte = photoBlob.getBytes(1, (int)photoBlob.length());
            } catch (SQLException e) {
                throw new PhotoRetrievalExetion("Error retrieving photo");
            }
        }
        return new RoomResponce(room.getId(),
                room.getRoomType(),
                room.getRoomPrice(),
                room.isBooked(),
                photoByte);
    }

    private List<BookedRoom> getAllBookingsByRoomId(Long roomID) {
        return iBookedRoomService.getAllBookingsByRoomId(roomID);
    }
}
