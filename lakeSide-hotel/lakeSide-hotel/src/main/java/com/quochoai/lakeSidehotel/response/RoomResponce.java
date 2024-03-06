package com.quochoai.lakeSidehotel.response;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.tomcat.util.codec.binary.Base64;

import java.math.BigDecimal;
import java.util.List;

@Data
@NoArgsConstructor
public class RoomResponce {
    private Long id;
    private String roomType;
    private BigDecimal roomPrice;
    private boolean isBooked;
    private String photo;
    private List<BookedResponce> bookings;

    public RoomResponce(Long id, String roomTyle, BigDecimal roomPrice) {
        this.id = id;
        this.roomType = roomTyle;
        this.roomPrice = roomPrice;
    }
    public RoomResponce(Long id, String roomTyle, BigDecimal roomPrice, boolean isBooked, byte[] photoByte) {
        this.id = id;
        this.roomType = roomTyle;
        this.roomPrice = roomPrice;
        this.isBooked = isBooked;
        this.photo = photoByte != null ? Base64.encodeBase64String(photoByte) : null;
    }
    public RoomResponce(Long id, String roomTyle, BigDecimal roomPrice, boolean isBooked, byte[] photoByte, List<BookedResponce> bookings) {
        this.id = id;
        this.roomType = roomTyle;
        this.roomPrice = roomPrice;
        this.isBooked = isBooked;
        this.photo = photoByte != null ? Base64.encodeBase64String(photoByte) : null;
        this.bookings = bookings;
    }
}
