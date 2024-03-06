import React, { useEffect, useState } from "react";
import { getRoomTypes } from "../utils/ApiFunction";

const RoomTypeSelector = ({hanldeRoomInputChange, newRoom})=>{
    const [roomType, setRoomType ] = useState([""]);
    const [showNewRoomTypeInput, setShowNewRoomTypeInput ] = useState(false);
    const [newRoomType, setNewRoomType] = useState("")

    useEffect(()=>{
        getRoomTypes().then(
            (data)=>{
                setRoomType(data)
            }
        )
    },[])
    const handleNewRoomTypeInputChange = (e) =>{
        setNewRoomType(e.target.value);
    }
    const handleAddNewRoomType = ()=>{
        if( newRoomType !== "" ){
            setRoomType([...roomType, newRoomType])
            setShowNewRoomTypeInput(false)
            setNewRoomType("")
        }
    }

    return (
        <>
        {roomType.length > 0 &&(
            <div>
                <select
                required
                id="roomType"
                className="form-select"
                name="roomType"
                value={newRoom.roomType}
                onChange={(e)=>{
                    if( e.target.value === "Add New"){
                        setShowNewRoomTypeInput(true)
                    }else{
                        setShowNewRoomTypeInput(false)
                        hanldeRoomInputChange(e)
                    }
                }}
                >
                    <option value={""}>Select a room type</option>
                    <option value={"Add New"}>Add new</option>
                    {roomType.map((type, index)=>(
                        <option key={index} value={type}>
                            {type}
                        </option>
                    ))}
                </select>
                {showNewRoomTypeInput && (
                        <div className="input-group">
                            <input
                            className="form-control"
                            type="text"
                            placeholder="Enter a new room type"
                            onChange={handleNewRoomTypeInputChange}
                            >
                            </input>
                            <button 
                            className="btn btn-hotel" 
                            type="button"
                            onClick={handleAddNewRoomType}
                            >
                                Add
                                </button>
                        </div>
                    )}
            </div>
        )}
        </>
    )
}

export default RoomTypeSelector;