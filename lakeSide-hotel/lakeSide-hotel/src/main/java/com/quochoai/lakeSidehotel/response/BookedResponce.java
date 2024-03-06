package com.quochoai.lakeSidehotel.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookedResponce {
    private Long id;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    private String guestName;
    private String gustEmail;
    private int NumOfAdults;
    private int NumOfChilren;
    private int NumOfGuest;
    private int totalNumOfGuest;
    private String bookingConfirmationCode;
    private RoomResponce room;

    public BookedResponce(Long id, LocalDate checkInDate, LocalDate checkOutDate, String bookingConfirmationCode, String gustEmail, int numOfAdults, int numOfChilren, int totalNumOfGuest, String confirmationCode, RoomResponce room) {
        this.id = id;
        this.checkInDate = checkInDate;
        this.checkOutDate = checkOutDate;
        this.bookingConfirmationCode = bookingConfirmationCode;
    }
}
