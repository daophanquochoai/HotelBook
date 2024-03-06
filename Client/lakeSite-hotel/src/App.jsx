import './App.css'
import AddRoom from './components/room/AddRoom'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.min.js"
import ExistingRooms from './components/room/ExistingRooms.jsx'
import {Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Home from './components/home/Home.jsx'
import EditRoom from './components/room/EditRoom.jsx'
import Navbar from './components/layout/Navbar.jsx'
import Footer from './components/layout/footer.jsx'
import RoomLising from './components/room/RoomLising.jsx'
import Admin from './components/admin/Admin.jsx'
import CheckOut from './components/bookings/CheckOut.jsx'
import BookingSuccess from './components/bookings/BookingSuccess.jsx'
function App() {

  return (
    <main>
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/edit-room/:roomId' element={<EditRoom/>}/>
          <Route path='/existing-rooms' element={<ExistingRooms />}/>
          <Route path='/add-room' element={<AddRoom />}/>
          <Route path='/book-room/:roomId' element={<CheckOut />}/>
          <Route path='/booking-success' element={<BookingSuccess />}/>
          <Route path='/browse-all-rooms' element={<RoomLising />}/>
          <Route path='/admin' element={<Admin />}/>
        </Routes>
      <Footer/>
      </Router>
    </main>
  )
}

export default App
