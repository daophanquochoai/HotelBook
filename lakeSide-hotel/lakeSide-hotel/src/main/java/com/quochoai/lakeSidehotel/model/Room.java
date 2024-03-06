package com.quochoai.lakeSidehotel.model;

import jakarta.persistence.*;
import lombok.*;
import org.apache.commons.lang3.RandomStringUtils;

import java.math.BigDecimal;
import java.sql.Blob;
import java.util.ArrayList;
import java.util.List;

@Data
@Getter
@Setter
@AllArgsConstructor
@Entity(name = "Room")
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String roomType;
    private BigDecimal roomPrice;
    @Lob
    private Blob photo;
    private boolean isBooked = false;

    @OneToMany(mappedBy = "room", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<BookedRoom> bookings;

    public Room(){
        this.bookings = new ArrayList<>();
    }

    public void addBooking(BookedRoom bookedRoom){
        if( this.bookings == null ){
            this.bookings = new ArrayList<>();
        }
        this.bookings.add(bookedRoom);
        bookedRoom.setRoom(this);
        this.isBooked = true;
        String bookingCode = RandomStringUtils.randomNumeric(10);
        bookedRoom.setBookingConfirmationCode(bookingCode);
    }
}
