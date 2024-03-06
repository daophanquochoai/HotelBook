import axios from "axios"

export const api = axios.create({
    baseURL : "http://localhost:9192"
})

// add room into CSDL
export async function addRoom( photo, roomType, roomPrice ){
    const formData = new FormData();
    formData.append("photo",photo);
    formData.append("roomType",roomType);
    formData.append("roomPrice",roomPrice);

    const response = await api.post("/rooms/add/new-room", formData);
    if( response.status == 201 ){
        return true
    }else{
        return false
    }
}

// fetch all room type 
export async function getRoomTypes(){
    try {
        const response = await api.get("/rooms/room/types")
        return response.data
    } catch (error) {
        throw new Error("Error fetching room types")
    }
}

//fetch all room
export async function getAllRooms(){
    try{
        const result = await api.get("/rooms/all/rooms");
        return result.data
    }catch(error){
        throw new Error("Error fetching rooms")
    }
}

// save booked room
export async function bookRoom( roomId, booking){
    try{
        const response = await api.get(`/bookings/room/${roomId}/booking`, booking);
        return response.data
    }catch(error){
        if( error.response && error.response.data){
            throw new Error(error.response.data)
        }
        else{
            throw new Error("Error booking room : " + error.message )
        }
    }
}

//fetch all booked room 
export async function getAllBookings(){
    try{
        const response = await api.get("bookings/all-bookings");
        return response.data;
    }catch(error){
        throw new Error("Error fetching bookings : " + error.message)
    }
}

//get confirmation code
export async function getBookingByConfirmationCode( confirmationCode){
    try {
        const response = await api.get(`/bookings/confirmation/${confirmationCode}`);
        return response.data
    } catch (error) {
        if( error.response && error.response.data){
            throw new Error(error.response.data)
        }
        else{
            throw new Error(`Error find booking : ${error.message}`)
        }
    }
}

//cancel booked room
export async function cancelBooking(bookingId){
    try {
        const result = await api.delete(`/bookings/booking/${bookingId}/delete`)
        return result.data
    } catch (error) {
        throw new Error("Error cancelling booking : " + error.message)
    }
}

//delete item 
export async function deleteRoom(roomId){
    try {
        const result = await api.delete(`/rooms/delete/room/${roomId}`);
        return result.data
    } catch (error) {
        throw new Error(`Error deleting room ${error.message}`)
    }
}

export async function updateRoom( roomId, roomData){
    const formData = new FormData();
    formData.append("roomType", roomData.roomType)
    formData.append("roomPrice", roomData.roomPrice)
    formData.append("photo", roomData.photo)
    const result = await api.put(`/rooms/update/${roomId}`, formData);
    return result;
}

export async function getRoomById( roomId){
    try {
        const result = await api.get(`/rooms/room/${roomId}`);
        return result.data;
    } catch (error) {
        throw new Error(`Error feetching room ${roomId}`)
    }
}