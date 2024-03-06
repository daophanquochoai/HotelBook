package com.quochoai.lakeSidehotel.service;

import com.quochoai.lakeSidehotel.model.Room;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

public interface IRoomService {
    public Room addNewRoom(MultipartFile photo, String roomType, BigDecimal roomPrice) throws SQLException, IOException;
    public List<String> getAllRoomTypes();
    public List<Room> getAllRooms();
    byte[] getRoomPhotoByRoomId(Long roomID) throws SQLException;
    void deleteRoom(Long roomId);
    Room updateRoom(Long roomId, String roomType, BigDecimal roomPrice, byte[] photo);
    Optional<Room> getRoomById(Long roomId);
}
