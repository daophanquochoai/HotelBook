package com.quochoai.lakeSidehotel.service;

import com.quochoai.lakeSidehotel.exception.InternalServerException;
import com.quochoai.lakeSidehotel.exception.ResourceNotFoundException;
import com.quochoai.lakeSidehotel.model.Room;
import com.quochoai.lakeSidehotel.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.rowset.serial.SerialBlob;
import java.io.IOException;
import java.math.BigDecimal;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RoomServiceImpl implements IRoomService{

    private final RoomRepository roomRepository;
    @Override
    public Room addNewRoom(MultipartFile photo, String roomType, BigDecimal roomPrice) throws SQLException, IOException {
        Room room = new Room();
        room.setRoomType(roomType);
        room.setRoomPrice(roomPrice);
        if(!photo.isEmpty()){
            byte[] photoBytes = photo.getBytes();
            Blob photoBlob = new SerialBlob(photoBytes);
            room.setPhoto(photoBlob);
        }
        return roomRepository.save(room);
    }

    @Override
    public List<String> getAllRoomTypes() {
        return roomRepository.findDistinctRoomTypes();
    }

    @Override
    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    @Override
    public byte[] getRoomPhotoByRoomId(Long roomID) throws SQLException {
        Optional<Room> theRoom = roomRepository.findById(roomID);
        if( theRoom.isEmpty() ){
            throw new ResourceNotFoundException("Sorry, Room not found!");
        }
        Blob photo = theRoom.get().getPhoto();
        if( photo != null ){
            return photo.getBytes(1 ,(int) photo.length());
        }
        return null;
    }

    @Override
    public void deleteRoom(Long roomId) {
        Optional<Room> room = roomRepository.findById(roomId);
        if( room.isPresent() ){
            roomRepository.deleteById(room.get().getId());
        }
    }

    @Override
    public Room updateRoom(Long roomId, String roomType, BigDecimal roomPrice, byte[] photo) {
        Room room = roomRepository.findById(roomId).orElseThrow(()->new ResourceNotFoundException("Room not found"));
        if( roomType != null ){
            room.setRoomType(roomType);
        }
        if( roomPrice != null ){
            room.setRoomPrice(roomPrice);
        }
        if( photo.length > 0 && photo != null){
            try{
                room.setPhoto(new SerialBlob(photo));
            }catch( SQLException ex){
                throw new InternalServerException("Error updating room");
            }
        }
        return roomRepository.save(room);
    }

    @Override
    public Optional<Room> getRoomById(Long roomId) {
        return Optional.of(roomRepository.findById(roomId).get());
    }
}
