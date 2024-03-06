import React, { useEffect, useState } from "react";
import { getRoomById, updateRoom } from "../utils/ApiFunction";
import { Link, useParams } from "react-router-dom";
import RoomTypeSelector from "../common/RoomTypeSelector";

const EditRoom = () =>{
    const [newRoom, setNewRoom] = useState({
        photo : null,
        roomType : "",
        roomPrice :  ""
    })
    const [successMessage, setSuccessMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [imagePreview, setImagePreview] = useState("")

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setNewRoom({...newRoom, photo : selectedImage});
        setImagePreview(URL.createObjectURL(selectedImage));
    }
    const handleRoomInputChange = (event) =>{
        const {name, value } = event.target
        setNewRoom({...newRoom, [name]:value})
    }
    const roomId = useParams();
    useEffect(()=>{
        const fetchRoom = async ()=>{
            try {
                const roomData = await getRoomById(roomId.roomId)
                setImagePreview(roomData.photo)
                setNewRoom(roomData);
            } catch (error) {
                console.error(error.message)
            }
        }
        fetchRoom();
    }, [])
    const handleSubmit = async (e) =>{
        e.preventDefault();
        try {
            const response = await updateRoom(roomId.roomId, newRoom);
            if( response.status === 200 ){
                setSuccessMessage("Room updated successfully!");
                const updateRoomData = await getRoomById(roomId.roomId);
                setNewRoom(updateRoomData)
                setImagePreview(updateRoomData.photo)
                setErrorMessage("")
            }else{
                setErrorMessage("Error updating room")
            }
        } catch (error) {
            console.error(error)
            setErrorMessage(error.message)
        }
        setInterval(()=>{
            setSuccessMessage("")
            setErrorMessage("")
        },3000)
    }
    return(
        <div className="container mt-5 mb-5">
                        <h3 className="text-center mt-5 mb-2">Edit Room</h3>
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6">

                        {successMessage && (
                            <div className="alert alert-success">{successMessage}</div>
                        )}

                        {errorMessage && (
                            <div className="alert alert-danger">{errorMessage}</div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="roomType" className="form-label">
                                Room Type
                                </label>
                                <div>
                                    <RoomTypeSelector 
                                    hanldeRoomInputChange={handleRoomInputChange}
                                    newRoom={newRoom}
                                    />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="roomPrice" className="form-label">
                                    Room Price
                                </label>
                                <input 
                                className="form-control" 
                                required id="roomPrice" 
                                type="number"
                                name="roomPrice" 
                                value={newRoom.roomPrice} 
                                onChange={handleRoomInputChange}
                                >
                                </input>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="photo" className="form-label">Room Photo</label>
                                <input
                                id="photo"
                                name="photo"
                                type="file"
                                className="form-control"
                                onChange={handleImageChange}
                                />
                                    {imagePreview && (
                                        <img src={`data:image/jpeg;base64,${imagePreview}`} alt="Review Room Photo"
                                        style={{maxWidth : "400px", maxHeight : "400px"}}
                                        className="mb-3 mt-5"
                                        />
                                    )}
                            </div>
                            <div className="d-grid d-md-flex mt-2" >
                                <Link to={"/existing-rooms"} className="btn btn-outline-info ml-5">Back</Link>
                                <button className="btn btn-outline-warning ml-5" type="submit">Edit Room</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
    )
}

export default EditRoom;